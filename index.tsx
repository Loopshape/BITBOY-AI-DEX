import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// FIX: Declare Chart since it is likely loaded from a script tag and not imported.
declare var Chart: any;

// --- TYPE DEFINITIONS ---
interface Persona {
  id: string;
  name: string;
  icon: string;
  systemInstruction: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
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

const MOCK_NEWS = [
  "Fed holds interest rates steady, citing 'modest' economic growth.",
  "Ethereum's 'Pectra' upgrade sets sight on Q1 2025 launch.",
  "Bitcoin ETF inflows see a major surge in the last 24 hours.",
  "New DeFi protocol launches on Solana, promises high yields.",
  "Regulatory uncertainty in Asia causes market-wide jitters."
];

// --- STATE MANAGEMENT ---
let marketChart: any = null; // Hold chart instance
let state = {
  activePersonaId: 'swing',
  allocation: 50,
  logs: [] as LogEntry[],
  isGenerating: false,
  isWalletConnected: false,
  activeTrade: null as ActiveTrade | null,
  currentPrice: 0,
  tradeHistory: [] as TradeHistoryEntry[],
  priceUpdateInterval: null as number | null,
  manualTakeProfit: null as number | null,
  manualStopLoss: null as number | null,
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
  walletToggle: document.getElementById('wallet-toggle') as HTMLInputElement,
  walletLabel: document.getElementById('wallet-label')!,
  tradeHistory: document.getElementById('trade-history') as HTMLElement,
  resetZoomBtn: document.getElementById('reset-zoom-btn')!,
  manualOverridesContainer: document.getElementById('manual-overrides-container')!,
  manualTpInput: document.getElementById('manual-tp-input') as HTMLInputElement,
  manualSlInput: document.getElementById('manual-sl-input') as HTMLInputElement,
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

const renderLogs = () => {
  DOMElements.aiLog.innerHTML = state.logs.map(log => `
    <div class="log-item">
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

    } else {
        // Render default view
        DOMElements.directiveOutput.innerHTML = `<span class="placeholder">Select a persona and generate a directive...</span>`;
        DOMElements.generateBtnContainer.innerHTML = `<button id="generate-directive-btn" class="btn btn-buy">GENERATE DIRECTIVE</button>`;
        document.getElementById('generate-directive-btn')?.addEventListener('click', handleGenerateDirective);
    }
};


// --- LOGIC FUNCTIONS ---

const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  state.logs.unshift({ timestamp, message });
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

const handleWalletToggle = (e: Event) => {
    state.isWalletConnected = (e.target as HTMLInputElement).checked;
    if (state.isWalletConnected) {
        addLog(`Exodus Wallet simulation mode ENABLED. Trades will be executed hypothetically.`);
        DOMElements.walletLabel.textContent = 'EXODUS SIM CONNECTED';
        DOMElements.manualOverridesContainer.classList.add('hidden');
    } else {
        addLog(`Exodus Wallet simulation mode DISABLED.`);
        DOMElements.walletLabel.textContent = 'EXODUS WALLET SIM';
        DOMElements.manualOverridesContainer.classList.remove('hidden');
    }
};

const startTrade = (directive: TradeDirective) => {
    // Create a mutable copy of the directive to apply overrides
    const effectiveDirective = { ...directive };

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
    state.currentPrice = effectiveDirective.entry;
    addLog(`Directive routed to Exodus Wallet (SIM). Executing ${effectiveDirective.action} ${effectiveDirective.asset}...`);
    
    // Reset and prepare chart for live data
    if (marketChart) {
        marketChart.data.labels = [new Date()];
        marketChart.data.datasets[0].data = [effectiveDirective.entry];
        marketChart.update();
        marketChart.resetZoom();
    }

    renderDirectivePanel();
    state.priceUpdateInterval = window.setInterval(updatePrice, 1000);
};

const updatePrice = () => {
    if (!state.activeTrade) return;

    const volatility = 0.0005; 
    // Add a slight directional bias to make it more realistic than a pure random walk
    const drift = (Math.random() - 0.49) * state.activeTrade.entry * (volatility * 0.1);
    const priceChange = (Math.random() - 0.5) * state.activeTrade.entry * volatility;
    state.currentPrice += priceChange + drift;

    // Update chart
    if (marketChart) {
        marketChart.data.labels.push(new Date());
        marketChart.data.datasets[0].data.push(state.currentPrice);

        // Keep chart history to a manageable size (e.g., last 120 points)
        if (marketChart.data.labels.length > 120) {
            marketChart.data.labels.shift();
            marketChart.data.datasets[0].data.shift();
        }
        marketChart.update('none'); // Use 'none' for smooth non-animated update
    }

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

const closeTrade = (reason: 'manual' | 'tp' | 'sl') => {
    if (!state.activeTrade || state.priceUpdateInterval === null) return;

    clearInterval(state.priceUpdateInterval);
    state.priceUpdateInterval = null;

    const closePrice = reason === 'tp' ? state.activeTrade.target : reason === 'sl' ? state.activeTrade.stopLoss : state.currentPrice;
    const { asset, action, entry } = state.activeTrade;

    const pnl = (closePrice - entry) * (action === 'LONG' ? 1 : -1);
    const pnlPercent = (pnl / entry) * 100;

    state.tradeHistory.unshift({
        asset,
        action,
        entryPrice: entry,
        closePrice,
        pnl,
        pnlPercent,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    });

    addLog(`SIM TRADE CLOSED (${reason.toUpperCase()}). P/L: ${pnl.toFixed(4)} (${pnlPercent.toFixed(2)}%)`);
    
    state.activeTrade = null;
    state.currentPrice = 0;

    renderTradeHistory();
    renderDirectivePanel();
    const generateBtn = document.getElementById('generate-directive-btn') as HTMLButtonElement | null;
    if (generateBtn) generateBtn.disabled = false;
};


const handleGenerateDirective = async () => {
    if (state.isGenerating || state.activeTrade) return;
    
    state.isGenerating = true;
    const generateBtn = document.getElementById('generate-directive-btn') as HTMLButtonElement | null;
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = 'GENERATING...';
    }
    DOMElements.directiveOutput.innerHTML = '';
    setStatus('SYNTHESIZING DIRECTIVE...');
    addLog('Directive generation initiated.');

    const activePersona = PERSONAS.find(p => p.id === state.activePersonaId);
    if (!activePersona) {
        addLog('Error: No active persona found.');
        setStatus('Error: Persona not found', true);
        return;
    }

    try {
        const prompt = `Based on the current (mock) market data showing general greed (78), high volume ($45.2B), and high volatility, provide a trade directive. My capital allocation is ${state.allocation}%.`;
        addLog('Sending request to AI Core...');
        
        if (state.isWalletConnected) {
             const result = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    systemInstruction: activePersona.systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: JSON_SCHEMA,
                },
            });
            addLog('Received JSON directive from AI Core.');
            try {
                const directive = JSON.parse(result.text) as TradeDirective;
                addLog('Directive parsed successfully.');
                startTrade(directive);
            } catch (parseError) {
                 throw new Error("Failed to parse AI response as valid JSON.");
            }

        } else {
            const result = await ai.models.generateContentStream({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: { systemInstruction: activePersona.systemInstruction },
            });

            addLog('Receiving stream from AI Core...');
            let fullResponse = '';
            const cursor = `<span class="cursor"></span>`;
            DOMElements.directiveOutput.innerHTML = cursor;

            for await (const chunk of result) {
                fullResponse += chunk.text;
                DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>') + cursor;
            }

            DOMElements.directiveOutput.innerHTML = fullResponse.replace(/\n/g, '<br>'); // Remove cursor
            addLog('Directive received and displayed.');
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage = `ERROR: Failed to communicate with AI Core. ${error instanceof Error ? error.message : ''}`;
        DOMElements.directiveOutput.innerHTML = `<span class="error-message">${errorMessage}</span>`;
        setStatus(errorMessage, true);
        addLog(errorMessage);
    } finally {
        state.isGenerating = false;
        // If not in a trade, re-enable the button
        if (!state.activeTrade) {
             const finalGenerateBtn = document.getElementById('generate-directive-btn') as HTMLButtonElement | null;
             if(finalGenerateBtn) {
                finalGenerateBtn.disabled = false;
                finalGenerateBtn.textContent = 'GENERATE DIRECTIVE';
             }
        }
        setStatus('AWAITING DIRECTIVE');
    }
};

const initializeChart = () => {
    const ctx = DOMElements.marketChartCanvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    
    // Generate some plausible historical data
    const initialData = [];
    const initialLabels = [];
    let price = 68000;
    const now = Date.now();
    for (let i = 0; i < 60; i++) {
        price += (Math.random() - 0.5) * 150;
        initialLabels.push(new Date(now - (60 - i) * 60000)); // 60 minutes of data
        initialData.push(price);
    }

    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialLabels,
            datasets: [{
                label: 'BTC Price',
                data: initialData,
                borderColor: 'rgba(0, 255, 255, 1)',
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
                        color: '#a0aec0',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                },
                y: {
                    grid: { color: 'rgba(0, 255, 255, 0.1)' },
                    ticks: { color: '#a0aec0', font: { family: "'Roboto Mono', monospace" } }
                }
            }
        }
    });
};

const handleResetZoom = () => {
    if (marketChart) marketChart.resetZoom();
};

// --- INITIALIZATION ---

const init = () => {
  // Initial Renders
  renderPersonas();
  renderNews();
  renderAllocation();
  renderDirectivePanel();
  renderTradeHistory();
  initializeChart();

  // Add initial logs
  addLog("Strategic Synthesis Core Initialized.");
  addLog("Market data feed connected.");
  addLog("Awaiting user input.");

  // Event Listeners
  DOMElements.personaSelector.addEventListener('click', handlePersonaSelect);
  DOMElements.allocationSlider.addEventListener('input', handleAllocationChange);
  DOMElements.walletToggle.addEventListener('change', handleWalletToggle);
  DOMElements.resetZoomBtn.addEventListener('click', handleResetZoom);
  DOMElements.manualTpInput.addEventListener('input', handleManualTpChange);
  DOMElements.manualSlInput.addEventListener('input', handleManualSlChange);
  
  // Set initial visibility of manual overrides
  DOMElements.manualOverridesContainer.classList.toggle('hidden', state.isWalletConnected);
};

document.addEventListener('DOMContentLoaded', init);