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
const getElem = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// --- UI UPDATE & RENDER FUNCTIONS ---
const updatePersonaSelection = () => {
    document.querySelectorAll<HTMLDivElement>('.persona-card').forEach(card => {
        card.classList.toggle('active', card.dataset.personaId === selectedPersonaId);
    });
};

const renderPersonas = () => {
    const personaSelector = getElem('persona-selector');
    personaSelector.innerHTML = '';
    PERSONAS.forEach(persona => {
        const personaCard = document.createElement('div');
        personaCard.className = 'persona-card';
        personaCard.dataset.personaId = persona.id;
        personaCard.innerHTML = `<div class="persona-avatar"><i class="${persona.icon}"></i></div><div class="persona-name">${persona.name}</div>`;
        personaCard.addEventListener('click', () => {
            selectedPersonaId = persona.id;
            updatePersonaSelection();
            addLog(`Persona changed to: ${persona.name}`);
            saveState();
        });
        personaSelector.appendChild(personaCard);
    });
    updatePersonaSelection();
};

const renderProviders = () => {
    const providerSelector = getElem('provider-selector');
    const localModelContainer = getElem('local-model-container');
    const update = () => {
        document.querySelectorAll<HTMLDivElement>('.provider-card').forEach(card => {
            card.classList.toggle('active', card.dataset.providerId === selectedProviderId);
        });
        localModelContainer.style.display = selectedProviderId === 'ollama' ? 'block' : 'none';
    };
    providerSelector.innerHTML = '';
    AI_PROVIDERS.forEach(provider => {
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        providerCard.dataset.providerId = provider.id;
        providerCard.innerHTML = `<div class="provider-avatar"><i class="${provider.icon}"></i></div><div class="provider-name">${provider.name}</div>`;
        providerCard.addEventListener('click', () => {
            selectedProviderId = provider.id;
            update();
            addLog(`AI provider switched to ${provider.name}.`);
            saveState();
        });
        providerSelector.appendChild(providerCard);
    });
    update();
};

const renderLogs = () => {
    const logContainer = getElem('ai-log');
    logContainer.innerHTML = logEntries.map(log =>
        `<div class="log-item log-type-${log.type || 'default'}">
            <span class="timestamp">[${log.timestamp}]</span> <span class="message">${log.message}</span>
        </div>`
    ).join('');
    logContainer.scrollTop = logContainer.scrollHeight;
};

const renderTradeHistory = () => {
    const tradeHistoryContainer = getElem('trade-history');
    if (tradeHistory.length === 0) {
        tradeHistoryContainer.innerHTML = '<div class="placeholder">No trades completed yet.</div>';
        return;
    }
    tradeHistoryContainer.innerHTML = tradeHistory.map(trade => `
        <div class="trade-item">
            <span>${trade.asset} ${trade.action}</span>
            <span class="trade-item-pnl ${trade.pnl >= 0 ? 'positive' : 'negative'}">
                ${trade.pnl.toFixed(2)} (${trade.pnlPercent.toFixed(2)}%)
            </span>
        </div>
    `).join('');
};

const renderNewsFeed = () => {
    getElem('news-feed').innerHTML = MOCK_NEWS.map(item => `<div class="news-item">${item}</div>`).join('');
};

const renderSentimentGauge = (value: number) => {
    const container = getElem('sentiment-gauge-container');
    // Gauge rendering logic would go here, assuming it's complex and static for now.
    container.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">Sentiment Gauge: ${value}</p>`;
};


// --- CORE LOGIC ---
const addLog = (message: string, type: LogEntry['type'] = 'default') => {
    const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        message,
        type
    };
    logEntries.push(newLog);
    if (logEntries.length > MAX_LOG_ENTRIES) {
        logEntries.shift();
    }
    renderLogs();
    saveState();
};

const getSelectedPersona = (): Persona => PERSONAS.find(p => p.id === selectedPersonaId)!;

const resetDirectivePanel = () => {
    getElem('directive-output').innerHTML = `<span class="placeholder">Select a persona and generate a directive...</span>`;
    const btnGroup = getElem('directive-panel').querySelector('.btn-group')!;
    btnGroup.innerHTML = `<button id="generate-directive-btn" class="btn btn-buy">GENERATE DIRECTIVE</button>`;
    getElem('generate-directive-btn').addEventListener('click', generateDirective);
    getElem('ai-status-text').textContent = 'AWAITING DIRECTIVE';
}

const generateDirective = async () => {
    addLog("Generating new directive...");
    const generateBtn = getElem<HTMLButtonElement>('generate-directive-btn');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = `SYNTHESIZING<span class="cursor">_</span>`;
    }
    getElem('ai-status-text').textContent = 'AI SYNTHESIZING...';

    const persona = getSelectedPersona();
    const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].y : 68000;

    const prompt = `
        Market Context:
        - Current BTC/USD Price: ${currentPrice.toFixed(2)}
        - Recent News Headlines:
          ${MOCK_NEWS.map(n => `- ${n}`).join('\n')}
        
        Based on the market context, your assigned persona, and the provided JSON schema, please provide a single, actionable trade directive.
    `;

    try {
        let directive: TradeDirective | null = null;

        if (selectedProviderId === 'gemini') {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: `${persona.systemInstruction} You must respond ONLY with a valid JSON object that conforms to the provided schema. Do not include any other text, markdown, or explanation.`,
                    responseMimeType: "application/json",
                    responseSchema: JSON_SCHEMA,
                }
            });

            const jsonString = response.text.trim();
            directive = JSON.parse(jsonString) as TradeDirective;
        } else if (selectedProviderId === 'ollama') {
            const ollamaResponse = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: ollamaModel,
                    messages: [
                        { 
                            role: 'system', 
                            content: `${persona.systemInstruction} You must respond ONLY with a valid JSON object that conforms to this schema: ${JSON.stringify(JSON_SCHEMA)}. Do not include any other text, markdown, or explanation.` 
                        },
                        { role: 'user', content: prompt }
                    ],
                    stream: false,
                    format: 'json'
                })
            });

            if (!ollamaResponse.ok) {
                const errorBody = await ollamaResponse.text();
                throw new Error(`Ollama request failed: ${ollamaResponse.status} ${errorBody}`);
            }

            const responseData = await ollamaResponse.json();
            const jsonString = responseData.message.content;
            directive = JSON.parse(jsonString) as TradeDirective;
        }

        if (directive) {
            addLog(`AI Directive Received: ${directive.action} ${directive.asset}`, 'ai-analysis');
            displayDirective(directive);
            getElem('ai-status-text').textContent = 'DIRECTIVE RECEIVED';
        } else {
            throw new Error("AI provider did not return a valid directive.");
        }

    } catch (error: any) {
        console.error("Failed to generate directive:", error);
        addLog(`Error generating directive: ${error.message}`, 'error');
        getElem('ai-status-text').textContent = 'AI ERROR';
        resetDirectivePanel();
    }
};

const displayDirective = (directive: TradeDirective) => {
    currentDirective = directive;
    saveState();
    const directiveOutput = getElem('directive-output');
    
    directiveOutput.innerHTML = `
    <div id="trade-confirmation" class="content-fade-in">
        <p class="reasoning-text">"${directive.reasoning}"</p>
        <div class="confirmation-details-grid">
            <div class="confirmation-detail-item"><strong>Asset</strong> <span>${directive.asset}</span></div>
            <div class="confirmation-detail-item"><strong>Action</strong> <span class="action-${directive.action.toLowerCase()}">${directive.action}</span></div>
            <div class="confirmation-detail-item"><strong>Entry</strong> <span>${directive.entry.toFixed(2)}</span></div>
            <div class="confirmation-detail-item"><strong>Target</strong> <span>${directive.target.toFixed(2)}</span></div>
            <div class="confirmation-detail-item"><strong>Stop Loss</strong> <span>${directive.stopLoss.toFixed(2)}</span></div>
            <div class="confirmation-detail-item"><strong>Allocation</strong> <span>${allocation}%</span></div>
        </div>
    </div>
    `;

    const btnGroup = getElem('directive-panel').querySelector('.btn-group')!;
    btnGroup.innerHTML = `
        <button id="reject-directive-btn" class="btn btn-sell">REJECT</button>
        <button id="execute-directive-btn" class="btn btn-buy">EXECUTE TRADE</button>
    `;

    getElem('execute-directive-btn').addEventListener('click', executeTrade);
    getElem('reject-directive-btn').addEventListener('click', () => {
        currentDirective = null;
        addLog("Directive rejected by user.");
        resetDirectivePanel();
        saveState();
    });
};

const executeTrade = () => {
    if (!currentDirective) {
        addLog("Error: No directive available to execute.", "error");
        return;
    }

    activeTrade = {
        ...currentDirective,
        allocation: allocation
    };

    addLog(`TRADE EXECUTED: ${activeTrade.action} ${activeTrade.asset} @ ${activeTrade.entry}. Allocation: ${allocation}%`);
    currentDirective = null; 
    displayLiveTrade();
    saveState();
};

const displayLiveTrade = () => {
    if (!activeTrade) return;
    const directiveOutput = getElem('directive-output');
    
    directiveOutput.innerHTML = `
        <div id="live-trade-monitor" class="content-fade-in">
            <div class="trade-monitor-header">
                <span class="trade-monitor-asset">${activeTrade.asset}</span>
                <span class="trade-monitor-direction direction-${activeTrade.action.toLowerCase()}">${activeTrade.action}</span>
            </div>
            <div class="pnl-display">
                <div id="live-pnl-value" class="pnl-value positive">$0.00</div>
                <div id="live-pnl-percent" class="pnl-percent positive">(+0.00%)</div>
            </div>
            <div class="trade-details-grid">
                <div class="trade-detail-item"><strong>Entry Price</strong><span>${activeTrade.entry.toFixed(2)}</span></div>
                <div class="trade-detail-item"><strong>Current Price</strong><span id="live-current-price">${priceData.length > 0 ? priceData[priceData.length - 1].y.toFixed(2) : '...'}</span></div>
            </div>
            <div id="tp-progress" class="trade-progress-bar" style="margin-top: 1rem;">
                <div class="progress-label"><span>Entry</span><span>Take Profit (${activeTrade.target.toFixed(2)})</span></div>
                <div class="progress-track"><div class="progress-fill"></div></div>
            </div>
            <div id="sl-progress" class="trade-progress-bar">
                <div class="progress-label"><span>Stop Loss (${activeTrade.stopLoss.toFixed(2)})</span><span>Entry</span></div>
                <div class="progress-track"><div class="progress-fill"></div></div>
            </div>
            <div class="btn-group" style="margin-top: 1.5rem;">
                <button id="close-trade-btn" class="btn btn-sell">CLOSE TRADE MANUALLY</button>
            </div>
        </div>
    `;
    
    const btnGroup = getElem('directive-panel').querySelector('.btn-group')!;
    btnGroup.innerHTML = `<button id="close-trade-btn" class="btn btn-sell">CLOSE TRADE MANUALLY</button>`;
    getElem('close-trade-btn').addEventListener('click', () => {
        const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].y : activeTrade!.entry;
        closeTrade(currentPrice);
    });

    getElem('ai-status-text').textContent = `LIVE TRADE: ${activeTrade.action} ${activeTrade.asset}`;
};

const updateLiveTradeMonitor = (currentPrice: number) => {
    if (!activeTrade) return;

    const pnlValueElem = getElem('live-pnl-value');
    const pnlPercentElem = getElem('live-pnl-percent');
    const currentPriceElem = getElem('live-current-price');
    const tpProgressFill = document.querySelector<HTMLDivElement>('#tp-progress .progress-fill');
    const slProgressFill = document.querySelector<HTMLDivElement>('#sl-progress .progress-fill');

    if (!pnlValueElem || !pnlPercentElem || !currentPriceElem || !tpProgressFill || !slProgressFill) return;

    const pnl = (currentPrice - activeTrade.entry) * (activeTrade.action === "LONG" ? 1 : -1);
    const pnlPercent = (pnl / activeTrade.entry) * 100;
    const isProfit = pnl >= 0;

    pnlValueElem.textContent = `${isProfit ? '+' : ''}${pnl.toFixed(2)}`;
    pnlPercentElem.textContent = `(${isProfit ? '+' : ''}${pnlPercent.toFixed(2)}%)`;
    pnlValueElem.className = `pnl-value ${isProfit ? 'positive' : 'negative'}`;
    pnlPercentElem.className = `pnl-percent ${isProfit ? 'positive' : 'negative'}`;

    currentPriceElem.textContent = currentPrice.toFixed(2);
    
    let tpProgress = 0;
    let slProgress = 0;
    const { entry, target, stopLoss, action } = activeTrade;

    if (action === 'LONG') {
        tpProgress = ((currentPrice - entry) / (target - entry)) * 100;
        slProgress = ((entry - currentPrice) / (entry - stopLoss)) * 100;
    } else { // SHORT
        tpProgress = ((entry - currentPrice) / (entry - target)) * 100;
        slProgress = ((currentPrice - entry) / (stopLoss - entry)) * 100;
    }

    tpProgressFill.style.width = `${Math.max(0, Math.min(100, tpProgress))}%`;
    slProgressFill.style.width = `${Math.max(0, Math.min(100, slProgress))}%`;
};

const closeTrade = (closePrice: number) => { 
    if (!activeTrade) return;
    const pnl = (closePrice - activeTrade.entry) * (activeTrade.action === "LONG" ? 1 : -1);
    const pnlPercent = (pnl / activeTrade.entry) * 100;
    const historyEntry: TradeHistoryEntry = {
        asset: activeTrade.asset,
        action: activeTrade.action,
        entryPrice: activeTrade.entry,
        closePrice: closePrice,
        pnl: pnl,
        pnlPercent: pnlPercent,
        timestamp: new Date().toISOString()
    };
    tradeHistory.unshift(historyEntry);
    renderTradeHistory();
    addLog(`TRADE CLOSED: ${activeTrade.asset} ${activeTrade.action}. PNL: ${pnl.toFixed(2)} USD (${pnlPercent.toFixed(2)}%)`);
    activeTrade = null;
    currentDirective = null;
    resetDirectivePanel();
    saveState();
};

// --- CHART & SIMULATION ---
const initializeChart = () => { /* Existing logic... */ };
const updateChartData = (newDataPoint: { x: number; y: number; }) => { /* Existing logic... */ };
const startPriceSimulation = () => {
    let lastPrice = 68000;
    if (priceData.length === 0) {
        priceData = Array.from({ length: 50 }, (_, i) => ({ x: Date.now() - (50 - i) * 60000, y: lastPrice + (Math.random() - 0.5) * 500 }));
    }
    lastPrice = priceData[priceData.length-1].y;

    setInterval(() => {
        const volatility = 100;
        const newPrice = lastPrice + (Math.random() - 0.5) * volatility;
        const newPoint = { x: Date.now(), y: newPrice };
        
        updateChartData(newPoint);
        lastPrice = newPrice;

        if (activeTrade) {
            updateLiveTradeMonitor(newPrice);
            const { target, stopLoss, action } = activeTrade;
            const isLong = action === 'LONG';
            if ((isLong && (newPrice >= target || newPrice <= stopLoss)) ||
                (!isLong && (newPrice <= target || newPrice >= stopLoss))) {
                const reason = (isLong && newPrice >= target) || (!isLong && newPrice <= target) ? 'Take Profit' : 'Stop Loss';
                addLog(`Trade auto-closed: ${reason} hit at ${newPrice.toFixed(2)}`);
                closeTrade(newPrice);
            }
        }
    }, 2000);
 };


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    web3Modal = new Web3Modal.Standalone({
        projectId: WALLETCONNECT_PROJECT_ID,
        chains: chains,
        walletConnectVersion: 2,
        metadata
    });

    const isRestored = !!localStorage.getItem('aiBitboyState');
    loadState(); 

    const connectWalletBtn = getElem('connect-wallet-btn');
    const allocationSlider = getElem<HTMLInputElement>('allocation-slider');
    const allocationValue = getElem('allocation-value');
    const localModelInput = getElem<HTMLInputElement>('local-model-input');

    renderPersonas();
    renderProviders();
    renderSentimentGauge(55);
    renderNewsFeed();
    initializeChart();
    renderTradeHistory();
    renderLogs(); 
    
    if (activeTrade) {
        displayLiveTrade();
    } else if (currentDirective) {
        displayDirective(currentDirective);
    } else {
        resetDirectivePanel();
    }

    allocationSlider.value = String(allocation);
    allocationValue.textContent = `${allocation}%`;
    localModelInput.value = ollamaModel;

    if (isRestored && !activeTrade) {
        addLog('Session state restored from previous session.');
    }
    if(!activeTrade) addLog("AI-BITBOY-DEX core initialized. System online.");

    connectWalletBtn.addEventListener('click', () => web3Modal.openModal());
    allocationSlider.addEventListener('input', (e) => {
        allocation = parseInt((e.target as HTMLInputElement).value, 10);
        allocationValue.textContent = `${allocation}%`;
        saveState();
    });
    localModelInput.addEventListener('input', (e) => {
        ollamaModel = (e.target as HTMLInputElement).value;
        saveState();
    });

    startPriceSimulation();
});