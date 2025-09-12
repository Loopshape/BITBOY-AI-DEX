import { GoogleGenAI } from "@google/genai";

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

interface PriceDataPoint {
    x: Date;
    y: number;
}

// --- MOCK DATA & CONFIG ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PERSONAS: Persona[] = [
  {
    id: 'scalper',
    name: 'Scalper',
    icon: 'fa-solid fa-bolt',
    systemInstruction: 'You are an aggressive, high-frequency crypto trading AI. Provide extremely short-term, high-probability trade directives for scalping. Focus on immediate price action, order book depth, and micro-trends. Be concise and direct. Output should be a single, actionable trade with entry, target, and stop-loss.',
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    icon: 'fa-solid fa-chart-line',
    systemInstruction: 'You are a crypto swing trading AI. Your analysis covers a multi-day to multi-week timeframe. Identify potential swing highs and lows based on technical indicators like MACD, RSI, and moving averages. Provide a clear entry point, target, and stop-loss. Explain your reasoning briefly.',
  },
  {
    id: 'investor',
    name: 'Investor',
    icon: 'fa-solid fa-gem',
    systemInstruction: 'You are a long-term crypto investment AI. Focus on fundamental analysis, project viability, tokenomics, and long-term market trends. Identify undervalued assets with strong growth potential. Your directives should be for holding positions for months or years. Justify your picks with solid reasoning.',
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
let state = {
  activePersonaId: 'swing',
  allocation: 50,
  logs: [] as LogEntry[],
  isGenerating: false,
  activeTimeframe: '1H',
};

let marketChartInstance: any = null;
let historicalData: PriceDataPoint[] = [];

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
  generateBtn: document.getElementById('generate-directive-btn') as HTMLButtonElement,
  directiveOutput: document.getElementById('directive-output')!,
  marketChartCanvas: document.getElementById('marketChart') as HTMLCanvasElement,
  resetZoomBtn: document.getElementById('reset-zoom-btn') as HTMLButtonElement,
  timeframeSelector: document.getElementById('timeframe-selector')!,
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
    DOMElements.allocationSlider.style.setProperty('--track-fill-percent', `${value}%`);
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

const handleGenerateDirective = async () => {
    if (state.isGenerating) return;
    
    state.isGenerating = true;
    DOMElements.generateBtn.disabled = true;
    DOMElements.generateBtn.textContent = 'GENERATING...';
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
        
        const result = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: activePersona.systemInstruction
            },
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

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage = 'ERROR: Failed to communicate with AI Core.';
        DOMElements.directiveOutput.innerHTML = `<span class="error-message">${errorMessage}</span>`;
        setStatus(errorMessage, true);
        addLog(errorMessage);
    } finally {
        state.isGenerating = false;
        DOMElements.generateBtn.disabled = false;
        DOMElements.generateBtn.textContent = 'GENERATE DIRECTIVE';
        setStatus('AWAITING DIRECTIVE');
    }
};

const handleResetZoom = () => {
    if (marketChartInstance) {
        marketChartInstance.resetZoom();
    }
};

const generateInitialData = (): PriceDataPoint[] => {
    const data: PriceDataPoint[] = [];
    const now = new Date();
    let currentPrice = 69000;
    const minutesInDay = 24 * 60; // Generate one day of initial minute-by-minute data

    for (let i = minutesInDay; i > 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 1000);
        const fluctuation = (Math.random() - 0.5) * (currentPrice * 0.001); 
        const drift = (Math.random() - 0.49) * 5; 
        currentPrice += fluctuation + drift;
        
        if (currentPrice < 60000) currentPrice = 60000 + Math.random() * 100;
        if (currentPrice > 75000) currentPrice = 75000 - Math.random() * 100;

        data.push({ x: timestamp, y: currentPrice });
    }
    return data;
};

const startRealtimeFeed = () => {
    addLog("Connecting to real-time BTC/USD price feed...");
    
    setInterval(() => {
        const lastPrice = historicalData.length > 0 ? historicalData[historicalData.length - 1].y : 69000;
        const fluctuation = (Math.random() - 0.5) * (lastPrice * 0.0005);
        const drift = (Math.random() - 0.5) * 2;
        let newPrice = lastPrice + fluctuation + drift;

        if (newPrice < 60000) newPrice = 60000 + Math.random() * 50;
        if (newPrice > 75000) newPrice = 75000 - Math.random() * 50;
        
        const newPoint: PriceDataPoint = { x: new Date(), y: newPrice };

        historicalData.push(newPoint);
        if (historicalData.length > 7 * 24 * 60) { // Keep ~7 days of minute-level data
            historicalData.shift();
        }

        if (state.activeTimeframe === '1H' && marketChartInstance) {
            const chartData = marketChartInstance.data.datasets[0].data;
            chartData.push(newPoint);
            
            if (chartData.length > 300) { 
                chartData.shift();
            }
            
            marketChartInstance.update('quiet'); 
        }
    }, 2000); // New data every 2 seconds

    addLog("Price feed connected. Streaming live data.");
};

const aggregateData = (data: PriceDataPoint[], hours: number): PriceDataPoint[] => {
    if (hours <= 0) return data;
    const aggregated: PriceDataPoint[] = [];
    const interval = hours * 60 * 60 * 1000;
    let lastTimestamp = 0;
    
    for (const point of data) {
        if (point.x.getTime() - lastTimestamp > interval) {
            aggregated.push(point);
            lastTimestamp = point.x.getTime();
        }
    }
    if (data.length > 0 && (aggregated.length === 0 || aggregated[aggregated.length - 1].x !== data[data.length - 1].x)) {
         aggregated.push(data[data.length - 1]);
    }

    return aggregated;
};

const updateChartView = (timeframe: string) => {
    if (!marketChartInstance || !historicalData.length) return;

    let newData: PriceDataPoint[];
    let timeUnit: string;
    let tooltipFormat: string = 'MMM d, h:mm a';
    let displayFormats: any = { hour: 'h a', day: 'MMM d' };

    switch (timeframe) {
        case '4H':
            newData = aggregateData(historicalData, 4);
            timeUnit = 'hour';
            break;
        case '1D':
            newData = aggregateData(historicalData, 24);
            timeUnit = 'day';
            tooltipFormat = 'MMM d, yyyy';
            break;
        case '1W':
             newData = aggregateData(historicalData, 24 * 7);
             timeUnit = 'week';
             tooltipFormat = 'MMM d, yyyy';
             break;
        case '1H':
        default:
            const liveViewDataPoints = 300;
            newData = historicalData.slice(-liveViewDataPoints);
            timeUnit = 'minute';
            tooltipFormat = 'h:mm:ss a';
            displayFormats = { minute: 'h:mm a', hour: 'h:mm a' };
            break;
    }

    marketChartInstance.data.datasets[0].data = newData;
    marketChartInstance.options.scales.x.time.unit = timeUnit;
    marketChartInstance.options.scales.x.time.tooltipFormat = tooltipFormat;
    marketChartInstance.options.scales.x.time.displayFormats = displayFormats;
    marketChartInstance.update();
    marketChartInstance.resetZoom();
};

const handleTimeframeChange = (e: Event) => {
    const target = (e.target as HTMLElement).closest('[data-timeframe]');
    if (target instanceof HTMLElement) {
        const newTimeframe = target.dataset.timeframe;
        if (newTimeframe && newTimeframe !== state.activeTimeframe) {
            state.activeTimeframe = newTimeframe;
            
            document.querySelectorAll('#timeframe-selector .timeframe-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            target.classList.add('active');
            
            updateChartView(newTimeframe);
            addLog(`Chart timeframe switched to ${newTimeframe}.`);
        }
    }
};

const initializeChart = () => {
    const ctx = DOMElements.marketChartCanvas.getContext('2d');
    if (!ctx) return;

    if (marketChartInstance) {
        marketChartInstance.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

    marketChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'BTC Price',
                data: [], // Initially empty, populated by updateChartView
                borderColor: 'rgba(0, 255, 255, 1)',
                backgroundColor: gradient,
                borderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0, 255, 255, 1)',
                tension: 0.4,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0 // Disable for performance with real-time data
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(19, 26, 45, 0.9)',
                    titleColor: '#00ffff',
                    bodyColor: '#e0e0e0',
                    borderColor: '#00ffff44',
                    borderWidth: 1,
                    padding: 10,
                    titleFont: { family: "'Roboto Mono', monospace" },
                    bodyFont: { family: "'Roboto Mono', monospace" },
                    callbacks: {
                        label: function(context: any) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                        threshold: 5,
                    },
                    zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
                        mode: 'x',
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        tooltipFormat: 'h:mm:ss a',
                        displayFormats: { minute: 'h:mm a', hour: 'h:mm a' }
                    },
                    grid: { display: false },
                    ticks: {
                        color: '#a0aec0',
                        font: { family: "'Roboto Mono', monospace" },
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10,
                    }
                },
                y: {
                    grid: { color: 'rgba(0, 255, 255, 0.1)' },
                    ticks: {
                        color: '#a0aec0',
                        font: { family: "'Roboto Mono', monospace" },
                        callback: function(value: any) {
                            return '$' + (Number(value) / 1000) + 'k';
                        }
                    }
                }
            }
        }
    });
    updateChartView(state.activeTimeframe);
};

// --- INITIALIZATION ---

const init = () => {
  // Generate initial historical data
  historicalData = generateInitialData();

  // Initial Renders
  renderPersonas();
  renderNews();
  renderAllocation();
  initializeChart();

  // Start the live feed after chart is ready
  startRealtimeFeed();

  // Add initial logs
  addLog("Strategic Synthesis Core Initialized.");
  addLog("Awaiting user input.");

  // Event Listeners
  DOMElements.personaSelector.addEventListener('click', handlePersonaSelect);
  DOMElements.allocationSlider.addEventListener('input', handleAllocationChange);
  DOMElements.generateBtn.addEventListener('click', handleGenerateDirective);
  DOMElements.resetZoomBtn.addEventListener('click', handleResetZoom);
  DOMElements.timeframeSelector.addEventListener('click', handleTimeframeChange);
};

document.addEventListener('DOMContentLoaded', init);
