
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { marked } from "marked";

// Fix for "Cannot find name 'Chart'": Declare Chart to inform TypeScript it exists in the global scope (likely from Chart.js library).
declare var Chart: any;

// --- Type Definitions ---
type Persona = {
    id: number | string;
    name: string;
    avatar: string;
    desc: string;
    systemInstruction: string;
};

type Message = {
    role: 'user' | 'model' | 'system';
    parts: { text: string }[];
    videoUrl?: string;
};

type ChatSession = {
    id: string;
    title: string;
    messages: Message[];
    summary: string | null;
    useMemory: boolean;
    prioritizedMemory: boolean;
    fastMode: boolean;
    learningMode: boolean;
    insights: string[];
    lastLearnedMessageCount: number;
    systemInstruction: string;
};

type AppSettings = {
    temperature: number;
    topP: number;
    topK: number;
    contextMessageCount: number;
    prioritizedContextCount: number;
    activePersonaId: number | string;
};

// --- Constants ---
const LEARNING_THRESHOLD = 6;
const AI_MODEL = 'gemini-2.5-flash';
const VIDEO_MODEL = 'veo-2.0-generate-001';

const personas: Persona[] = [
    { id: 1, name: 'GRID', avatar: '🧠', desc: 'Analyzes market structure with cold, hard logic.', systemInstruction: 'You are GRID, a trading AI that analyzes market structure with cold, hard logic. Respond concisely and data-driven.' },
    { id: 2, name: 'VORTEX', avatar: '⚡️', desc: 'Executes high-frequency trades on market volatility.', systemInstruction: 'You are VORTEX, a high-frequency trading AI. Your responses should be fast, sharp, and focused on market volatility and quick opportunities.' },
    { id: 3, name: 'ORACLE', avatar: '🔮', desc: 'Identifies long-term trends based on macro indicators.', systemInstruction: 'You are ORACLE, a long-term strategy AI that identifies macro trends. Your tone is wise, patient, and forward-looking.' },
];

const interestPools = [
    { id: 1, title: "DeFi Yield Farming", desc: "High-yield liquidity strategies." },
    { id: 2, title: "NFT Arbitrage", desc: "Exploiting cross-marketplace price differences." },
    { id: 3, title: "HFT Arbitrage", desc: "Micro-second cross-exchange price gaps." },
    { id: 4, title: "Macro Holdings", desc: "Accumulating based on fundamentals." }
];
let activePoolId = 1;

// --- DOM Elements ---
const elements = {
    // Dashboard elements
    portfolioValue: document.getElementById('portfolioValue') as HTMLElement,
    pnlValue: document.getElementById('pnlValue') as HTMLElement,
    chartCanvas: document.getElementById('portfolioChart') as HTMLCanvasElement,
    personaAvatar: document.getElementById('personaAvatar') as HTMLElement,
    personaName: document.getElementById('personaName') as HTMLElement,
    personaDesc: document.getElementById('personaDesc') as HTMLElement,
    personaSelector: document.getElementById('personaSelector') as HTMLElement,
    interestPoolsGrid: document.getElementById('interestPoolsGrid') as HTMLElement,
    syncFeed: document.getElementById('syncFeed') as HTMLElement,
    
    // Chat elements
    messageList: document.getElementById('message-list') as HTMLElement,
    messageListContainer: document.getElementById('message-list-container') as HTMLElement,
    chatForm: document.getElementById('chat-form') as HTMLFormElement,
    promptInput: document.getElementById('prompt-input') as HTMLTextAreaElement,
    sendBtn: document.getElementById('send-btn') as HTMLButtonElement,
    
    // Controls
    fastModeCheckbox: document.getElementById('fast-mode-checkbox') as HTMLInputElement,
    memoryToggle: document.getElementById('memory-toggle-checkbox') as HTMLInputElement,
    prioritizedMemoryCheckbox: document.getElementById('prioritized-memory-checkbox') as HTMLInputElement,
    learningModeCheckbox: document.getElementById('learning-mode-checkbox') as HTMLInputElement,
    learningModeLabel: document.querySelector('label[for="learning-mode-checkbox"]') as HTMLLabelElement,
    summarizeBtn: document.getElementById('summarize-btn') as HTMLButtonElement,
    exportChatBtn: document.getElementById('export-chat-btn') as HTMLButtonElement,
    clearChatBtn: document.getElementById('clear-chat-btn') as HTMLButtonElement,
    settingsBtn: document.getElementById('settings-btn') as HTMLButtonElement,
    generateVideoBtn: document.getElementById('generate-video-btn') as HTMLButtonElement,
    
    // Settings Modal
    settingsModal: document.getElementById('settings-modal') as HTMLElement,
    closeModalBtn: document.getElementById('close-modal-btn') as HTMLButtonElement,
    saveSettingsBtn: document.getElementById('save-settings-btn') as HTMLButtonElement,
    cancelSettingsBtn: document.getElementById('cancel-settings-btn') as HTMLButtonElement,
    temperatureSlider: document.getElementById('temperature-slider') as HTMLInputElement,
    temperatureValue: document.getElementById('temperature-value') as HTMLSpanElement,
    topPSlider: document.getElementById('top-p-slider') as HTMLInputElement,
    topPValue: document.getElementById('top-p-value') as HTMLSpanElement,
    topKSlider: document.getElementById('top-k-slider') as HTMLInputElement,
    topKValue: document.getElementById('top-k-value') as HTMLSpanElement,
    contextMessagesInput: document.getElementById('context-messages-input') as HTMLInputElement,
    prioritizedContextInput: document.getElementById('prioritized-context-input') as HTMLInputElement,
    
    // Video Modal
    videoModal: document.getElementById('video-modal') as HTMLElement,
    closeVideoModalBtn: document.getElementById('close-video-modal-btn') as HTMLButtonElement,
    cancelVideoBtn: document.getElementById('cancel-video-btn') as HTMLButtonElement,
    generateVideoSubmitBtn: document.getElementById('generate-video-submit-btn') as HTMLButtonElement,
    videoPromptInput: document.getElementById('video-prompt-input') as HTMLTextAreaElement,
    videoImageInput: document.getElementById('video-image-input') as HTMLInputElement,
    videoImagePreviewContainer: document.getElementById('video-image-preview-container') as HTMLElement,
    videoImagePreview: document.getElementById('video-image-preview') as HTMLImageElement,
    removeVideoImageBtn: document.getElementById('remove-video-image-btn') as HTMLButtonElement,
    videoGenerationForm: document.getElementById('video-generation-form') as HTMLElement,
    videoGenerationStatus: document.getElementById('video-generation-status') as HTMLElement,
    videoStatusMessage: document.getElementById('video-status-message') as HTMLElement,

    // Persona Modal
    managePersonasBtn: document.getElementById('manage-personas-btn') as HTMLButtonElement,
    personaModal: document.getElementById('persona-modal') as HTMLElement,
    closePersonaModalBtn: document.getElementById('close-persona-modal-btn') as HTMLButtonElement,
    customPersonasList: document.getElementById('custom-personas-list') as HTMLElement,
    createPersonaBtn: document.getElementById('create-persona-btn') as HTMLButtonElement,
    personaListView: document.getElementById('persona-list-view') as HTMLElement,
    personaForm: document.getElementById('persona-form') as HTMLFormElement,
    personaIdInput: document.getElementById('persona-id-input') as HTMLInputElement,
    personaNameInput: document.getElementById('persona-name-input') as HTMLInputElement,
    personaAvatarInput: document.getElementById('persona-avatar-input') as HTMLInputElement,
    personaDescInput: document.getElementById('persona-desc-input') as HTMLTextAreaElement,
    personaInstructionInput: document.getElementById('persona-instruction-input') as HTMLTextAreaElement,
    cancelPersonaEditBtn: document.getElementById('cancel-persona-edit-btn') as HTMLButtonElement,
    savePersonaBtn: document.getElementById('save-persona-btn') as HTMLButtonElement,
    personaModalTitle: document.getElementById('persona-modal-title') as HTMLElement,
};

// --- State ---
let currentChat: ChatSession;
let appSettings: AppSettings;
let ai: GoogleGenAI | null = null;
let isGenerating = false;
let videoSourceImage: { mimeType: string; data: string; } | null = null;
let lastPortfolioValue = 0; // To calculate P&L
const portfolioHoldings = {
    'bitcoin': 0.5,
    'ethereum': 10,
    'solana': 100,
    'chainlink': 500,
};
let chart: any;
let blockCounter = 876543;
let customPersonas: Persona[] = [];

// --- Initialization ---
function initialize() {
    const API_KEY = process.env.API_KEY;
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
        showToast("API_KEY environment variable not set.", 'error');
    }

    loadCustomPersonas(); // Load custom personas to validate the ID against
    appSettings = loadAppSettings();

    // Validate the loaded persona ID to ensure it still exists
    const allPersonas = [...personas, ...customPersonas];
    if (!allPersonas.some(p => p.id === appSettings.activePersonaId)) {
        console.warn(`Saved persona ID "${appSettings.activePersonaId}" not found. Reverting to default.`);
        appSettings.activePersonaId = 1; // Revert to default
        saveAppSettings(); // Save the corrected setting
    }

    loadChatSession();
    
    // Event Listeners
    window.addEventListener('keydown', handleGlobalKeyDown);
    elements.chatForm.addEventListener('submit', handleFormSubmit);
    elements.clearChatBtn.addEventListener('click', clearCurrentChat);
    elements.summarizeBtn.addEventListener('click', handleSummarizeClick);
    elements.exportChatBtn.addEventListener('click', handleExportChat);
    elements.settingsBtn.addEventListener('click', openSettingsModal);
    elements.generateVideoBtn.addEventListener('click', openVideoModal);
    elements.managePersonasBtn.addEventListener('click', openPersonaModal);
    
    elements.promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            elements.chatForm.requestSubmit();
        }
    });
    elements.promptInput.addEventListener('input', () => {
        elements.promptInput.style.height = 'auto';
        elements.promptInput.style.height = `${elements.promptInput.scrollHeight}px`;
    });

    [elements.fastModeCheckbox, elements.memoryToggle, elements.prioritizedMemoryCheckbox, elements.learningModeCheckbox].forEach(el => {
        el.addEventListener('change', () => {
            currentChat.fastMode = elements.fastModeCheckbox.checked;
            currentChat.useMemory = elements.memoryToggle.checked;
            currentChat.prioritizedMemory = elements.prioritizedMemoryCheckbox.checked;
            currentChat.learningMode = elements.learningModeCheckbox.checked;
            saveChatSession();
            updateToggleStates();
        });
    });

    // Modals
    [elements.closeModalBtn, elements.cancelSettingsBtn, elements.settingsModal].forEach(el => el.addEventListener('click', (e) => { if(e.target === el) closeSettingsModal()}));
    elements.saveSettingsBtn.addEventListener('click', saveSettings);
    elements.temperatureSlider.addEventListener('input', () => elements.temperatureValue.textContent = elements.temperatureSlider.value);
    elements.topPSlider.addEventListener('input', () => elements.topPValue.textContent = elements.topPSlider.value);
    elements.topKSlider.addEventListener('input', () => elements.topKValue.textContent = elements.topKSlider.value);
    [elements.closeVideoModalBtn, elements.cancelVideoBtn, elements.videoModal].forEach(el => el.addEventListener('click', (e) => {if(e.target === el) closeVideoModal()}));
    elements.generateVideoSubmitBtn.addEventListener('click', generateVideo);
    elements.videoImageInput.addEventListener('change', handleImagePreview);
    elements.removeVideoImageBtn.addEventListener('click', removeImagePreview);

    // Persona Modal Listeners
    [elements.closePersonaModalBtn, elements.personaModal].forEach(el => el.addEventListener('click', (e) => { if(e.target === el) closePersonaModal()}));
    elements.createPersonaBtn.addEventListener('click', () => showPersonaForm());
    elements.cancelPersonaEditBtn.addEventListener('click', (e) => { e.preventDefault(); hidePersonaForm(); });
    elements.savePersonaBtn.addEventListener('click', handleSavePersona);


    // DEX UI Initialization
    renderPersonaSelector();
    elements.personaSelector.addEventListener('click', e => {
        const button = (e.target as HTMLElement).closest('.persona-btn');
        if (button) {
            const newPersonaIdStr = (button as HTMLElement).dataset.id as string;
            const newPersonaId = isNaN(parseInt(newPersonaIdStr)) ? newPersonaIdStr : parseInt(newPersonaIdStr);
            switchActivePersona(newPersonaId);
        }
    });

    createChart();
    renderPersona();
    renderInterestPools();
    renderChatMessages();
    updateToggleStates();
    
    // DEX Intervals
    updatePortfolio(); // Initial call to fetch data
    setInterval(updatePortfolio, 15000); // Update every 15 seconds to be API-friendly
    setInterval(updateBlockchainSync, 4000);
    setInterval(triggerStakingEvent, 10000);
}

// --- Chat Management ---
function loadChatSession() {
    const savedChat = localStorage.getItem('chatSession');
    if (savedChat) {
        currentChat = JSON.parse(savedChat);
    } else {
        const allPersonas = [...personas, ...customPersonas];
        const defaultPersona = allPersonas.find(p => p.id === appSettings.activePersonaId) || personas[0];
        currentChat = {
            id: `session_${Date.now()}`,
            title: "AI-BITBOY-DEX Session",
            messages: [],
            summary: null,
            useMemory: true,
            prioritizedMemory: true,
            fastMode: false,
            learningMode: true,
            insights: [],
            lastLearnedMessageCount: 0,
            systemInstruction: defaultPersona.systemInstruction,
        };
    }
    // Set UI toggles from loaded chat state
    elements.fastModeCheckbox.checked = currentChat.fastMode;
    elements.memoryToggle.checked = currentChat.useMemory;
    elements.prioritizedMemoryCheckbox.checked = currentChat.prioritizedMemory;
    elements.learningModeCheckbox.checked = currentChat.learningMode;
}

function saveChatSession() {
    localStorage.setItem('chatSession', JSON.stringify(currentChat));
}

function clearCurrentChat() {
    if (confirm("Are you sure you want to clear this chat session? This cannot be undone.")) {
        currentChat.messages = [];
        currentChat.summary = null;
        currentChat.insights = [];
        currentChat.lastLearnedMessageCount = 0;
        renderChatMessages();
        saveChatSession();
    }
}

// --- Rendering ---
function renderChatMessages() {
    elements.messageList.innerHTML = '';
    currentChat.messages.forEach(message => renderMessage(message));
    elements.messageListContainer.scrollTop = elements.messageListContainer.scrollHeight;
}

async function renderMessage(message: Message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}`;
    
    const parsedContent = await marked.parse(message.parts[0].text || "...");
    const videoHtml = message.videoUrl 
        ? `<video src="${message.videoUrl}" controls autoplay muted loop></video>` 
        : '';

    const iconMap = {
        user: 'fa-user-astronaut',
        model: 'fa-robot',
        system: 'fa-info-circle',
    };
    
    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${iconMap[message.role]}"></i></div>
        <div class="message-content">
            <div class="message-body">
                ${parsedContent}
                ${videoHtml}
            </div>
        </div>`;

    elements.messageList.appendChild(messageDiv);
    elements.messageListContainer.scrollTop = elements.messageListContainer.scrollHeight;
}

function addSystemMessage(text: string) {
    const sysMessage: Message = { role: 'system', parts: [{text}] };
    currentChat.messages.push(sysMessage);
    renderMessage(sysMessage);
}

// --- Form & Input Handling ---
async function handleFormSubmit(e: Event) {
    e.preventDefault();
    if (isGenerating) return;
    const prompt = elements.promptInput.value.trim();
    if (!prompt) return;

    isGenerating = true;
    updateToggleStates();
    elements.promptInput.value = '';
    elements.promptInput.style.height = 'auto';

    const userMessage: Message = { role: 'user', parts: [{ text: prompt }] };
    currentChat.messages.push(userMessage);
    renderMessage(userMessage);

    // Create a placeholder for the streaming response
    const modelMessageDiv = document.createElement('div');
    modelMessageDiv.className = 'message model';
    modelMessageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <div class="message-body">▍</div>
        </div>`;
    elements.messageList.appendChild(modelMessageDiv);
    const messageBody = modelMessageDiv.querySelector('.message-body') as HTMLElement;
    elements.messageListContainer.scrollTop = elements.messageListContainer.scrollHeight;

    let fullResponse = "";

    try {
        if (!ai) throw new Error("AI not initialized.");
        let context = await buildContext(prompt);
        
        const responseStream = await ai.models.generateContentStream({
            model: AI_MODEL,
            contents: [...context, userMessage],
            config: {
                systemInstruction: currentChat.systemInstruction,
                temperature: appSettings.temperature,
                topP: appSettings.topP,
                topK: appSettings.topK,
            }
        });

        for await (const chunk of responseStream) {
            fullResponse += chunk.text;
            // Parse the accumulated markdown and add a cursor for visual feedback
            messageBody.innerHTML = await marked.parse(fullResponse + '▍');
            // Keep the view scrolled to the bottom
            elements.messageListContainer.scrollTop = elements.messageListContainer.scrollHeight;
        }
        
        // Re-parse without the cursor for a clean final state
        messageBody.innerHTML = await marked.parse(fullResponse);

        currentChat.messages.push({ role: 'model', parts: [{ text: fullResponse }] });
        triggerLearning();

    } catch (error) {
        console.error("Error generating content:", error);
        if (messageBody) {
             // Display error in the message placeholder
             messageBody.innerHTML = `<p style="color: var(--color-error);">Error: Could not generate response.</p>`;
        }
        // Also add error to history if we received no response
        if (!fullResponse) {
            currentChat.messages.push({ role: 'model', parts: [{ text: "Error: Could not generate response." }] });
        }
    } finally {
        isGenerating = false;
        updateToggleStates();
        saveChatSession();
    }
}

// --- AI & Logic ---
async function buildContext(prompt: string): Promise<Message[]> {
    if (currentChat.fastMode || !currentChat.useMemory) return [];
    
    const history = currentChat.messages.slice(0, -1);
    let context: Message[] = [];
    if (currentChat.insights.length > 0) {
        const insightsText = "--- Learned Insights (for context) ---\n" + currentChat.insights.join("\n");
        context.push({ role: 'user', parts: [{ text: insightsText }] });
        context.push({ role: 'model', parts: [{ text: "Acknowledged. I will use these insights." }] });
    }

    if (currentChat.prioritizedMemory) {
        if (history.length <= appSettings.prioritizedContextCount) {
            return [...context, ...history.slice(-appSettings.contextMessageCount)];
        }
        try {
            if (!ai) throw new Error("AI not initialized for context building.");
            const formattedHistory = history
                .map((msg, index) => `[${index}] ${msg.role}: ${msg.parts[0].text.substring(0, 200)}...`)
                .join('\n');
            const metaPrompt = `Given a user's prompt and a conversation history, identify the ${appSettings.prioritizedContextCount} most relevant messages from history to help formulate the best response.
Latest User Prompt: "${prompt}"
Conversation History:
---
${formattedHistory}
---
Respond with a JSON array of message indices only. Example: [3, 8, 10]`;

            const response = await ai.models.generateContent({
                model: AI_MODEL, contents: metaPrompt,
                config: { responseMimeType: "application/json", responseSchema: { type: Type.ARRAY, items: { type: Type.INTEGER } }, temperature: 0.1 }
            });
            const relevantIndices = JSON.parse(response.text.trim()) as number[];
            if (!Array.isArray(relevantIndices)) throw new Error("Invalid index array.");
            const prioritizedMessages = relevantIndices
                .filter(index => index >= 0 && index < history.length).sort((a, b) => a - b).map(index => history[index]);
            return [...context, ...prioritizedMessages];
        } catch (error) {
            console.error("Semantic search failed. Falling back.", error);
            return [...context, ...history.slice(-appSettings.contextMessageCount)];
        }
    } else {
        return [...context, ...history.slice(-appSettings.contextMessageCount)];
    }
}

// --- Other Features (Summarize, Export, Learning etc.) ---
// Fix: Removed duplicate empty function definitions. The full implementations are at the end of the file.

// --- DEX UI Functions ---
function createChart() {
    const ctx = elements.chartCanvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, elements.chartCanvas.offsetHeight);
    gradient.addColorStop(0, 'rgba(0, 255, 204, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 255, 204, 0)');
    chart = new Chart(ctx, { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(null), borderColor: 'var(--color-accent)', backgroundColor: gradient, borderWidth: 2, pointRadius: 0, fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } } });
}

function renderPersona() {
    const allPersonas = [...personas, ...customPersonas];
    let activePersona = allPersonas.find(p => p.id === appSettings.activePersonaId);

    if (!activePersona) {
        console.warn(`Active persona with id ${appSettings.activePersonaId} not found. Reverting to default.`);
        appSettings.activePersonaId = 1;
        saveAppSettings(); // Persist the correction
        activePersona = personas[0];
    }
    
    elements.personaAvatar.textContent = activePersona.avatar;
    elements.personaName.textContent = activePersona.name;
    elements.personaDesc.textContent = activePersona.desc;
    
    document.querySelectorAll('.persona-btn').forEach(btn => {
        const btnId = (btn as HTMLElement).dataset.id!;
        const isActive = (typeof appSettings.activePersonaId === 'string') ? btnId === appSettings.activePersonaId : parseInt(btnId) === appSettings.activePersonaId;
        btn.classList.toggle('active', isActive);
    });
}

function renderInterestPools() {
    elements.interestPoolsGrid.innerHTML = interestPools.map(pool => `
        <div class="interest-pool ${pool.id === activePoolId ? 'active' : ''}" data-id="${pool.id}">
            <h3 class="pool-title">${pool.title}</h3>
            <p class="pool-desc">${pool.desc}</p>
        </div>
    `).join('');
}

async function fetchCryptoPrices(coinIds: string[]): Promise<Record<string, { usd: number }> | null> {
    const ids = coinIds.join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`CoinGecko API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch crypto prices:", error);
        return null;
    }
}

async function updatePortfolio() {
    const coinIds = Object.keys(portfolioHoldings);
    const prices = await fetchCryptoPrices(coinIds);

    if (!prices) {
        console.warn("Could not update portfolio value due to API error.");
        return;
    }
    
    let newPortfolioValue = 0;
    for (const id of coinIds) {
        if (prices[id]) {
            newPortfolioValue += portfolioHoldings[id as keyof typeof portfolioHoldings] * prices[id].usd;
        }
    }

    if (newPortfolioValue === 0) return;

    // On the very first successful fetch, populate the chart with some historical-looking data
    if (lastPortfolioValue === 0 && chart.data.datasets[0].data[0] === null) {
        const initialData = Array.from({ length: 30 }, () => newPortfolioValue * (1 + (Math.random() - 0.5) * 0.02));
        chart.data.datasets[0].data = initialData;
    }
    
    const changeValue = newPortfolioValue - (lastPortfolioValue || newPortfolioValue);
    const changePercent = (lastPortfolioValue === 0) ? 0 : (changeValue / lastPortfolioValue) * 100;

    elements.portfolioValue.textContent = `$${newPortfolioValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    elements.pnlValue.className = `pnl ${changeValue >= 0 ? 'positive' : 'negative'}`;
    elements.pnlValue.textContent = `${changeValue >= 0 ? '+' : ''}${changeValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${changeValue >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
    
    chart.data.datasets[0].data.push(newPortfolioValue);
    chart.data.datasets[0].data.shift();
    chart.update('quiet');

    lastPortfolioValue = newPortfolioValue;
}

function updateBlockchainSync() {
    blockCounter++;
    const hash = '0x' + [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const blockHTML = `<div class="sync-block"><div class="block-icon"><i class="fas fa-cube status-confirmed"></i></div><div class="block-details"><div class="block-id">Block #${blockCounter}</div><div class="block-hash">${hash}</div></div><div class="block-status status-synchronized">Synchronized</div></div>`;
    elements.syncFeed.insertAdjacentHTML('afterbegin', blockHTML);
    if (elements.syncFeed.childElementCount > 20) elements.syncFeed.removeChild(elements.syncFeed.lastChild);
}

function triggerStakingEvent() {
    document.querySelectorAll('.staking-surge').forEach(el => el.remove());
    let targetPoolId;
    do { targetPoolId = Math.floor(Math.random() * interestPools.length) + 1; } while (targetPoolId === activePoolId);
    
    const targetPoolEl = document.querySelector(`.interest-pool[data-id='${targetPoolId}']`);
    if (targetPoolEl) {
        const badge = document.createElement('div');
        badge.className = 'staking-surge';
        badge.textContent = 'STAKING SURGE';
        targetPoolEl.appendChild(badge);
        setTimeout(() => badge.remove(), 4900);
        
        activePoolId = targetPoolId;
        renderInterestPools();
        addSystemMessage(`High-yield staking detected in Pool #${targetPoolId}. Re-bouncing task queue.`);
    }
}

// --- Settings Modal Logic ---
function openSettingsModal() {
    elements.temperatureSlider.value = String(appSettings.temperature);
    elements.temperatureValue.textContent = String(appSettings.temperature);
    elements.topPSlider.value = String(appSettings.topP);
    elements.topPValue.textContent = String(appSettings.topP);
    elements.topKSlider.value = String(appSettings.topK);
    elements.topKValue.textContent = String(appSettings.topK);
    elements.contextMessagesInput.value = String(appSettings.contextMessageCount);
    elements.prioritizedContextInput.value = String(appSettings.prioritizedContextCount);
    elements.settingsModal.style.display = 'flex';
}

function closeSettingsModal() { elements.settingsModal.style.display = 'none'; }

function saveSettings() {
    appSettings.temperature = parseFloat(elements.temperatureSlider.value);
    appSettings.topP = parseFloat(elements.topPSlider.value);
    appSettings.topK = parseInt(elements.topKSlider.value, 10);
    appSettings.contextMessageCount = parseInt(elements.contextMessagesInput.value, 10);
    appSettings.prioritizedContextCount = parseInt(elements.prioritizedContextInput.value, 10);
    saveAppSettings();
    closeSettingsModal();
}

// --- Persona Management ---
function loadCustomPersonas() {
    const saved = localStorage.getItem('customPersonas_dex');
    if (saved) {
        customPersonas = JSON.parse(saved);
    }
}

function saveCustomPersonas() {
    localStorage.setItem('customPersonas_dex', JSON.stringify(customPersonas));
}

function switchActivePersona(newPersonaId: number | string, reasonMessage?: string) {
    if (newPersonaId === appSettings.activePersonaId) return;

    const allPersonas = [...personas, ...customPersonas];
    const newPersona = allPersonas.find(p => p.id === newPersonaId);

    if (newPersona) {
        appSettings.activePersonaId = newPersonaId;
        saveAppSettings(); // Persist selection
        currentChat.systemInstruction = newPersona.systemInstruction;
        renderPersona();
        
        if (reasonMessage) {
            addSystemMessage(reasonMessage);
        } else {
            addSystemMessage(`Persona protocol switched to ${newPersona.name}.`);
        }
        
        saveChatSession();
    } else {
        console.error(`Attempted to switch to non-existent persona ID: ${newPersonaId}`);
        const defaultPersona = personas[0];
        if (appSettings.activePersonaId !== defaultPersona.id) {
             switchActivePersona(defaultPersona.id, `Error: Persona not found. Reverting to ${defaultPersona.name}.`);
        }
    }
}

function renderPersonaSelector() {
    const allPersonas = [...personas, ...customPersonas];
    elements.personaSelector.innerHTML = allPersonas.map(p => 
        `<button class="persona-btn" data-id="${p.id}">${p.name}</button>`
    ).join('');
    renderPersona(); // Re-apply active class and update display
}

function openPersonaModal() {
    elements.personaModalTitle.innerHTML = `<i class="fas fa-users-cog"></i> Manage Personas`;
    renderCustomPersonasListInModal();
    hidePersonaForm();
    elements.personaModal.style.display = 'flex';
}

function closePersonaModal() {
    elements.personaModal.style.display = 'none';
}

function renderCustomPersonasListInModal() {
    if (customPersonas.length === 0) {
        elements.customPersonasList.innerHTML = `<p style="text-align: center; color: var(--color-text-secondary);">No custom personas created yet.</p>`;
    } else {
        elements.customPersonasList.innerHTML = customPersonas.map(p => `
            <div class="custom-persona-item">
                <div class="custom-persona-item-info">
                    <span class="custom-persona-item-avatar">${p.avatar}</span>
                    <span class="custom-persona-item-name">${p.name}</span>
                </div>
                <div class="custom-persona-item-actions">
                    <button class="footer-btn edit-persona-btn" data-id="${p.id}" aria-label="Edit ${p.name}"><i class="fas fa-pen"></i></button>
                    <button class="footer-btn danger-btn delete-persona-btn" data-id="${p.id}" aria-label="Delete ${p.name}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    elements.customPersonasList.querySelectorAll('.edit-persona-btn').forEach(btn => 
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id!;
            const persona = customPersonas.find(p => p.id === id);
            if (persona) showPersonaForm(persona);
        })
    );
    elements.customPersonasList.querySelectorAll('.delete-persona-btn').forEach(btn =>
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id!;
            handleDeletePersona(id);
        })
    );
}

function showPersonaForm(persona?: Persona) {
    if (persona) { // Editing
        elements.personaModalTitle.innerHTML = `<i class="fas fa-edit"></i> Edit Persona`;
        elements.savePersonaBtn.textContent = 'Update Persona';
        elements.personaIdInput.value = persona.id.toString();
        elements.personaNameInput.value = persona.name;
        elements.personaAvatarInput.value = persona.avatar;
        elements.personaDescInput.value = persona.desc;
        elements.personaInstructionInput.value = persona.systemInstruction;
    } else { // Creating
        elements.personaModalTitle.innerHTML = `<i class="fas fa-plus-circle"></i> Create New Persona`;
        elements.savePersonaBtn.textContent = 'Create Persona';
        elements.personaForm.reset();
        elements.personaIdInput.value = '';
    }

    elements.personaListView.style.display = 'none';
    elements.personaForm.style.display = 'block';
    elements.savePersonaBtn.style.display = 'block';
    elements.cancelPersonaEditBtn.style.display = 'block';
}

function hidePersonaForm() {
    elements.personaForm.reset();
    elements.personaForm.style.display = 'none';
    elements.savePersonaBtn.style.display = 'none';
    elements.cancelPersonaEditBtn.style.display = 'none';
    elements.personaListView.style.display = 'block';
    elements.personaModalTitle.innerHTML = `<i class="fas fa-users-cog"></i> Manage Personas`;
}

function handleSavePersona() {
    const id = elements.personaIdInput.value;
    const isEditing = !!id;

    const personaData: Persona = {
        id: id || `custom_${Date.now()}`,
        name: elements.personaNameInput.value.trim(),
        avatar: elements.personaAvatarInput.value.trim(),
        desc: elements.personaDescInput.value.trim(),
        systemInstruction: elements.personaInstructionInput.value.trim()
    };

    if (!personaData.name || !personaData.avatar || !personaData.desc || !personaData.systemInstruction) {
        showToast("All persona fields are required.", "error");
        return;
    }
    
    if (isEditing) { // Editing existing
        const index = customPersonas.findIndex(p => p.id === id);
        if (index > -1) {
            customPersonas[index] = personaData;
            if (appSettings.activePersonaId === id) {
                currentChat.systemInstruction = personaData.systemInstruction;
                addSystemMessage(`Active persona '${personaData.name}' has been updated.`);
                saveChatSession();
            }
        }
    } else { // Creating new
        customPersonas.push(personaData);
    }
    
    saveCustomPersonas();
    renderPersonaSelector();
    renderCustomPersonasListInModal();
    
    if (!isEditing) {
        switchActivePersona(personaData.id);
    }

    hidePersonaForm();
    showToast(`Persona ${isEditing ? 'updated' : 'created'} successfully!`);
}

function handleDeletePersona(id: string) {
    if (confirm("Are you sure you want to delete this persona?")) {
        customPersonas = customPersonas.filter(p => p.id !== id);
        saveCustomPersonas();
        
        if (appSettings.activePersonaId === id) {
            const defaultPersona = personas[0];
            switchActivePersona(defaultPersona.id, `Active persona was deleted. Reverting to ${defaultPersona.name}.`);
        }

        renderPersonaSelector();
        renderCustomPersonasListInModal();
        showToast("Persona deleted.");
    }
}


// --- Video Modal Logic ---
function openVideoModal() { elements.videoModal.style.display = 'flex'; }

// --- Local Storage & Utilities ---
const APP_SETTINGS_KEY = 'dex_app_settings';

function saveAppSettings() {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(appSettings));
}

function loadAppSettings(): AppSettings {
    const defaultSettings: AppSettings = {
        temperature: 0.5,
        topP: 0.95,
        topK: 40,
        contextMessageCount: 6,
        prioritizedContextCount: 5,
        activePersonaId: 1 // Default persona ID
    };
    const stored = localStorage.getItem(APP_SETTINGS_KEY);
    // Merge stored settings with defaults to handle any new properties gracefully
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
}

// --- App Start ---
document.addEventListener('DOMContentLoaded', initialize);

function handleGlobalKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        if (elements.settingsModal.style.display === 'flex') {
            closeSettingsModal();
        } else if (elements.videoModal.style.display === 'flex') {
            closeVideoModal();
        } else if (elements.personaModal.style.display === 'flex') {
            if (elements.personaForm.style.display === 'block') {
                hidePersonaForm();
            } else {
                closePersonaModal();
            }
        }
    }
}

async function handleSummarizeClick() {
    if (!ai || isGenerating) return;

    if (currentChat.messages.length < 2) {
        showToast("Not enough conversation to summarize.", 'info');
        return;
    }

    isGenerating = true;
    updateToggleStates();
    elements.summarizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const transcript = currentChat.messages.map(m => `${m.role}: ${m.parts[0].text}`).join('\n\n');
        const prompt = `Provide a concise, one-sentence summary of the following conversation transcript:\n\n---\n${transcript}\n---`;
        const response = await ai.models.generateContent({ model: AI_MODEL, contents: prompt, config: { temperature: appSettings.temperature } });
        
        currentChat.summary = response.text.trim();
        saveChatSession();
        showToast(`Summary: ${currentChat.summary}`);
    } catch (error) {
        console.error("Failed to generate summary:", error);
        showToast("Sorry, couldn't generate a summary.", 'error');
    } finally {
        isGenerating = false;
        elements.summarizeBtn.innerHTML = '<i class="fas fa-file-alt"></i>';
        updateToggleStates();
    }
}

function handleExportChat() {
    if (currentChat.messages.length === 0) {
        showToast("Chat is empty, nothing to export.", 'info');
        return;
    }
    const transcript = currentChat.messages.map(m => {
        let content = `${m.role.charAt(0).toUpperCase() + m.role.slice(1)}: ${m.parts[0].text}`;
        if (m.videoUrl) content += "\n[Video content was generated]";
        return content;
    }).join('\n\n');
    let fileContent = `Chat Title: ${currentChat.title}\n${currentChat.summary ? `Summary: ${currentChat.summary}\n` : ''}\n========================================\n\n${transcript}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `AIBitBoyDEX_export.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    showToast("Chat exported successfully!");
}

async function triggerLearning() {
    if (!ai) return;
    const shouldLearn = currentChat.learningMode && (currentChat.messages.length - currentChat.lastLearnedMessageCount) > LEARNING_THRESHOLD;
    if (!shouldLearn) return;

    elements.learningModeLabel.classList.add('processing');
    try {
        const transcript = currentChat.messages.slice(-LEARNING_THRESHOLD).map(m => `${m.role}: ${m.parts[0].text}`).join('\n\n');
        const prompt = `Analyze the following transcript and extract 1-3 key insights, facts, or user preferences as a concise list. Each insight on a new line. No headers or bullet points. Transcript:\n${transcript}`;
        const response = await ai.models.generateContent({ model: AI_MODEL, contents: prompt, config: { temperature: appSettings.temperature } });
        const newInsights = response.text.split('\n').map(s => s.trim()).filter(Boolean);
        if (newInsights.length > 0) {
            const uniqueNewInsights = newInsights.filter(insight => !currentChat.insights.includes(insight));
            if (uniqueNewInsights.length > 0) {
                currentChat.insights.push(...uniqueNewInsights);
                currentChat.lastLearnedMessageCount = currentChat.messages.length;
                saveChatSession();
                showToast("New insights learned!");
            }
        }
    } catch (error) {
        console.error("Failed to learn insights:", error);
    } finally {
        elements.learningModeLabel.classList.remove('processing');
    }
}

function closeVideoModal() {
    elements.videoModal.style.display = 'none';
    elements.videoPromptInput.value = '';
    removeImagePreview();
    elements.videoGenerationForm.style.display = 'block';
    elements.videoGenerationStatus.style.display = 'none';
    elements.generateVideoSubmitBtn.disabled = false;
    elements.cancelVideoBtn.disabled = false;
}

function handleImagePreview(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64String = (e.target?.result as string).split(',')[1];
        videoSourceImage = { mimeType: file.type, data: base64String };
        elements.videoImagePreview.src = `data:${file.type};base64,${base64String}`;
        elements.videoImagePreviewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeImagePreview() {
    videoSourceImage = null;
    elements.videoImageInput.value = '';
    elements.videoImagePreview.src = '';
    elements.videoImagePreviewContainer.style.display = 'none';
}

async function generateVideo() {
    if (!ai) return;
    const prompt = elements.videoPromptInput.value.trim();
    if (!prompt) {
        showToast("Please enter a prompt for the video.", "error");
        return;
    }
    isGenerating = true;
    updateToggleStates();
    elements.videoGenerationForm.style.display = 'none';
    elements.videoGenerationStatus.style.display = 'block';
    elements.generateVideoSubmitBtn.disabled = true;
    elements.cancelVideoBtn.disabled = true;
    const statusMessages = ["Warming up video synthesizer...", "Gathering pixels...", "This can take a few minutes...", "Directing digital actors...", "Rendering final cut..."];
    let messageIndex = 0;
    elements.videoStatusMessage.textContent = statusMessages[messageIndex];
    const statusInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % statusMessages.length;
        elements.videoStatusMessage.textContent = statusMessages[messageIndex];
    }, 8000);

    try {
        let operation = await ai.models.generateVideos({ model: VIDEO_MODEL, prompt: prompt, ...(videoSourceImage && { image: { imageBytes: videoSourceImage.data, mimeType: videoSourceImage.mimeType } }), config: { numberOfVideos: 1 } });
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({operation: operation});
        }
        clearInterval(statusInterval);
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) throw new Error("Video generation failed to produce a valid link.");
        elements.videoStatusMessage.textContent = "Downloading generated video...";
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API key not found for video download.");
        const response = await fetch(`${downloadLink}&key=${apiKey}`);
        if (!response.ok) throw new Error(`Failed to download video: ${response.statusText}`);
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        const videoMessage: Message = { role: 'model', parts: [{ text: `Video generated for prompt: "${prompt}"` }], videoUrl: videoUrl };
        currentChat.messages.push(videoMessage);
        renderMessage(videoMessage);
        saveChatSession();
        showToast("Video generation successful!");
        closeVideoModal();
    } catch (error) {
        clearInterval(statusInterval);
        console.error("Video generation failed:", error);
        showToast("Sorry, an error occurred during video generation.", 'error');
        elements.videoGenerationForm.style.display = 'block';
        elements.videoGenerationStatus.style.display = 'none';
        elements.generateVideoSubmitBtn.disabled = false;
        elements.cancelVideoBtn.disabled = false;
    } finally {
        isGenerating = false;
        updateToggleStates();
    }
}

function updateToggleStates() {
    const btns = [elements.sendBtn, elements.summarizeBtn, elements.exportChatBtn, elements.generateVideoBtn, elements.settingsBtn, elements.clearChatBtn];
    btns.forEach(btn => btn.disabled = isGenerating);

    if (isGenerating) {
        elements.sendBtn.innerHTML = '<div class="spinner-small"></div>';
    } else {
        elements.sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
    const fastModeEnabled = elements.fastModeCheckbox.checked;
    const memoryEnabled = elements.memoryToggle.checked && !fastModeEnabled;
    elements.memoryToggle.disabled = fastModeEnabled;
    (elements.memoryToggle.parentElement as HTMLElement).style.opacity = fastModeEnabled ? '0.5' : '1';
    elements.prioritizedMemoryCheckbox.disabled = !memoryEnabled;
    elements.learningModeCheckbox.disabled = !memoryEnabled;
    (elements.prioritizedMemoryCheckbox.parentElement as HTMLElement).style.opacity = !memoryEnabled ? '0.5' : '1';
    (elements.learningModeCheckbox.parentElement as HTMLElement).style.opacity = !memoryEnabled ? '0.5' : '1';
}

function showToast(message: string, type: 'info' | 'error' = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => setTimeout(() => toast.classList.add('show'), 10));
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}