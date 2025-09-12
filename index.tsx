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
  generateBtn: document.getElementById('generate-directive-btn') as HTMLButtonElement,
  directiveOutput: document.getElementById('directive-output')!,
  marketChartCanvas: document.getElementById('marketChart') as HTMLCanvasElement,
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
  // FIX: The 'dataset' property is not available on the generic 'Element' type returned by `closest`.
  // Use an `instanceof` type guard to ensure 'target' is an 'HTMLElement' before accessing 'dataset'.
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

const initializeChart = () => {
    const ctx = DOMElements.marketChartCanvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => `${i+1}`),
            datasets: [{
                label: 'BTC Price',
                data: Array.from({length: 30}, () => 68000 + Math.random() * 2000 - 1000),
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
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: {
                    grid: { color: 'rgba(0, 255, 255, 0.1)' },
                    ticks: { color: '#a0aec0', font: { family: "'Roboto Mono', monospace" } }
                }
            }
        }
    });
};

// --- INITIALIZATION ---

const init = () => {
  // Initial Renders
  renderPersonas();
  renderNews();
  renderAllocation();
  initializeChart();

  // Add initial logs
  addLog("Strategic Synthesis Core Initialized.");
  addLog("Market data feed connected.");
  addLog("Awaiting user input.");

  // Event Listeners
  DOMElements.personaSelector.addEventListener('click', handlePersonaSelect);
  DOMElements.allocationSlider.addEventListener('input', handleAllocationChange);
  DOMElements.generateBtn.addEventListener('click', handleGenerateDirective);
};

document.addEventListener('DOMContentLoaded', init);
