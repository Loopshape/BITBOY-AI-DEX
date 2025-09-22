import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// FIX: Declare types for external libraries loaded via script tags
declare var Chart: any;
declare var Web3Modal: any;
declare var ChartjsPluginAnnotation: any;
declare var dateFns: any;

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
    currentPrice?: number;
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
  console.warn("API_KEY environment variable not set. Gemini provider will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });

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

const MOCK_ORDER_BOOK = {
    bids: [
        { price: 68120.50, amount: 0.75, total: 51090.37 },
        { price: 68119.00, amount: 1.25, total: 85148.75 },
        { price: 68118.50, amount: 0.50, total: 34059.25 },
        { price: 68115.00, amount: 2.10, total: 143041.50 },
        { price: 68112.00, amount: 3.50, total: 238392.00 },
    ],
    asks: [
        { price: 68122.00, amount: 0.90, total: 61309.80 },
        { price: 68123.50, amount: 1.50, total: 102185.25 },
        { price: 68124.00, amount: 0.80, total: 54499.20 },
        { price: 68128.00, amount: 1.75, total: 119224.00 },
        { price: 68130.00, amount: 2.20, total: 149886.00 },
    ],
};


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
let priceUpdateInterval: number | undefined;

// Chart Drawing State
let drawingMode: 'trendline' | 'annotation' | null = null;
let trendlineStartPoint: { x: number, y: number } | null = null;
let userAnnotations: any = {};
let annotationCounter = 0;


// --- PERSISTENCE ---
const saveState = () => {
  try {
    const stateToSave = {
      selectedPersonaId,
      selectedProviderId,
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
        selectedProviderId = savedState.selectedProviderId || 'gemini';
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
const getElem = <T extends HTMLElement>(selector: string): T => document.querySelector(selector) as T;
const getElems = <T extends HTMLElement>(selector: string): NodeListOf<T> => document.querySelectorAll(selector);

// --- UI UPDATE & RENDERING FUNCTIONS ---

const addLog = (message: string, type: LogEntry['type'] = 'default') => {
    const timestamp = new Date().toLocaleTimeString();
    logEntries.unshift({ timestamp, message, type });
    if (logEntries.length > MAX_LOG_ENTRIES) {
        logEntries.pop();
    }
    renderLog();
    saveState();
};

const renderLog = () => {
    const logContainer = getElem('#ai-log');
    if (!logEntries.length) {
        logContainer.innerHTML = `<div class="placeholder">Log is clear.</div>`;
        return;
    }
    logContainer.innerHTML = logEntries.map(entry => `
        <div class="log-item log-type-${entry.type || 'default'}">
            <span class="timestamp">${entry.timestamp}</span>
            <span class="message">${entry.message}</span>
        </div>
    `).join('');
};

const renderPersonas = () => {
    const container = getElem('#persona-selector');
    container.innerHTML = PERSONAS.map(p => `
        <div class="persona-card ${selectedPersonaId === p.id ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${selectedPersonaId === p.id}">
            <div class="persona-avatar"><i class="${p.icon}"></i></div>
            <div class="persona-name">${p.name}</div>
        </div>
    `).join('');
};

const renderAiProviders = () => {
    const container = getElem('#provider-selector');
    container.innerHTML = AI_PROVIDERS.map(p => `
        <div class="provider-card ${selectedProviderId === p.id ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${selectedProviderId === p.id}">
            <div class="provider-avatar"><i class="${p.icon}"></i></div>
            <div class="provider-name">${p.name}</div>
        </div>
    `).join('');
    getElem('#local-model-container').style.display = selectedProviderId === 'ollama' ? 'block' : 'none';
    getElem<HTMLInputElement>('#local-model-input').value = ollamaModel;
};

const renderTradeHistory = () => {
    const container = getElem('#trade-history');
    if (!tradeHistory.length) {
        container.innerHTML = `<div class="placeholder">No trades completed yet.</div>`;
        return;
    }
    container.innerHTML = tradeHistory.map(t => `
        <div class="trade-item">
            <span>${t.asset} [${t.action}]</span>
            <span class="trade-item-pnl ${t.pnl >= 0 ? 'positive' : 'negative'}">
                ${t.pnl.toFixed(2)} (${t.pnlPercent.toFixed(2)}%)
            </span>
        </div>
    `).join('');
};

const renderOrderBook = () => {
    const container = getElem('#order-book-container');
    const { bids, asks } = MOCK_ORDER_BOOK;

    const maxTotal = Math.max(...[...bids, ...asks].map(o => o.total));

    const bidsHtml = bids.map(bid => `
        <div class="order-book-row">
            <div class="depth-bar" style="width: ${ (bid.total / maxTotal) * 100}%"></div>
            <span>${bid.price.toFixed(2)}</span>
            <span>${bid.amount.toFixed(4)}</span>
            <span>${(bid.total / 1000).toFixed(1)}K</span>
        </div>
    `).join('');

    const asksHtml = asks.map(ask => `
        <div class="order-book-row">
            <div class="depth-bar" style="width: ${ (ask.total / maxTotal) * 100}%"></div>
            <span>${ask.price.toFixed(2)}</span>
            <span>${ask.amount.toFixed(4)}</span>
            <span>${(ask.total / 1000).toFixed(1)}K</span>
        </div>
    `).join('');

    const spread = asks[0].price - bids[0].price;

    container.innerHTML = `
        <h3 class="order-book-title">ORDER BOOK :: BTC/USD</h3>
        <div class="order-book-layout">
            <div class="order-book-column order-book-bids">
                <div class="order-book-header">
                    <span>PRICE (USD)</span>
                    <span>AMOUNT (BTC)</span>
                    <span>TOTAL</span>
                </div>
                <div class="order-book-rows">${bidsHtml}</div>
            </div>
            <div class="order-book-spread">
                <span class="spread-value">${spread.toFixed(2)}</span>
                <span class="spread-label">SPREAD</span>
            </div>
            <div class="order-book-column order-book-asks">
                <div class="order-book-header">
                    <span>PRICE (USD)</span>
                    <span>AMOUNT (BTC)</span>
                    <span>TOTAL</span>
                </div>
                <div class="order-book-rows">${asksHtml}</div>
            </div>
        </div>
    `;
};

const renderNews = () => {
    const feed = getElem('#news-feed');
    feed.innerHTML = MOCK_NEWS.map(item => `<div class="news-item">${item}</div>`).join('');
};

const updateAIStatus = (text: string, isError = false, isWorking = false) => {
    const statusText = getElem('#ai-status-text');
    const statusLight = getElem('#status-light');
    statusText.textContent = text;
    statusLight.classList.toggle('error', isError);
    statusLight.classList.toggle('pulse', !isError && isWorking);
};

const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const container = getElem('#notification-container');
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i> ${message}`;
    notif.setAttribute('role', type === 'error' ? 'alert' : 'status');
    container.appendChild(notif);
    
    // Animate in
    setTimeout(() => notif.classList.add('show'), 10);
    // Animate out and remove
    setTimeout(() => {
        notif.classList.remove('show');
        notif.addEventListener('transitionend', () => notif.remove());
    }, 5000);
};

const renderDirectiveConfirmation = () => {
    if (!currentDirective) return;
    const { asset, action, entry, target, stopLoss, reasoning } = currentDirective;
    const output = getElem('#directive-output');
    output.innerHTML = `
        <div id="trade-confirmation" class="content-fade-in">
            <p class="reasoning-text">"${reasoning}"</p>
            <div class="confirmation-details-grid">
                <div class="confirmation-detail-item"><strong>ASSET:</strong> <span>${asset}</span></div>
                <div class="confirmation-detail-item"><strong>ACTION:</strong> <span class="action-${action.toLowerCase()}">${action}</span></div>
                <div class="confirmation-detail-item"><strong>ENTRY:</strong> <span>${entry.toFixed(2)}</span></div>
                <div class="confirmation-detail-item"><strong>ALLOCATION:</strong> <span>${allocation}%</span></div>
                <div class="confirmation-detail-item"><strong>TARGET:</strong> <span>${target.toFixed(2)}</span></div>
                <div class="confirmation-detail-item"><strong>STOP:</strong> <span>${stopLoss.toFixed(2)}</span></div>
            </div>
        </div>`;

    const btnGroup = getElem('.btn-group');
    btnGroup.innerHTML = `
        <button id="reject-directive-btn" class="btn btn-sell">REJECT</button>
        <button id="execute-directive-btn" class="btn btn-buy">EXECUTE</button>
    `;

    getElem('#execute-directive-btn').addEventListener('click', executeTrade);
    getElem('#reject-directive-btn').addEventListener('click', () => {
        addLog('Directive rejected by user.');
        currentDirective = null;
        renderInitialDirectivePanel();
        saveState();
    });
};

const renderActiveTrade = () => {
    if (!activeTrade) return;

    const { asset, action, entry, target, stopLoss, allocation, currentPrice } = activeTrade;
    const price = currentPrice || entry;
    
    const pnl = action === 'LONG' ? (price - entry) * allocation : (entry - price) * allocation;
    const pnlPercent = (pnl / (entry * allocation)) * 100 * 100; // Simplified PnL %

    const output = getElem('#directive-output');
    output.innerHTML = `
        <div id="live-trade-monitor" class="content-fade-in">
            <div class="trade-monitor-header">
                <span class="trade-monitor-asset">${asset}</span>
                <span class="trade-monitor-direction direction-${action.toLowerCase()}">${action}</span>
            </div>
            <div class="pnl-display">
                <div class="pnl-value ${pnl >= 0 ? 'positive' : 'negative'}">${pnl.toFixed(2)} USD</div>
                <div class="pnl-percent ${pnl >= 0 ? 'positive' : 'negative'}">${pnlPercent.toFixed(2)}%</div>
            </div>
            <div class="trade-details-grid">
                <div class="trade-detail-item"><strong>ENTRY:</strong> <span>${entry.toFixed(2)}</span></div>
                <div class="trade-detail-item"><strong>CURRENT:</strong> <span>${price.toFixed(2)}</span></div>
            </div>
            <div class="trade-progress-bar" id="tp-progress">
                <div class="progress-label"><span>ENTRY</span><span>TARGET: ${target.toFixed(2)}</span></div>
                <div class="progress-track"><div class="progress-fill" style="width: ${Math.min(100, Math.max(0, (price - entry) / (target - entry) * 100))}%;"></div></div>
            </div>
            <div class="trade-progress-bar" id="sl-progress">
                <div class="progress-label"><span>STOP: ${stopLoss.toFixed(2)}</span><span>ENTRY</span></div>
                <div class="progress-track"><div class="progress-fill" style="width: ${Math.min(100, Math.max(0, (entry - price) / (entry - stopLoss) * 100))}%;"></div></div>
            </div>
        </div>
    `;

    const btnGroup = getElem('.btn-group');
    btnGroup.innerHTML = `<button id="close-trade-btn" class="btn btn-sell">CLOSE TRADE</button>`;
    getElem('#close-trade-btn').addEventListener('click', () => closeTrade(price));
};

const renderInitialDirectivePanel = () => {
    getElem('#directive-output').innerHTML = `<span class="placeholder">Select a persona and generate a directive...</span>`;
    getElem('.btn-group').innerHTML = `<button id="generate-directive-btn" class="btn btn-buy">GENERATE DIRECTIVE</button>`;
    getElem('#generate-directive-btn').addEventListener('click', generateDirective);
    updateAIStatus('AWAITING DIRECTIVE');
};

// --- CORE LOGIC & EVENT HANDLERS ---

const validateDirective = (data: any): { isValid: boolean, error?: string } => {
    const requiredKeys: (keyof TradeDirective)[] = ["asset", "action", "entry", "target", "stopLoss", "reasoning"];
    for (const key of requiredKeys) {
        if (!(key in data)) return { isValid: false, error: `Missing key: ${key}` };
    }
    if (data.action !== "LONG" && data.action !== "SHORT") {
        return { isValid: false, error: `Invalid action: ${data.action}` };
    }
    return { isValid: true };
};

const applyManualOverrides = () => {
    if (!currentDirective) return;
    const tpOverride = parseFloat(getElem<HTMLInputElement>('#manual-tp-input').value);
    const slOverride = parseFloat(getElem<HTMLInputElement>('#manual-sl-input').value);
    if (!isNaN(tpOverride) && tpOverride > 0) currentDirective.target = tpOverride;
    if (!isNaN(slOverride) && slOverride > 0) currentDirective.stopLoss = slOverride;
};

const testOllamaConnection = async () => {
    const testBtn = getElem<HTMLButtonElement>('#test-ollama-btn');
    testBtn.disabled = true;
    testBtn.textContent = '...';

    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        showNotification('Ollama connection successful!', 'success');

        const modelExists = data.models.some((m: {name: string}) => m.name.startsWith(ollamaModel));
        if (modelExists) {
            addLog(`Ollama connection test OK. Model "${ollamaModel}" found on server.`);
        } else {
            const availableModels = data.models.length > 0
                ? data.models.map((m: {name: string}) => m.name.split(':')[0]).join(', ')
                : 'none';
            addLog(`Ollama connection test OK, but model "${ollamaModel}" not found. Available: ${availableModels}`, 'default');
        }
    } catch (error) {
        console.error('Ollama connection test failed:', error);
        showNotification('Ollama connection failed. Check server is running.', 'error');
        addLog('Ollama connection test failed. Ensure server is running and accessible (check CORS).', 'error');
    } finally {
        testBtn.disabled = false;
        testBtn.textContent = 'Test';
    }
};

const generateDirective = async () => {
    getElem<HTMLButtonElement>('#generate-directive-btn').disabled = true;
    getElem('.btn-group').innerHTML = `<button id="generate-directive-btn" class="btn btn-buy" disabled>SYNTHESIZING...</button>`;
    getElem('#directive-output').innerHTML = `
        <div class="synthesizing-indicator">
             <span>SYNTHESIZING</span>
             <div class="cursor"></div>
        </div>`;
    updateAIStatus('SYNTHESIZING DIRECTIVE...', false, true);

    const selectedPersona = PERSONAS.find(p => p.id === selectedPersonaId)!;
    addLog(`Engaging ${selectedProviderId.toUpperCase()} with ${selectedPersona.name} persona...`);

    let directiveJson: any;

    try {
        const prompt = `Analyze the current market conditions and provide a trade directive. Current news: ${MOCK_NEWS.join(' ')}`;
        
        if (selectedProviderId === 'gemini') {
            if (!API_KEY) throw new Error("Gemini API key is not configured.");
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: selectedPersona.systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: JSON_SCHEMA,
                },
            });
            addLog(`AI analysis complete. Parsing response...`, 'ai-analysis');
            const jsonText = response.text.trim();
            directiveJson = JSON.parse(jsonText);
        } else if (selectedProviderId === 'ollama') {
            addLog(`Connecting to local Ollama instance with model: ${ollamaModel}...`);
            try {
                const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: ollamaModel,
                        system: `${selectedPersona.systemInstruction}\n\nYou MUST respond with a single, valid JSON object that conforms to the schema provided. Do not include any other text, markdown, or explanations before or after the JSON object.`,
                        prompt: `The user's request is: "${prompt}". The required JSON schema is: ${JSON.stringify(JSON_SCHEMA)}`,
                        format: 'json',
                        stream: false
                    })
                });

                if (!ollamaResponse.ok) {
                    const errorText = await ollamaResponse.text();
                    throw new Error(`Ollama request failed: ${ollamaResponse.status} - ${errorText}`);
                }
                
                const ollamaResult = await ollamaResponse.json();
                if (!ollamaResult.response) {
                    throw new Error('Ollama response is missing the "response" field.');
                }

                addLog(`Ollama analysis complete. Parsing response...`, 'ai-analysis');
                directiveJson = JSON.parse(ollamaResult.response);

            } catch (fetchError: any) {
                 if (fetchError.message.includes('Failed to fetch')) {
                     throw new Error('Connection to local Ollama instance failed. Ensure it is running and accessible from the browser (check CORS settings if running in a container).');
                 }
                 throw fetchError; // Re-throw other errors
            }
        } else {
            throw new Error(`Unsupported AI provider: ${selectedProviderId}`);
        }

        const { isValid, error } = validateDirective(directiveJson);
        if (!isValid) {
            throw new Error(`AI response validation failed: ${error}`);
        }
        
        updateAIStatus('DIRECTIVE RECEIVED');
        currentDirective = directiveJson as TradeDirective;
        applyManualOverrides();
        renderDirectiveConfirmation();
        saveState();

    } catch (error: any) {
        console.error("Directive generation failed:", error);
        addLog(`Error: ${error.message}`, 'error');
        updateAIStatus('SYNTHESIS FAILED', true);
        getElem('#directive-output').innerHTML = `
            <div class="error-message">
                <h4>SYNTHESIS FAILED</h4>
                <p>${error.message.replace(/\n/g, '<br>')}</p>
                <p class="error-subtext">Check logs for more details.</p>
            </div>`;
        showNotification('Directive generation failed.', 'error');
        setTimeout(renderInitialDirectivePanel, 3000);
    } 
};


const executeTrade = () => {
    if (!currentDirective) return;
    activeTrade = {
        ...currentDirective,
        allocation: allocation / 100, // as a factor
    };
    currentDirective = null;
    addLog(`Executing ${activeTrade.action} on ${activeTrade.asset} at ${activeTrade.entry} with ${allocation}% allocation.`);
    showNotification(`Trade Executed: ${activeTrade.action} ${activeTrade.asset}`, 'success');
    renderActiveTrade();
    startPriceSimulation();
    saveState();
};

const closeTrade = (closePrice: number) => {
    if (!activeTrade) return;
    const { asset, action, entryPrice, allocation } = { ...activeTrade, entryPrice: activeTrade.entry };

    const pnl = action === 'LONG' ? (closePrice - entryPrice) * allocation : (entryPrice - closePrice) * allocation;
    const pnlPercent = (pnl / (entryPrice * allocation)) * 100 * 100;

    tradeHistory.unshift({
        asset,
        action,
        entryPrice,
        closePrice,
        pnl,
        pnlPercent,
        timestamp: new Date().toISOString()
    });

    addLog(`Trade closed on ${asset}. PnL: ${pnl.toFixed(2)} (${pnlPercent.toFixed(2)}%)`);
    showNotification(`Trade Closed. PnL: ${pnl.toFixed(2)} USD`, 'success');

    activeTrade = null;
    stopPriceSimulation();
    renderTradeHistory();
    renderInitialDirectivePanel();
    saveState();
};

const startPriceSimulation = () => {
    if (!activeTrade) return;
    priceUpdateInterval = window.setInterval(() => {
        if (!activeTrade) {
            stopPriceSimulation();
            return;
        }
        let currentPrice = activeTrade.currentPrice || activeTrade.entry;
        const volatility = 0.0005; // Simulate 0.05% price fluctuation
        const change = (Math.random() - 0.5) * currentPrice * volatility;
        currentPrice += change;
        activeTrade.currentPrice = currentPrice;
        
        // Check for TP/SL hit
        if (activeTrade.action === 'LONG' && currentPrice >= activeTrade.target) {
            addLog(`Take profit hit for ${activeTrade.asset}!`);
            closeTrade(activeTrade.target);
        } else if (activeTrade.action === 'LONG' && currentPrice <= activeTrade.stopLoss) {
            addLog(`Stop loss hit for ${activeTrade.asset}.`, 'error');
            closeTrade(activeTrade.stopLoss);
        } else if (activeTrade.action === 'SHORT' && currentPrice <= activeTrade.target) {
            addLog(`Take profit hit for ${activeTrade.asset}!`);
            closeTrade(activeTrade.target);
        } else if (activeTrade.action === 'SHORT' && currentPrice >= activeTrade.stopLoss) {
            addLog(`Stop loss hit for ${activeTrade.asset}.`, 'error');
            closeTrade(activeTrade.stopLoss);
        } else {
             renderActiveTrade(); // Only render if trade is still active
        }

    }, 1000);
};

const stopPriceSimulation = () => {
    if(priceUpdateInterval) clearInterval(priceUpdateInterval);
    priceUpdateInterval = undefined;
}

// --- CHARTING ---

const generateMockPriceData = (numPoints = 200, initialPrice = 68000, volatility = 0.01) => {
    const data = [];
    let price = initialPrice;
    const now = new Date();
    for (let i = numPoints - 1; i >= 0; i--) {
        const timestamp = dateFns.subHours(now, i).getTime();
        data.push({ x: timestamp, y: price });
        price += (Math.random() - 0.5) * (price * volatility);
    }
    return data;
};

const handleChartClick = (evt: any) => {
    if (!drawingMode) return;
    
    const canvasPosition = Chart.helpers.getRelativePosition(evt, marketChart);
    const dataX = marketChart.scales.x.getValueForPixel(canvasPosition.x);
    const dataY = marketChart.scales.y.getValueForPixel(canvasPosition.y);
    
    if (drawingMode === 'trendline') {
        if (!trendlineStartPoint) {
            trendlineStartPoint = { x: dataX, y: dataY };
            addLog('Trendline start point set. Click to set end point.');
        } else {
            const annotationName = `trendline_${annotationCounter++}`;
            userAnnotations[annotationName] = {
                type: 'line',
                xMin: trendlineStartPoint.x,
                yMin: trendlineStartPoint.y,
                xMax: dataX,
                yMax: dataY,
                borderColor: '#E6DB74', // accent-yellow
                borderWidth: 2,
            };
            marketChart.options.plugins.annotation.annotations = userAnnotations;
            marketChart.update();
            addLog('Trendline created.');
            trendlineStartPoint = null;
            setDrawingMode(null);
        }
    } else if (drawingMode === 'annotation') {
        const text = prompt('Enter annotation text:');
        if (text) {
            const annotationName = `label_${annotationCounter++}`;
            userAnnotations[annotationName] = {
                type: 'label',
                xValue: dataX,
                yValue: dataY,
                content: text,
                backgroundColor: 'rgba(39, 40, 34, 0.8)',
                color: '#F8F8F2',
                font: { size: 12, family: 'Roboto Mono' },
                padding: 6,
                borderRadius: 4,
            };
            marketChart.options.plugins.annotation.annotations = userAnnotations;
            marketChart.update();
            addLog(`Annotation added: "${text}"`);
        }
        setDrawingMode(null);
    }
};

const initializeChart = () => {
    const ctx = getElem<HTMLCanvasElement>('#marketChart').getContext('2d');
    if (!ctx) return;
    
    priceData = generateMockPriceData();

    const chartConfig = {
        type: 'line',
        data: {
            datasets: [{
                label: 'BTC/USD',
                data: priceData,
                borderColor: '#66D9EF', // accent-cyan
                backgroundColor: 'rgba(102, 217, 239, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                tension: 0.1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        tooltipFormat: 'MMM dd, HH:mm',
                        displayFormats: { hour: 'HH:mm' }
                    },
                    grid: { color: 'rgba(73, 72, 62, 0.5)' }, // border-color
                    ticks: { color: '#75715E' } // text-secondary
                },
                y: {
                    grid: { color: 'rgba(73, 72, 62, 0.5)' }, // border-color
                    ticks: { color: '#75715E' } // text-secondary
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#272822', // bg-dark
                    titleFont: { family: 'Roboto Mono' },
                    bodyFont: { family: 'Roboto Mono' },
                    padding: 10
                },
                zoom: {
                    pan: { enabled: true, mode: 'xy' },
                    zoom: { wheel: { enabled: true }, mode: 'xy' }
                },
                annotation: {
                    annotations: userAnnotations
                }
            },
            onClick: handleChartClick
        }
    };
    
    marketChart = new Chart(ctx, chartConfig);
};

const setDrawingMode = (mode: 'trendline' | 'annotation' | null) => {
    drawingMode = mode;
    trendlineStartPoint = null; // Reset on tool change
    
    // Update button styles
    getElems('.chart-tool-btn').forEach(btn => btn.classList.remove('active'));
    if (mode) {
        getElem(`#${mode === 'trendline' ? 'draw-trendline' : 'add-annotation'}-btn`).classList.add('active');
        addLog(`Drawing mode activated: ${mode}.`);
    } else {
        addLog('Drawing mode deactivated.');
    }
};

// --- INITIALIZATION ---
const setupEventListeners = () => {
    // Persona Selector
    getElem('#persona-selector').addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>('.persona-card');
        if (card && card.dataset.id) {
            selectedPersonaId = card.dataset.id;
            renderPersonas();
            saveState();
        }
    });

    // Provider Selector
    getElem('#provider-selector').addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>('.provider-card');
        if (card && card.dataset.id) {
            selectedProviderId = card.dataset.id as AIProvider['id'];
            renderAiProviders();
            saveState();
        }
    });

    // Ollama model input
    getElem('#local-model-input').addEventListener('change', (e) => {
        ollamaModel = (e.target as HTMLInputElement).value.trim();
        addLog(`Ollama model set to: ${ollamaModel}`);
        saveState();
    });
    
    getElem('#test-ollama-btn').addEventListener('click', testOllamaConnection);

    // Allocation slider
    const allocSlider = getElem<HTMLInputElement>('#allocation-slider');
    const allocValue = getElem('#allocation-value');
    allocSlider.addEventListener('input', () => {
        allocation = parseInt(allocSlider.value);
        allocValue.textContent = `${allocation}%`;
    });
    allocSlider.addEventListener('change', saveState);

    // Chart controls
    getElem('#reset-zoom-btn').addEventListener('click', () => marketChart?.resetZoom());
    getElem('#draw-trendline-btn').addEventListener('click', () => setDrawingMode('trendline'));
    getElem('#add-annotation-btn').addEventListener('click', () => setDrawingMode('annotation'));
    getElem('#clear-drawings-btn').addEventListener('click', () => {
        userAnnotations = {};
        annotationCounter = 0;
        marketChart.options.plugins.annotation.annotations = userAnnotations;
        marketChart.update();
        addLog('Cleared all drawings from chart.');
        setDrawingMode(null);
    });
};

const initializeApp = () => {
    loadState();

    addLog('AI-BITBOY-DEX Strategic Synthesis Core initialized.');
    getElem<HTMLInputElement>('#allocation-slider').value = String(allocation);
    getElem('#allocation-value').textContent = `${allocation}%`;
    
    renderPersonas();
    renderAiProviders();
    renderNews();
    renderOrderBook();
    renderLog();
    renderTradeHistory();
    initializeChart();

    if (activeTrade) {
        renderActiveTrade();
        startPriceSimulation();
    } else {
        renderInitialDirectivePanel();
    }

    setupEventListeners();
};


document.addEventListener('DOMContentLoaded', initializeApp);
