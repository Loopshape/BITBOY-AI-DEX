/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import * as THREE from "three";

// Fix for line 254: Cannot find name 'Chart'. Declare Chart as a global variable.
declare var Chart: any;

// --- VIRTUAL FILE SYSTEM ---
class VFS {
    // Fix for multiple errors (e.g., line 10): Property 'fs' does not exist on type 'VFS'.
    fs: { [key: string]: { type: 'dir' } | { type: 'file', content: string } };

    constructor() {
        this.fs = {};
        this.load();
    }

    load() {
        this.fs = JSON.parse(localStorage.getItem("vfs") || '{"/vfs":{"type":"dir"},"/vfs/documents":{"type":"dir"},"/vfs/logs":{"type":"dir"},"/vfs/incoming":{"type":"dir"},"/vfs/documents/readme.txt":{"type":"file","content":"Welcome to the VFS!"}}');
    }

    save() {
        localStorage.setItem("vfs", JSON.stringify(this.fs));
    }

    ls(path) {
        path = path || '/vfs';
        const parentPath = path.endsWith('/') ? path : path + '/';
        const files = Object.keys(this.fs).filter(p => {
            if (!p.startsWith(parentPath)) return false;
            const relativePath = p.substring(parentPath.length);
            return relativePath && !relativePath.includes('/');
        });
        return files.map(f => f.substring(f.lastIndexOf('/') + 1)).join('\n') || '';
    }

    mkdir(path) {
        if (!path || this.fs[path]) return `mkdir: cannot create directory ‘${path}’: File exists`;
        const parent = path.substring(0, path.lastIndexOf('/')) || '/vfs';
        if (!this.fs[parent] || this.fs[parent].type !== 'dir') return `mkdir: cannot create directory ‘${path}’: No such file or directory`;
        this.fs[path] = { type: 'dir' };
        this.save();
        return '';
    }

    touch(path) {
        if (!path) return 'touch: missing file operand';
        if (this.fs[path]) return '';
        const parent = path.substring(0, path.lastIndexOf('/')) || '/vfs';
        if (!this.fs[parent] || this.fs[parent].type !== 'dir') return `touch: cannot touch ‘${path}’: No such file or directory`;
        this.fs[path] = { type: 'file', content: '' };
        this.save();
        return '';
    }

    cat(path) {
        if (!path || !this.fs[path]) return `cat: ${path}: No such file or directory`;
        // Fix for line 61: Property 'content' does not exist on type '{ type: "dir"; }'.
        // Assigned this.fs[path] to a constant to allow TypeScript to narrow its type.
        const entry = this.fs[path];
        if (entry.type !== 'file') return `cat: ${path}: Is a directory`;
        return entry.content;
    }

    rm(path) {
        if (!path || !this.fs[path]) return `rm: cannot remove ‘${path}’: No such file or directory`;
        if (this.fs[path].type === 'dir') {
            const children = Object.keys(this.fs).filter(p => p.startsWith(path + '/') && p !== path);
            if (children.length > 0) return `rm: cannot remove ‘${path}’: Directory not empty`;
        }
        delete this.fs[path];
        this.save();
        return '';
    }

    glob(pattern) {
        if (!pattern.includes('*')) return this.fs[pattern] ? [pattern] : [];
        const regex = new RegExp(pattern.replace(/\./g, '\\.').replace(/\*/g, '.*'));
        return Object.keys(this.fs).filter(p => regex.test(p));
    }
}

// --- SYSTEM MONITOR ---
const SystemMonitor = {
    services: {
        "Core Engine": { status: "ONLINE", latency: "2ms" },
        "API Gateway": { status: "ONLINE", latency: "15ms" },
        "Model Inference": { status: "ONLINE", latency: "120ms" },
        "VFS I/O": { status: "ONLINE", latency: "1ms" },
    },
    updateStatus(service, status, latency = null) {
        if (this.services[service]) {
            this.services[service].status = status;
            if (latency) this.services[service].latency = latency;
            document.dispatchEvent(new CustomEvent("statuschange"));
        }
    },
    tempActivate(service, duration = 1500) {
        const originalStatus = this.services[service].status;
        this.updateStatus(service, "ACTIVE");
        setTimeout(() => this.updateStatus(service, originalStatus), duration);
    }
};

let pipelineChartInstance = null;

// --- MAIN APP ---
document.addEventListener("DOMContentLoaded", () => {
    const vfs = new VFS();

    function log(level, message) {
        const logContent = document.getElementById("log-content");
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement("div");
        entry.classList.add("log-entry");
        entry.innerHTML = `<span class="timestamp">${timestamp}</span> <span class="level-${level}">${level}</span> <span class="message">${message}</span>`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    }

    function setupTerminal() {
        // Fix for line 161, 167: Cast element to HTMLInputElement to access 'value' property.
        const input = document.getElementById("terminal-command-input") as HTMLInputElement;
        const outputContainer = document.getElementById("terminal-output-container");

        async function typeEffect(text) {
            // Fix for line 131: Add <void> type argument to Promise constructor.
            return new Promise<void>(resolve => {
                const output = document.createElement("div");
                output.className = "terminal-output-text";
                outputContainer.appendChild(output);
                let i = 0;
                const interval = setInterval(() => {
                    if (i < text.length) {
                        output.textContent += text[i];
                        i++;
                        outputContainer.scrollTop = outputContainer.scrollHeight;
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 10);
            });
        }
        
        async function handleCommand(command) {
            const [cmd, ...args] = command.trim().split(/\s+/);
            let response = "";
            switch (cmd) {
                case "help":
                    response = "VFS Commands: ls, mkdir, touch, cat, rm\nAI Commands: ai, batch, status";
                    break;
                case "ls": response = vfs.ls(args[0]); break;
                case "mkdir": response = vfs.mkdir(args[0]); break;
                case "touch": response = vfs.touch(args[0]); break;
                case "cat": response = vfs.cat(args[0]); break;
                case "rm": response = vfs.rm(args[0]); break;
                case "ai":
                    SystemMonitor.tempActivate("Model Inference");
                    response = "AI model inference task initiated.";
                    break;
                default:
                    response = `Error: Unknown command '${cmd}'.`;
            }
            if (response) await typeEffect(response);
        }

        input.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                const command = input.value.trim();
                if (!command) return;
                
                const prompt = document.createElement("div");
                prompt.innerHTML = `<span class="terminal-prompt-symbol">&gt;</span> <span class="terminal-output-command">${command}</span>`;
                outputContainer.appendChild(prompt);
                input.value = "";
                await handleCommand(command);
                outputContainer.scrollTop = outputContainer.scrollHeight;
            }
        });
    }
    
    function setupBatchProcessor() {
        document.querySelector('[data-action="batch"]').addEventListener('click', async () => {
            // Fix for line 176: Cast element to HTMLInputElement to access 'value' property.
            const pattern = (document.getElementById('batch-input') as HTMLInputElement).value;
            const files = vfs.glob(pattern);
            SystemMonitor.updateStatus("Core Engine", "ACTIVE");
            log('INFO', `Starting batch process for pattern: ${pattern}`);
            for (const file of files) {
                log('INFO', `Batch processing: ${file}`);
                // Fix: Add <void> type argument to Promise constructor for type safety.
                await new Promise<void>(res => setTimeout(res, 200));
            }
            log('SUCCESS', `Batch process finished. ${files.length} files processed.`);
            SystemMonitor.updateStatus("Core Engine", "ONLINE");
        });
    }

    function setupModeSwitcher() {
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                // Fix for line 192: Cast element to HTMLElement to access 'dataset' property.
                const mode = (link as HTMLElement).dataset.mode;
                document.querySelector(".nav-link.active").classList.remove("active");
                document.querySelector(".content-panel.active").classList.remove("active");
                link.classList.add("active");
                document.getElementById(`panel-${mode}`).classList.add("active");
                log('INFO', `Switched to ${mode.toUpperCase()} mode.`);
                document.querySelector(".window").classList.toggle("agi-watcher-mode", mode === "agi");
            });
        });
    }
    
    function setupPipelinePanel() {
        // Fix for line 209, 235: Cast element to HTMLButtonElement to access 'disabled' property.
        const runBtn = document.getElementById('run-pipeline-btn') as HTMLButtonElement;
        const display = document.getElementById('pipeline-display');
        const chartContainer = document.getElementById('pipeline-chart-container');
        
        runBtn.addEventListener('click', async () => {
            runBtn.disabled = true;
            runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i>Running...`;
            display.innerHTML = '';
            chartContainer.style.display = 'none';

            log('INFO', 'Pipeline simulation started.');

            const pipelineStages = ['Data Ingestion', 'Validation', 'Preprocessing', 'Feature Engineering', 'Model Inference', 'Post-processing', 'Output Generation'];
            const results = { labels: pipelineStages, successData: [], failData: [] };
            
            SystemMonitor.tempActivate('Core Engine', (pipelineStages.length * 500) + 500);

            for (const stage of pipelineStages) {
                // Fix: Add <void> type argument to Promise constructor for type safety.
                await new Promise<void>(resolve => setTimeout(resolve, 500));
                const total = 1000 + Math.floor(Math.random() * 500);
                const success = Math.floor(total * (0.8 + Math.random() * 0.19));
                const failed = total - success;
                results.successData.push(success);
                results.failData.push(failed);
                
                const logMsg = `Stage '${stage}' complete. Items: ${total}, Success: ${success}, Failed: ${failed}.`;
                log('INFO', logMsg);
                display.innerHTML += `<p class="log-entry">${logMsg}</p>`;
            }
            
            log('SUCCESS', 'Pipeline simulation finished.');
            runBtn.disabled = false;
            runBtn.innerHTML = `<i class="fa-solid fa-play me-2"></i>Run Simulation`;
            
            chartContainer.style.display = 'block';
            renderPipelineChart(results);
        });
    }

    function renderPipelineChart(results) {
        // Fix for line 244: Cast element to HTMLCanvasElement to access 'getContext' method.
        const ctx = (document.getElementById('pipeline-chart') as HTMLCanvasElement).getContext('2d');
        if (pipelineChartInstance) pipelineChartInstance.destroy();

        const textColor = 'rgba(156, 179, 209, 0.8)';
        const gridColor = 'rgba(42, 56, 69, 0.5)';
        const successColor = 'rgba(0, 255, 106, 0.6)';
        const failColor = 'rgba(255, 95, 86, 0.6)';
        const successBorder = 'rgba(0, 255, 106, 1)';
        const failBorder = 'rgba(255, 95, 86, 1)';

        pipelineChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: results.labels,
                datasets: [
                    { label: 'Success', data: results.successData, backgroundColor: successColor, borderColor: successBorder, borderWidth: 1 },
                    { label: 'Failed', data: results.failData, backgroundColor: failColor, borderColor: failBorder, borderWidth: 1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: textColor, font: { family: "'Roboto Mono', monospace" } } },
                    title: { display: true, text: 'Pipeline Stage Results', color: textColor, font: { size: 16, family: "'Roboto Mono', monospace" } }
                },
                scales: {
                    x: { stacked: true, ticks: { color: textColor, font: { family: "'Roboto Mono', monospace" } }, grid: { color: gridColor } },
                    y: { stacked: true, beginAtZero: true, ticks: { color: textColor, font: { family: "'Roboto Mono', monospace" } }, grid: { color: gridColor } }
                }
            }
        });
    }

    function setupSynthesisPanel() {
        const proteinInput = document.getElementById("protein-input") as HTMLInputElement;
        const synthesizeCdsBtn = document.getElementById("synthesize-cds-btn");
        const cdsOutput = document.getElementById("cds-output");
        
        const generateUtrBtn = document.getElementById("generate-utr-btn");
        const utrOutput = document.getElementById("utr-output");
        
        const canvas = document.getElementById('rna-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        let animationFrameId;
    
        const codonMap = {
            'A': ['GCU', 'GCC', 'GCA', 'GCG'], 'R': ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
            'N': ['AAU', 'AAC'], 'D': ['GAU', 'GAC'], 'C': ['UGU', 'UGC'], 'Q': ['CAA', 'CAG'],
            'E': ['GAA', 'GAG'], 'G': ['GGU', 'GGC', 'GGA', 'GGG'], 'H': ['CAU', 'CAC'],
            'I': ['AUU', 'AUC', 'AUA'], 'L': ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'],
            'K': ['AAA', 'AAG'], 'M': ['AUG'], 'F': ['UUU', 'UUC'], 'P': ['CCU', 'CCC', 'CCA', 'CCG'],
            'S': ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'], 'T': ['ACU', 'ACC', 'ACA', 'ACG'],
            'W': ['UGG'], 'Y': ['UAU', 'UAC'], 'V': ['GUU', 'GUC', 'GUA', 'GUG'],
            '_': ['UAA', 'UAG', 'UGA'] // Stop codons
        };
        
        async function typeEffect(element, text) {
            element.textContent = '';
            return new Promise<void>(resolve => {
                let i = 0;
                const interval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text[i];
                        i++;
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 20);
            });
        }
    
        synthesizeCdsBtn.addEventListener('click', async () => {
            const proteinSeq = proteinInput.value.toUpperCase().trim();
            if (!proteinSeq) {
                log('WARN', 'Protein sequence input is empty.');
                await typeEffect(cdsOutput, 'Error: Please enter a protein sequence.');
                return;
            }
    
            log('INFO', `Starting CDS synthesis for protein: ${proteinSeq}`);
            SystemMonitor.tempActivate("Model Inference", 2000);
            
            let cds = '';
            let error = null;
            for (const aminoAcid of proteinSeq) {
                if (codonMap[aminoAcid]) {
                    const codons = codonMap[aminoAcid];
                    cds += codons[Math.floor(Math.random() * codons.length)] + ' ';
                } else {
                    error = `Error: Invalid amino acid code '${aminoAcid}'.`;
                    break;
                }
            }
            
            if (error) {
                log('ERROR', error);
                await typeEffect(cdsOutput, error);
            } else {
                await typeEffect(cdsOutput, cds.trim());
                log('SUCCESS', 'CDS synthesis complete.');
            }
        });
    
        generateUtrBtn.addEventListener('click', async () => {
            log('INFO', 'Generating 5\' UTR sequence.');
            SystemMonitor.tempActivate("Model Inference", 1500);
    
            const bases = ['A', 'U', 'G', 'C'];
            let utr = '';
            const length = 40 + Math.floor(Math.random() * 20);
            for (let i = 0; i < length; i++) {
                utr += bases[Math.floor(Math.random() * bases.length)];
            }
    
            await typeEffect(utrOutput, utr);
            log('SUCCESS', '5\' UTR generation complete.');
        });
    
        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }
    
        let time = 0;
        function drawRnaStrand() {
            resizeCanvas();
            time += 0.02;
            
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
    
            const amplitude = height / 4;
            const frequency = 4 * Math.PI / width;
            const yOffset = height / 2;
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            
            for (let x = 0; x < width; x++) {
                const y = yOffset + amplitude * Math.sin(x * frequency + time);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
    
            ctx.lineWidth = 3;
            const baseColors = {
                'A': '#ff5f56', // red
                'U': '#ffbd2e', // yellow
                'G': '#27c93f', // green
                'C': '#00d9ff'  // blue
            };
            const bases = ['A', 'U', 'G', 'C'];
            
            for (let i = 0; i < 20; i++) {
                const x = (width / 20) * i;
                const y = yOffset + amplitude * Math.sin(x * frequency + time);
                const base = bases[Math.floor(i + time*2) % 4];
                ctx.strokeStyle = baseColors[base];
    
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y - (10 + 5 * Math.sin(x * frequency * 0.5 + time * 2)));
                ctx.stroke();
            }
    
            animationFrameId = requestAnimationFrame(drawRnaStrand);
        }
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!animationFrameId) {
                    drawRnaStrand();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        }, { threshold: 0.1 });
    
        observer.observe(document.getElementById('panel-synthesis'));
    }
    
    document.getElementById("clear-log-btn").addEventListener("click", () => {
        document.getElementById("log-content").innerHTML = "";
        log("WARN", "System log cleared by user.");
    });
    
    // Initializations
    setupTerminal();
    setupBatchProcessor();
    setupModeSwitcher();
    setupPipelinePanel();
    setupSynthesisPanel();
    log('SUCCESS', 'AI Core Nexus GUI initialized.');
});