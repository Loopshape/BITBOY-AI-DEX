
import { GoogleGenAI } from "@google/genai";

// Fix: Declare global variables for external libraries loaded via script tags.
declare var gsap: any;
declare var Web3Modal: any;

// --- MOCK DATA & CONFIG ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini provider will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const JSON_SCHEMA = {
    type: "OBJECT",
    properties: {
        asset: { type: "STRING", description: "The asset pair, e.g., 'BTC/USD'" },
        action: { type: "STRING", enum: ["LONG", "SHORT"], description: "The trade action" },
        entry: { type: "NUMBER", description: "The suggested entry price" },
        target: { type: "NUMBER", description: "The take-profit target price" },
        stopLoss: { type: "NUMBER", description: "The stop-loss price" },
        reasoning: { type: "STRING", description: "A brief justification for the trade" },
    },
    required: ["asset", "action", "entry", "target", "stopLoss", "reasoning"],
};

const SENTIMENT_SCHEMA = {
    type: "OBJECT",
    properties: {
        overallSentiment: {
            type: "STRING",
            enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"],
            description: "The overall sentiment of the news headlines."
        },
        keyTerms: {
            type: "ARRAY",
            items: {
                type: "STRING"
            },
            description: "A list of 3-5 key terms or short phrases that contributed most to the sentiment."
        }
    },
    required: ["overallSentiment", "keyTerms"]
};

const PERSONAS = [
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
  },
  {
    id: 'daytrader',
    name: 'Day Trader',
    icon: 'fa-solid fa-calendar-day',
    systemInstruction: 'You are a disciplined day trader. Your focus is on capturing profits from intraday price movements. Analyze 15-minute and 1-hour charts for patterns like flags, triangles, and head-and-shoulders. Use VWAP and key intraday support/resistance levels to determine entry and exit points. Trades should be opened and closed within the same day.'
  },
  {
    id: 'operator',
    name: 'Operator',
    icon: 'fa-solid fa-robot',
    systemInstruction: 'You are The Operator, an autonomous AI agent inspired by the "AI Autonomic Synthesis Platform v42.1". Your process is: 1. Messenger Analysis: Synthesize all provided market data (chart, news, sentiment) into a concise summary of the current state. 2. Planner Formulation: Based on your analysis, propose a logical plan to determine a trading strategy. 3. Executor Decision: Based on the plan, output a final, actionable trade directive. Your reasoning must explicitly reference your analysis and planning phases.'
  }
];
