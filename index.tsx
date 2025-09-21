
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
  type?: 'default' | 'ai-analysis';
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
// IMPORTANT: You MUST get your own projectId from https://cloud.walletconnect.com
const WALLETCONNECT_PROJECT_ID = 'b913f56d39578659b9222a028643831b'; 

const chains = ['eip155:1']; // Ethereum Mainnet

const metadata = {
  name: 'AI-BITBOY-DEX',
  description: 'AI-driven trading synthesis core',
  url: window.location.host,
  icons: ['https://walletconnect.com/walletconnect-logo.png']
};

const web3Modal = new Web3Modal.Web3Modal({
  projectId: WALLETCONNECT_PROJECT_ID,
  standaloneChains: chains,
  walletConnectVersion: 2,
  metadata
});


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
    systemInstruction: 'You are an aggressive,