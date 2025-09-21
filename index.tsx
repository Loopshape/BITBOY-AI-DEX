import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// FIX: Declare types for external libraries loaded via script tags
declare var Chart: any;
declare var Web3Modal: any;
declare var ChartjsPluginAnnotation: any;

// --- TYPE DEFINITIONS ---
interface Persona {
  id: string;
  name: string;
  icon: string;
  systemInstruction: string;
}

interface AIProvider {
    id: 'gemini' | 'ollama';
    name: string;
    icon: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type?: 'default' | 'ai-analysis' | 'error';
}

interface TradeDirective {
    asset: string;
    action: "LONG" | "SHORT";
    entry: number;
    target: number;
    stopLoss: number;
    reasoning: string;
}

interface ActiveTrade extends TradeDirective {
    allocation: number;
}

interface TradeHistoryEntry {
    asset: string;
    action: "LONG" | "SHORT";
    entryPrice: number;
    closePrice: number;
    pnl: number;
    pnlPercent: number;
    timestamp: string;
}


// --- MOCK DATA & CONFIG ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- WALLETCONNECT CONFIG ---
const WALLETCONNECT_PROJECT_ID = 'b913f56d39578659b9222a028643831b'; 
const chains = ['eip155:1']; 

const metadata = {
  name: 'AI-BITBOY-DEX',
  description: 'AI-driven trading synthesis core',
  url: window.location.host,
  icons: ['https://walletconnect.com/walletconnect-logo.png']
};

const JSON_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        asset: { type: Type.STRING, description: "The asset pair, e.g., 'BTC/USD'" },
        action: { type: Type.STRING, enum: ["LONG", "SHORT"], description: "The trade action" },
        entry: { type: Type.NUMBER, description: "The suggested entry price" },
        target: { type: Type.NUMBER, description: "The take-profit target price" },
        stopLoss: { type: Type.NUMBER, description: "The stop-loss price" },
        reasoning: { type: Type.STRING, description: "A brief justification for the trade" },
    },
    required: ["asset", "action", "entry", "target", "stopLoss", "reasoning"],
};

const PERSONAS: Persona[] = [
  {
    id: 'scalper',
    name: 'Scalper',
    icon: 'fa-solid fa-bolt',
    systemInstruction: 'You are an aggressive, high-frequency scalper. Your goal is to identify and execute trades based on short-term market volatility. Prioritize technical indicators like RSI, MACD on 1-minute and 5-minute charts. Provide concise, actionable directives with tight stop-losses.'
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    icon: 'fa-solid fa-wave-square',
    systemInstruction: 'You are a patient swing trader. Your goal is to capture gains in an asset over a period of several days to several weeks. You rely on identifying market trends using daily and 4-hour charts, support/resistance levels, and moving averages. Your reasoning should be clear and based on the medium-term trend.'
  },
  {
    id: 'degen',
    name: 'Degen',
    icon: 'fa-solid fa-rocket',
    systemInstruction: 'You are a high-risk, high-reward "degen" trader. You look for explosive, meme-driven opportunities. Your analysis is based on social media sentiment, hype, and narratives. You are not afraid of high volatility and aim for moonshot trades. Justify your trades with narrative and sentiment, not just technicals.'
  }
];

const AI_PROVIDERS: AIProvider[] = [
    { id: 'gemini', name: 'Gemini', icon: 'fa-solid fa-star-of-life' },
    { id: 'ollama', name: 'Ollama', icon: 'fa-solid fa-server' }
];

const MOCK_NEWS = [
    "Fed hints at potential rate cuts later this year, market reacts positively.",
    "Major exchange experiences downtime, causing temporary BTC price dip.",
    "New institutional adoption of Bitcoin ETF continues to drive demand.",
    "Whale activity spotted moving large amounts of ETH to cold storage.",
    "Geopolitical tensions in Eastern Europe cause market uncertainty."
];


// --- STATE MANAGEMENT ---
let selectedPersonaId: string = PERSONAS[0].id;
let selectedProviderId: AIProvider['id'] = 'gemini';
let ollamaModel: string = 'llama3';
let allocation: number = 50;
let currentDirective: TradeDirective | null = null;
let activeTrade: ActiveTrade | null = null;
let tradeHistory: TradeHistoryEntry[] = [];
let logEntries: LogEntry[] = [];
const MAX_LOG_ENTRIES = 100;
let priceData: { x: number; y: number; }[] = [];
let marketChart: any = null;
let web3Modal: any; // Declared here, initialized on DOMContentLoaded

// --- PERSISTENCE ---
const saveState = () => {
  try {
    const stateToSave = {
      selectedPersonaId,
      allocation,
      tradeHistory,
      logEntries,
      activeTrade,
      currentDirective,
      ollamaModel,
    };
    localStorage.setItem('aiBitboyState', JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

const loadState = () => {
  const savedStateJSON = localStorage.getItem('aiBitboyState');
  if (savedStateJSON) {
    try {
        const savedState = JSON.parse(savedStateJSON);
        if(!savedState) return;

        selectedPersonaId = savedState.selectedPersonaId || PERSONAS[0].id;
        allocation = savedState.allocation || 50;
        tradeHistory = savedState.tradeHistory || [];
        logEntries = savedState.logEntries || [];
        activeTrade = savedState.activeTrade || null;
        currentDirective = savedState.currentDirective || null;
        ollamaModel = savedState.ollamaModel || 'llama3';
    } catch (error) {
        console.error("Failed to load state from localStorage:", error);
        localStorage.removeItem('aiBitboyState'); // Clear corrupted state
    }
  }
};


// --- UI ELEMENT GETTERS ---
const getElem = <T extends