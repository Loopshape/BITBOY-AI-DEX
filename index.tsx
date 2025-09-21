import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// FIX: Declare types for external libraries loaded via script tags
declare var Chart: any;
declare var Web3Modal: any;

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
    systemInstruction: 'You are an aggressive, high-frequency crypto trading AI. Provide extremely short-term, high-probability trade directives for scalping. Focus on immediate price action. YOU MUST ONLY output a valid JSON object matching the provided schema.',
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    icon: 'fa-solid fa-chart-line',
    systemInstruction: 'You are a crypto swing trading AI. Your analysis covers a multi-day to multi-week timeframe. Identify potential swing highs and lows based on technical indicators. YOU MUST ONLY output a valid JSON object matching the provided schema.',
  },
  {
    id: 'investor',
    name: 'Investor',
    icon: 'fa-solid fa-gem',
    systemInstruction: 'You are a long-term crypto investment AI. Focus on fundamental analysis, project viability, and long-term market trends. For the purpose of this simulation, provide a tradeable directive. YOU MUST ONLY output a valid JSON object matching the provided schema.',
  },
];

const AI_PROVIDERS: AIProvider[] = [
    { id: 'gemini', name: 'Gemini Cloud', icon: 'fa-solid fa-cloud' },
    { id: 'ollama', name: 'Local Ollama', icon: 'fa-solid fa-server' },
];

const MOCK_NEWS = [
  "Fed holds interest rates steady, citing 'modest' economic growth.",
  "Ethereum's 'Pectra' upgrade sets sight on Q1 2025 launch.",
  "Bitcoin ETF inflows see a major surge in the last 24 hours.",
  "New DeFi protocol launches on Solana, promises high yields.",
  "Regulatory uncertainty in Asia causes market-wide jitters."
];

// --- STATE MANAGEMENT ---
let marketChart: any = null; // Hold chart instance
let priceSocket: WebSocket | null = null;

let state = {
  activePersonaId: 'swing',
  allocation: 50,
  logs: [] as LogEntry[],
  isGenerating: false,
  isWalletConnected: false,
  walletAddress: null as string | null,
  isAutotraderEnabled: false,
  activeTrade: null as ActiveTrade | null,
  pendingDirective: null as TradeDirective | null,
  currentPrice: 68000, // Start with a default price
  tradeHistory: [] as TradeHistoryEntry[],
  manualTakeProfit: null as number | null,
  manualStopLoss: null as number | null,
  aiProvider: 'gemini' as 'gemini' | 'ollama',
  localModelName: 'llama3:8b',
  sentiment: {
      value: 78,
      label: 'Greed',
  }
};

// --- DOM ELEMENT SELECTORS ---
const DOMElements = {
  statusLight: document.getElementById('status-light')!,
  statusText: document.getElementById('status-text')!,
  personaSelector: document.getElementById('persona-selector')!,
  allocationSlider: document.getElementById('allocation-slider') as HTMLInputElement,
  allocationValue: document.getElementById('allocation-value')!,
  newsFeed: document.getElementById('news-feed')!,
  aiLog: document.getElementById('ai-log')!,
  aiStatusText: document.getElementById('ai-status-text')!,
  generateBtnContainer: document.querySelector('.btn-group') as HTMLElement,
  directivePanel: document.getElementById('directive-panel')!,
  directiveOutput: document.getElementById('directive-output')!,
  marketChartCanvas: document.getElementById('marketChart') as HTMLCanvasElement,
  connectWalletBtn: document.getElementById('connect-wallet-btn')!,
  tradeHistory: document.getElementById('trade-history') as HTMLElement,
  resetZoomBtn: document.getElementById('reset-zoom-btn')!,
  manualOverridesContainer: document.getElementById('manual-overrides-container')!,
  manualTpInput: document.getElementById('manual-tp-input') as HTMLInputElement,
  manualSlInput: document.getElementById('manual-sl-input') as HTMLInputElement,
  autotraderSwitch: document.getElementById('autotrader-switch') as HTMLInputElement,
  providerSelector: document.getElementById('provider-selector')!,
  localModelContainer: document.getElementById('local-model-container')!,
  localModelInput: document.getElementById('local-model-input') as HTMLInputElement,
  sentimentGaugeContainer: document.getElementById('sentiment-gauge-container')!,
};

// --- RENDER FUNCTIONS ---

const renderPersonas = () => {
  DOMElements.personaSelector.innerHTML = PERSONAS.map(p => `
    <div class="persona-card ${p.id === state.activePersonaId ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${p.id === state.activePersonaId}" tabindex="0">
      <div class="persona-avatar"><i class="${p.icon}"></i></div>
      <p class="persona-name">${p.name}</p>
    </div>
  `).join('');
};

const renderAIProviderSelector = () => {
    DOMElements.providerSelector.innerHTML = AI_PROVIDERS.map(p => `
        <div class="provider-card ${p.id === state.aiProvider ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${p.id === state.aiProvider}" tabindex="0">
            <div class="provider-avatar"><i class="${p.icon}"></i></div>
            <p class="provider-name">${p.name}</p>
        </div>
    `).join('');

    if (state.aiProvider === 'ollama') {
        DOMElements.localModelContainer.style.display = 'block';
        DOMElements.localModelInput.value = state.localModelName;
    } else {
        DOMElements.localModelContainer.style.display = 'none';
    }
};

const renderSentimentGauge = () => {
    const { value, label } = state.sentiment;
    const angle = -90 + (value / 100) * 180; // Convert 0-100 scale to -90 to +90 degrees

    const sentimentColor = `hsl(${(value / 100) * 120}, 70%, 50%)`; // Red (0) to Green (120)

    DOMElements.sentimentGaugeContainer.innerHTML = `
        <svg viewBox="0 0 200 120" class="sentiment-gauge-svg">
            <defs>
                <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${'#F92672'}" />
                    <stop offset="50%" stop-color="${'#E6DB74'}" />
                    <stop offset="100%" stop-color="${'#A6E22E'}" />
                </linearGradient>
            </defs>
            <path d="M 10 100 A 90 90 0 0 1 190 100" class="gauge-arc-bg" fill="none" stroke="${'var(--surface-dark)'}" stroke-width="18" stroke-linecap="round"/>
            <path d="M 10 100 A 90 90 0 0 1 190 100" class="gauge-arc"/>
            <text x="20" y="115" class="gauge-tick-label">FEAR</text>
            <text x="180" y="115" class="gauge-tick-label">GREED</text>
            
            <g transform="translate(100 100)">
                 <path d="M 0 -8 L 8 0 L 0 85 L -8 0 Z" class="gauge-needle" transform="rotate(${angle})" />
                 <circle cx="0" cy="0" r="12" class="gauge-pivot-bg" fill="${'var(--bg-dark)'}" />
                 <circle cx="0" cy="0" r="8" class="gauge-pivot" />
            </g>
            
            <text x="100" y="75" class="gauge-text-value" style="fill: ${sentimentColor};">${value}</text>
            <text x="100" y="95" class="gauge-text-label">${label}</text>
        </svg>
    `;
};


const renderLogs = () => {
  DOMElements.aiLog.innerHTML = state.logs.map(log => `
    <div class="log-item log-type-${log.type || 'default'}">
      <span class="timestamp">[${log.timestamp}]</span>
      <span class="message">${log.message}</span>
    </div>
  `).join('');
  DOMElements.aiLog.scrollTop = DOMElements.aiLog.scrollHeight;
};

const renderNews = () => {
    DOMElements.newsFeed.innerHTML = MOCK_NEWS.map(item => `<div class="news-item">${item}</div>`).join('');
};

const renderAllocation = () => {
    const value = state.allocation;
    DOMElements.allocationValue.textContent = `${value}%`;
};

const renderTradeHistory = () => {
    if (state.tradeHistory.length === 0) {
        DOMElements.tradeHistory.innerHTML = `<div class="placeholder">No trades completed yet.</div>`;
        return;
    }
    DOMElements.tradeHistory.innerHTML = state.tradeHistory.map(trade => `
        <div class="trade-item">
            <span>${trade.action} ${trade.asset.split('/')[0]} @ ${trade.entryPrice.toFixed(2)} -> ${trade.closePrice.toFixed(2)}</span>
            <span class="trade-item-pnl ${trade.pnl >= 0 ? 'positive' : 'negative'}">
                ${trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)} (${trade.pnlPercent.toFixed(2)}%)
            </span>
        </div>
    `).join('');
};

const renderDirectivePanel = () => {
    // Re-trigger animations on content change only if the content is actually changing
    if (DOMElements.directiveOutput.innerHTML.includes('placeholder') || DOMElements.directiveOutput.innerHTML === '') {
        const elementsToAnimate = [DOMElements.directiveOutput, DOMElements.generateBtnContainer];
        elementsToAnimate.forEach(el => {
            el.classList.remove('content-fade-in');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('content-fade-in');
        });
    }


    if (state.activeTrade) {
        // Render Live Trade Monitor
        const { asset, action, entry, target, stopLoss, allocation } = state.activeTrade;
        const pnl = (state.currentPrice - entry) * (action === 'LONG' ? 1 : -1);
        const pnlPercent = (pnl / entry) * 100;
        const MOCK_PORTFOLIO_SIZE = 10000;
        const tradeValue = MOCK_PORTFOLIO_SIZE * (allocation / 100);
        const pnlValue = tradeValue * (pnlPercent / 100);

        const isProfit = pnlValue >= 0;

        const range = Math.abs(target - stopLoss);
        const progressToTarget = Math.max(0, Math.min(100, action === 'LONG' ? ((state.currentPrice - entry) / (target - entry)) * 100 : ((entry - state.currentPrice) / (entry - target)) * 100));
        const progressToStop = Math.max(0, Math.min(100, action === 'LONG' ? ((entry - state.currentPrice) / (entry - stopLoss)) * 100 : ((state.currentPrice - entry) / (stopLoss - entry)) * 100));


        DOMElements.directiveOutput.innerHTML = `
            <div id="live-trade-monitor">
                <div class="trade-monitor-header">
                    <span class="trade-monitor-asset">${asset}</span>
                    <span class="trade-monitor-direction direction-${action.toLowerCase()}">${action}</span>
                </div>
                <div class="pnl-display">
                    <div class="pnl-value" style="color: ${isProfit ? 'var(--text-green)' : 'var(--text-red)'}" aria-live="polite">${isProfit ? '+' : ''}${pnlValue.toFixed(2)} USD</div>
                    <div class="pnl-percent" aria-live="polite">${pnlPercent.toFixed(2)}%</div>
                </div>
                <div class="trade-details-grid">
                     <div class="trade-detail-item"><strong>Entry Price</strong><span>${entry.toFixed(2)}</span></div>
                     <div class="trade-detail-item"><strong>Current Price</strong><span>${state.currentPrice.toFixed(2)}</span></div>
                </div>
                 <div class="trade-progress-bar" id="tp-progress">
                    <div class="progress-label"><span>Entry: ${entry.toFixed(2)}</span><span>Target: ${target.toFixed(2)}</span></div>
                    <div class="progress-track"><div class="progress-fill" style="width: ${progressToTarget}%"></div></div>
                </div>
                 <div class="trade-progress-bar" id="sl-progress">
                    <div class="progress-label"><span>Stop: ${stopLoss.toFixed(2)}</span><span>Entry: ${entry.toFixed(2)}</span></div>
                    <div class="progress-track"><div class="progress-fill" style="width: ${progressToStop}%"></div></div>
                </div>
            </div>
        `;
        DOMElements.generateBtnContainer.innerHTML = `<button id="close-trade-btn" class="btn btn-sell">FORCE CLOSE TRADE</button>`;
        document.getElementById('close-trade-btn')?.addEventListener('click', () => closeTrade('manual'));

    } else if (state.pendingDirective && !state.isAutotraderEnabled) {
        // Render Confirmation Panel (only in manual mode)
        const { asset, action, entry, reasoning } = state.pendingDirective;
        const target = state.manualTakeProfit ?? state.pendingDirective.target;
        const stopLoss = state.manualStopLoss ?? state.pendingDirective.stopLoss;
        const allocation = state.allocation;

        DOMElements.directiveOutput.innerHTML = `
            <div id="trade-confirmation">
                <h4>CONFIRM TRADE EXECUTION</h4>
                <p class="reasoning-text">${reasoning}</p>
                <div class="confirmation-details-grid">
                    <div class="confirmation-detail-item"><strong>Asset</strong><span>${asset}</span></div>
                    <div class="confirmation-detail-item"><strong>Action</strong><span class="action-${action.toLowerCase()}">${action}</span></div>
                    <div class="confirmation-detail-item"><strong>Entry (~${entry.toFixed(2)})</strong><span>${state.currentPrice.toFixed(2)}</span></div>
                    <div class="confirmation-detail-item"><strong>Allocation</strong><span>${allocation}%</span></div>
                    <div class="confirmation-detail-item"><strong>Take Profit</strong><span>${target.toFixed(2)}</span></div>
                    <div class="confirmation-detail-item"><strong>Stop Loss</strong><span>${stopLoss.toFixed(2)}</span></div>
                </div>
            </div>
        `;
        DOMElements.generateBtnContainer.innerHTML = `
            <button id="confirm-trade-btn" class="btn btn-buy">CONFIRM &amp; EXECUTE</button>
            <button id="cancel-trade-btn" class="btn btn-sell">CANCEL</button>
        `;
        document.getElementById('confirm-trade-btn')?.addEventListener('click', handleConfirmTrade);
        document.getElementById('cancel-trade-btn')?.addEventListener('click', handleCancelTrade);

    } else {
        // Render default or autotrader view
        if (state.isAutotraderEnabled) {
            DOMElements.directiveOutput.innerHTML = `<span class="placeholder">AUTOTRADER ACTIVE: Monitoring market for trading opportunities...</span>`;
            DOMElements.generateBtnContainer.innerHTML = `<button id="generate-directive-btn" class="btn btn-buy" disabled>AUTOTRADER ENGAGED</button>`;
        } else {
            DOMElements.directiveOutput.innerHTML = `<span class="placeholder">Select a persona and generate a directive...</span>`;
            DOMElements.generateBtnContainer.innerHTML = `<button id="generate-directive-btn" class="btn btn-buy">GENERATE DIRECTIVE</button>`;
            document.getElementById('generate-directive-btn')?.addEventListener('click', handleGenerateDirective);
        }
    }
};


// --- LOGIC FUNCTIONS ---

const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconClass = type === 'success' 
        ? 'fa-check-circle' 
        : type === 'error' 
        ? 'fa-exclamation-triangle' 
        : 'fa-info-circle';
    
    notification.innerHTML = `<i class="fas ${iconClass}"></i> ${message}`;
    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 5000);
};

const addLog = (message: string, type: LogEntry['type'] = 'default') => {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  state.logs.unshift({ timestamp, message, type });
  if (state.logs.length > 50) state.logs.pop(); // Keep log size manageable
  renderLogs();
};

const setStatus = (text: string, isError: boolean = false) => {
    DOMElements.aiStatusText.textContent = text;
    DOMElements.statusLight.classList.toggle('error', isError);
    DOMElements.statusText.textContent = isError ? "SYSTEM ERROR" : "SYSTEM ONLINE";
}

const handlePersonaSelect = (e: Event) => {
  const target = (e.target as HTMLElement).closest('.persona-card');
  if (target instanceof HTMLElement) {
    const id = target.dataset.id;
    if (id) {
        state.activePersonaId = id;
        addLog(`AI Persona switched to: ${PERSONAS.find(p => p.id === id)?.name}`);
        renderPersonas();
    }
  }
};

const handleAIProviderSelect = (e: Event) => {
    const target = (e.target as HTMLElement).closest('.provider-card');
    if (target instanceof HTMLElement) {
        const id = target.dataset.id as 'gemini' | 'ollama';
        if (id && id !== state.aiProvider) {
            state.aiProvider = id;
            const providerName = AI_PROVIDERS.find(p => p.id === id)?.name;
            addLog(`AI Provider switched to: ${providerName}`);
            renderAIProviderSelector();
        }
    }
};

const handleLocalModelChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    state.localModelName = value.trim();
    addLog(`Local model set to: ${state.localModelName}`);
};

const handleAllocationChange = (e: Event) => {
    state.allocation = parseInt((e.target as HTMLInputElement).value, 10);
    renderAllocation();
};

const handleManualTpChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    state.manualTakeProfit = value ? parseFloat(value) : null;
};

const handleManualSlChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    state.manualStopLoss = value ? parseFloat(value) : null;
};

const handleWalletConnection = async () => {
    if (state.isWalletConnected) {
        await web3Modal.disconnect();
    } else {
        await web3Modal.openModal();
    }
};

const handleAutotraderToggle = (e: Event) => {
    state.isAutotraderEnabled = (e.target as HTMLInputElement).checked;
    if (state.isAutotraderEnabled) {
        addLog("AUTOTRADER ENGAGED. AI is now in full control.");
        showNotification("Autotrader Engaged!", 'info');
        // If idle, kick off the trading process
        if (!state.activeTrade && !state.pendingDirective && !state.isGenerating) {
            handleGenerateDirective();
        }
    } else {
        addLog("AUTOTRADER DISENGAGED. Manual confirmation required.");
        showNotification("Autotrader Disengaged.", 'info');
    }
    renderDirectivePanel(); // Re-render to update UI state
};

const startTrade = (directive: TradeDirective) => {
    // Create a mutable copy of the directive to apply overrides
    const effectiveDirective = { ...directive };

    // Set entry price to current market price for accuracy
    effectiveDirective.entry = state.currentPrice;

    // Apply manual overrides if they exist and are valid numbers
    if (state.manualTakeProfit !== null && !isNaN(state.manualTakeProfit)) {
        addLog(`Overriding AI Take Profit (${effectiveDirective.target}) with manual value: ${state.manualTakeProfit}`);
        effectiveDirective.target = state.manualTakeProfit;
    }
    if (state.manualStopLoss !== null && !isNaN(state.manualStopLoss)) {
        addLog(`Overriding AI Stop Loss (${effectiveDirective.stopLoss}) with manual value: ${state.manualStopLoss}`);
        effectiveDirective.stopLoss = state.manualStopLoss;
    }

    state.activeTrade = { ...effectiveDirective, allocation: state.allocation };
    addLog(`Directive routed to wallet (${state.walletAddress}). Executing ${effectiveDirective.action} ${effectiveDirective.asset} @ ${effectiveDirective.entry.toFixed(2)}...`);
    
    // Reset and prepare chart for live data
    if (marketChart) {
        // Don't clear old data, just start appending new data
        marketChart.resetZoom();
    }

    renderDirectivePanel();
};

const checkTradeStatus = () => {
    if (!state.activeTrade) return;

    const { action, target, stopLoss } = state.activeTrade;
    
    if (action === 'LONG' && state.currentPrice >= target) {
        closeTrade('tp');
    } else if (action === 'LONG' && state.currentPrice <= stopLoss) {
        closeTrade('sl');
    } else if (action === 'SHORT' && state.currentPrice <= target) {
        closeTrade('tp');
    } else if (action === 'SHORT' && state.currentPrice >= stopLoss) {
        closeTrade('sl');
    } else {
       renderDirectivePanel(); // re-render with new price
    }
};

const closeTrade = async (reason: 'manual' | 'tp' | 'sl') => {
    if (!state.activeTrade) return;

    const closePrice = reason === 'tp' ? state.activeTrade.target : reason === 'sl' ? state.activeTrade.stopLoss : state.currentPrice;
    const { asset, action, entry } = state.activeTrade;

    // Calculate P/L
    const pnl = (closePrice - entry) * (action === 'LONG' ? 1 : -1);
    const pnlPercent = (pnl / entry) * 100;

    // Update trade history state
    state.tradeHistory.unshift({
        asset,
        action,
        entryPrice: entry,
        closePrice,
        pnl,
        pnlPercent,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    });

    // Log the closure
    addLog(`SIM TRADE CLOSED (${reason.toUpperCase()}). P/L: ${pnl.toFixed(4)} (${pnlPercent.toFixed(2)}%)`);

    // Show appropriate notification based on closure reason
    if (reason === 'tp') {
        showNotification(`Take Profit HIT on ${asset}! P/L: +${pnl.toFixed(2)} USD`, 'success');
    } else if (reason === 'sl') {
        showNotification(`Stop Loss triggered on ${asset}. P/L: ${pnl.toFixed(2)} USD`, 'error');
    } else if (reason === 'manual') {
        showNotification(`Trade on ${asset} manually closed. P/L: ${pnl.toFixed(2)} USD`, 'info');
    }
    
    // Reset active trade state
    state.activeTrade = null;

    // Re-render UI immediately
    renderTradeHistory();
    renderDirectivePanel();

    // --- AI post-trade analysis in the background ---
    try {
        const activePersona = PERSONAS.find(p => p.id === state.activePersonaId);
        if (!activePersona) throw new Error("Active persona not found for analysis.");

        const analysisPrompt = `A recent ${action} trade on ${asset} from an entry price of ${entry.toFixed(2)} was just closed at ${closePrice.toFixed(2)}. The reason for closing was: ${reason === 'tp' ? 'Take Profit' : reason === 'sl' ? 'Stop Loss' : 'Manual Close'}. The resulting P/L is ${pnl.toFixed(2)} USD (${pnlPercent.toFixed(2)}%). Provide a concise, one-sentence post-trade analysis from the perspective of a ${activePersona.name}.`;

        addLog('Requesting AI post-trade analysis...');

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: analysisPrompt,
        });
        
        const analysisText = result.text.trim();
        addLog(`AI Analysis: "${analysisText}"`, 'ai-analysis');

    } catch (error) {
        console.error("AI Post-Trade Analysis Error:", error);
        addLog(`ERROR: Failed to get post-trade analysis. ${error instanceof Error ? error.message : ''}`);
    }

    // --- Autotrader logic ---
    if (state.isAutotraderEnabled) {
        addLog("AUTOTRADER: Trade cycle complete. Searching for next opportunity...");
        // Use a small delay to make the UI feel less frantic
        setTimeout(() => {
            if(state.isAutotraderEnabled) handleGenerateDirective();
        }, 2000); 
    }
};

const handleConfirmTrade = () => {
    if (!state.pendingDirective) return;
    if (state.isAutotraderEnabled) {
        addLog('Autotrader is executing the trade automatically.');
    } else {
        addLog('Trade directive confirmed by user.');
    }
    startTrade(state.pendingDirective);
    state.pendingDirective = null;
};

const handleCancelTrade = () => {
    if (!state.pendingDirective) return;
    addLog('Trade directive cancelled by user.');
    state.pendingDirective = null;
    renderDirectivePanel();
};

const handleGenerateDirective = async () => {
    if (state.isGenerating || state.activeTrade) return;
    
    state.isGenerating = true;
    renderDirectivePanel();
    DOMElements.directiveOutput.innerHTML = '';
    setStatus('SYNTHESIZING DIRECTIVE...');
    addLog('Directive generation initiated.');

    if (state.aiProvider === 'ollama') {
        await handleGenerateDirectiveOllama();
    } else {
        await handleGenerateDirectiveGemini();
    }
    
    state.isGenerating = false;
    if (!state.activeTrade && !state.pendingDirective) {
         renderDirectivePanel();
    }
    setStatus('AWAITING DIRECTIVE');
};

const handleGenerateDirectiveGemini = async () => {
    const activePersona = PERSONAS.find(p => p.id === state.activePersonaId);
    if (!activePersona) {
        addLog('Error: No active persona found.');
        setStatus('Error: Persona not found', true);
        return;
    }

    try {
        const prompt = `Based on the current BTC/USD price of approximately ${state.currentPrice.toFixed(2)}, market sentiment of ${state.sentiment.label} (${state.sentiment.value}), high volume, and high volatility, provide a trade directive. My capital allocation is ${state.allocation}%.`;
        addLog('Sending request to Gemini AI Core...');
        
        if (state.isWalletConnected || state.isAutotraderEnabled) {
             const result = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    systemInstruction: activePersona.systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: JSON_SCHEMA,
                },
            });
            addLog('Received JSON directive from Gemini AI Core.');
            try {
                const directive = JSON.parse(result.text) as TradeDirective;
                state.pendingDirective = directive;

                if (state.isAutotraderEnabled) {
                    addLog(`Autotrader received directive: ${directive.action} ${directive.asset}. Executing...`);
                    handleConfirmTrade();
                } else {
                    addLog('Directive parsed successfully. Awaiting confirmation.');
                    showNotification('New directive generated. Awaiting confirmation.');
                    renderDirectivePanel();
                }
            } catch (parseError) {
                 throw new Error("Failed to parse AI response as valid JSON.");
            }

        } else {
            const result = await ai.models.generateContentStream({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: { systemInstruction: activePersona.systemInstruction },
            });

            addLog('Receiving stream from Gemini AI Core...');
            let fullResponse = '';
            const cursor = `<span class="cursor"></span>`;
            DOMElements.directiveOutput.innerHTML = cursor;

            for await (const chunk of result) {
                fullResponse += chunk.text;
                DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>') + cursor;
            }

            DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>');
            addLog('Directive received and displayed.');
            showNotification('New directive received and displayed.');
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage = `ERROR: Failed to communicate with AI Core. ${error instanceof Error ? error.message : ''}`;
        DOMElements.directiveOutput.innerHTML = `<span class="error-message">${errorMessage}</span>`;
        setStatus(errorMessage, true);
        addLog(errorMessage);
    }
};

const handleGenerateDirectiveOllama = async () => {
    const activePersona = PERSONAS.find(p => p.id === state.activePersonaId);
    if (!activePersona) {
        addLog('Error: No active persona found.');
        setStatus('Error: Persona not found', true);
        return;
    }

    try {
        const prompt = `Based on the current BTC/USD price of approximately ${state.currentPrice.toFixed(2)}, market sentiment of ${state.sentiment.label} (${state.sentiment.value}), high volume, and high volatility, provide a trade directive. My capital allocation is ${state.allocation}%.`;
        addLog(`Sending request to Local AI Core (${state.localModelName})...`);

        const needsJson = state.isWalletConnected || state.isAutotraderEnabled;

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: state.localModelName,
                system: activePersona.systemInstruction,
                prompt: prompt,
                format: needsJson ? 'json' : undefined,
                stream: !needsJson,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Local AI server responded with status ${response.status}: ${errorText}`);
        }

        if (!needsJson && response.body) { // Streaming text
             addLog('Receiving stream from Local AI Core...');
             const reader = response.body.getReader();
             const decoder = new TextDecoder();
             let fullResponse = '';
             const cursor = `<span class="cursor"></span>`;
             DOMElements.directiveOutput.innerHTML = cursor;

             let leftover = '';
             while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = leftover + decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                leftover = lines.pop() || '';
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    try {
                        const ollamaChunk = JSON.parse(line);
                        if (ollamaChunk.response) {
                            fullResponse += ollamaChunk.response;
                            DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>') + cursor;
                        }
                    } catch (e) {
                        console.warn("Could not parse Ollama stream chunk:", line);
                    }
                }
             }
             DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>');
             addLog('Directive received and displayed.');
             showNotification('New directive received and displayed.');
        } else { // JSON response
            const ollamaResponse = await response.json();
            addLog('Received JSON directive from Local AI Core.');
            try {
                const directive = JSON.parse(ollamaResponse.response) as TradeDirective;
                state.pendingDirective = directive;
                if (state.isAutotraderEnabled) {
                    addLog(`Autotrader received directive: ${directive.action} ${directive.asset}. Executing...`);
                    handleConfirmTrade();
                } else {
                    addLog('Directive parsed successfully. Awaiting confirmation.');
                    showNotification('New directive generated. Awaiting confirmation.');
                    renderDirectivePanel();
                }
            } catch (parseError) {
                console.error("Ollama JSON parse error. Raw response:", ollamaResponse.response);
                throw new Error("Failed to parse Local AI response as valid JSON.");
            }
        }
    } catch (error) {
        console.error("Ollama API Error:", error);
        const errorMessage = (error instanceof TypeError && error.message.includes('fetch'))
            ? 'ERROR: Could not connect to Local AI. Is Ollama running at http://localhost:11434?'
            : `ERROR: Failed to communicate with Local AI Core. ${error instanceof Error ? error.message : ''}`;

        DOMElements.directiveOutput.innerHTML = `<span class="error-message">${errorMessage}</span>`;
        setStatus(errorMessage, true);
        addLog(errorMessage);
    }
};

const connectPriceFeedSocket = () => {
    // Close existing socket if it exists
    if (priceSocket && priceSocket.readyState < 2) {
        priceSocket.close();
    }

    priceSocket = new WebSocket('wss://wstream.binance.com/ws/btcusdt@trade');

    priceSocket.onopen = () => {
        addLog('Real-time market data feed connected.');
    };

    priceSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const price = parseFloat(data.p);

        if (price && price !== state.currentPrice) {
            state.currentPrice = price;

            // Update chart
            if (marketChart) {
                marketChart.data.labels.push(new Date());
                marketChart.data.datasets[0].data.push(state.currentPrice);

                // Keep chart history to a manageable size (e.g., last 300 points)
                if (marketChart.data.labels.length > 300) {
                    marketChart.data.labels.shift();
                    marketChart.data.datasets[0].data.shift();
                }
                marketChart.update('none'); // Use 'none' for smooth non-animated update
            }
            
            // If a trade is active, check its status
            if (state.activeTrade) {
                checkTradeStatus();
            } else if (state.pendingDirective) {
                // If waiting for confirmation, update the displayed entry price
                renderDirectivePanel();
            }
        }
    };

    priceSocket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        addLog('ERROR: Market data feed connection failed.');
    };

    priceSocket.onclose = () => {
        addLog('Market data feed disconnected. Attempting to reconnect in 5s...');
        setTimeout(connectPriceFeedSocket, 5000); // Reconnect after 5 seconds
    };
};

const initializeChart = () => {
    const ctx = DOMElements.marketChartCanvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(102, 217, 239, 0.4)');
    gradient.addColorStop(1, 'rgba(102, 217, 239, 0)');
    
    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'BTC Price',
                data: [],
                borderColor: '#66D9EF',
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                zoom: {
                    pan: { enabled: true, mode: 'x' },
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                }
            },
            scales: {
                x: { 
                    type: 'time',
                    time: {
                        unit: 'minute',
                        tooltipFormat: 'HH:mm:ss'
                    },
                    grid: { display: false },
                    ticks: { 
                        display: true,
                        color: '#75715E',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                },
                y: {
                    grid: { color: '#49483e' },
                    ticks: { color: '#75715E', font: { family: "'Roboto Mono', monospace" } }
                }
            }
        }
    });
};

const handleResetZoom = () => {
    if (marketChart) marketChart.resetZoom();
};

const subscribeToWalletEvents = () => {
    // subscribeModal is called on any modal state change, so we poll wallet state inside
    web3Modal.subscribeModal(() => {
        const button = DOMElements.connectWalletBtn;
        const buttonText = button.querySelector('span')!;

        const wasConnected = state.isWalletConnected;
        const newIsConnected = web3Modal.getIsConnected();
        const newAddress = web3Modal.getAddress();

        state.isWalletConnected = newIsConnected;
        state.walletAddress = newAddress || null;

        if (state.isWalletConnected) {
            if (!wasConnected) { // Fire only on new connection
                const shortAddress = `${state.walletAddress!.substring(0, 6)}...${state.walletAddress!.substring(state.walletAddress!.length - 4)}`;
                addLog(`Wallet connected: ${shortAddress}`);
                showNotification('Wallet connected successfully!', 'success');
            }
            button.classList.add('connected');
            const shortAddress = `${state.walletAddress!.substring(0, 4)}...${state.walletAddress!.substring(state.walletAddress!.length - 4)}`;
            buttonText.textContent = `CONNECTED: ${shortAddress}`;
        } else {
            if (wasConnected) { // Fire only on disconnect
                addLog('Wallet disconnected.');
                showNotification('Wallet disconnected.', 'info');
            }
            button.classList.remove('connected');
            buttonText.textContent = 'CONNECT WALLET';
        }
    });
};


// --- INITIALIZATION ---

const init = () => {
  // Initial Renders
  renderPersonas();
  renderAIProviderSelector();
  renderSentimentGauge();
  renderNews();
  renderAllocation();
  renderDirectivePanel();
  renderTradeHistory();
  initializeChart();

  // Add initial logs
  addLog("Strategic Synthesis Core Initialized.");
  addLog("Chart initialized. Use mouse wheel to zoom and drag to pan.");
  addLog("Awaiting user input.");
  
  // Start live data feed
  connectPriceFeedSocket();

  // Event Listeners
  DOMElements.personaSelector.addEventListener('click', handlePersonaSelect);
  DOMElements.providerSelector.addEventListener('click', handleAIProviderSelect);
  DOMElements.localModelInput.addEventListener('change', handleLocalModelChange);
  DOMElements.allocationSlider.addEventListener('input', handleAllocationChange);
  DOMElements.connectWalletBtn.addEventListener('click', handleWalletConnection);
  DOMElements.autotraderSwitch.addEventListener('change', handleAutotraderToggle);
  DOMElements.resetZoomBtn.addEventListener('click', handleResetZoom);
  DOMElements.manualTpInput.addEventListener('input', handleManualTpChange);
  DOMElements.manualSlInput.addEventListener('input', handleManualSlChange);
  
  // Initialize WalletConnect state subscription
  subscribeToWalletEvents();
};

document.addEventListener('DOMContentLoaded', init);