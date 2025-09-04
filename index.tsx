/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from "@google/genai";
import * as THREE from "three";

// Fix for line 254: Cannot find name 'Chart'. Declare Chart as a global variable.
declare var Chart: any;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
        const input = document.getElementById("terminal-command-input") as HTMLInputElement;
        const outputContainer = document.getElementById("terminal-output-container");

        async function typeEffect(text, elementClass = "terminal-output-text") {
            return new Promise<void>(resolve => {
                const output = document.createElement("div");
                output.className = elementClass;
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
                    response = "VFS Commands: ls, mkdir, touch, cat, rm\nAI Commands: ai, status";
                    break;
                case "ls": response = vfs.ls(args[0]); break;
                case "mkdir": response = vfs.mkdir(args[0]); break;
                case "touch": response = vfs.touch(args[0]); break;
                case "cat": response = vfs.cat(args[0]); break;
                case "rm": response = vfs.rm(args[0]); break;
                case "status":
                    response = "Current System Status:\n";
                    for (const service in SystemMonitor.services) {
                        const s = SystemMonitor.services[service];
                        response += `- ${service}: ${s.status} (${s.latency})\n`;
                    }
                    break;
                case "ai":
                    if (args.length === 0) {
                        response = "Usage: ai <prompt>";
                        break;
                    }
                    SystemMonitor.tempActivate("Model Inference", 3000);
                    try {
                        const prompt = args.join(' ');
                        log('INFO', `Sending prompt to AI: "${prompt}"`);
                        const result = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
                        response = result.text;
                        log('SUCCESS', 'AI response received.');
                    } catch (e) {
                        log('ERROR', `AI inference failed: ${e.message}`);
                        response = `Error: AI inference failed. See system log for details.`;
                    }
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
                
                const promptEl = document.createElement("div");
                promptEl.innerHTML = `<span class="terminal-prompt-symbol">&gt;</span> <span class="terminal-output-command">${command}</span>`;
                outputContainer.appendChild(promptEl);
                input.value = "";
                await handleCommand(command);
                outputContainer.scrollTop = outputContainer.scrollHeight;
            }
        });
    }

    function setupFileProcessor() {
        const processBtn = document.querySelector('[data-action="file"]') as HTMLButtonElement;
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        const outputEl = document.getElementById('file-output');

        processBtn.addEventListener('click', async () => {
            const path = fileInput.value.trim();
            if (!path) {
                log('WARN', 'File processor: No file path provided.');
                outputEl.textContent = 'Error: Please provide a file path.';
                return;
            }

            const fileContent = vfs.cat(path);
            if (fileContent.startsWith('cat:')) { // Error from vfs.cat
                log('ERROR', `File processor: ${fileContent}`);
                outputEl.textContent = `Error: ${fileContent}`;
                return;
            }

            log('INFO', `Processing file: ${path}`);
            SystemMonitor.tempActivate("Model Inference", 3000);
            processBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i>Processing...`;
            processBtn.disabled = true;
            outputEl.textContent = 'AI is analyzing the file...';

            try {
                const prompt = `Analyze the following file content and provide a concise summary:\n\n---\n${fileContent}\n---`;
                const result = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
                outputEl.textContent = result.text;
                log('SUCCESS', `File processed successfully: ${path}`);
            } catch (e) {
                log('ERROR', `File processing failed: ${e.message}`);
                outputEl.textContent = `Error: AI analysis failed. Check logs.`;
            } finally {
                processBtn.innerHTML = `<i class="fa-solid fa-cogs me-2"></i>Process`;
                processBtn.disabled = false;
            }
        });
    }
    
    function setupBatchProcessor() {
        const processBtn = document.querySelector('[data-action="batch"]') as HTMLButtonElement;
        processBtn.addEventListener('click', async () => {
            const pattern = (document.getElementById('batch-input') as HTMLInputElement).value;
            if (!pattern) {
                log('WARN', 'Batch processor: No pattern provided.');
                return;
            }
            const files = vfs.glob(pattern);

            processBtn.disabled = true;
            processBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i>Processing...`;
            SystemMonitor.updateStatus("Core Engine", "ACTIVE");
            log('INFO', `Starting batch process for pattern: ${pattern}`);
            
            const summaryPromises = files.map(file => {
                const content = vfs.cat(file);
                if (content.startsWith('cat:')) return Promise.resolve({ file, summary: 'Error reading file.' });
                
                return ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Summarize the following text in one sentence:\n\n${content.substring(0, 500)}`
                }).then(result => ({ file, summary: result.text.replace(/\n/g, ' ') }))
                  .catch(e => ({ file, summary: `AI analysis failed: ${e.message}`}));
            });

            const summaries = await Promise.all(summaryPromises);
            
            const logFileName = `/vfs/logs/batch_${Date.now()}.txt`;
            let reportContent = `Batch Process Report for pattern: "${pattern}"\n`;
            reportContent += `Processed ${summaries.length} files.\n\n---\n\n`;
            summaries.forEach(s => {
                reportContent += `File: ${s.file}\nSummary: ${s.summary}\n\n---\n\n`;
            });

            vfs.fs[logFileName] = { type: 'file', content: reportContent };
            vfs.save();

            log('SUCCESS', `Batch process finished. Report saved to ${logFileName}`);
            SystemMonitor.updateStatus("Core Engine", "ONLINE");
            processBtn.disabled = false;
            processBtn.innerHTML = `<i class="fa-solid fa-cogs me-2"></i>Process Batch`;
        });
    }

    function setupStatusPanel() {
        const grid = document.getElementById('status-grid');
        const render = () => {
            grid.innerHTML = '';
            for (const name in SystemMonitor.services) {
                const service = SystemMonitor.services[name];
                const card = document.createElement('div');
                card.className = `status-card status-${service.status}`;
                card.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center status-card-header">
                        <span class="name">${name}</span>
                        <span class="status-tag">${service.status}</span>
                    </div>
                    <div class="status-card-body">
                        Latency: <strong>${service.latency}</strong>
                    </div>
                `;
                grid.appendChild(card);
            }
        };
        document.addEventListener('statuschange', render);
        render();
    }

    function setupAgiWatcher() {
        const folderInput = document.getElementById('agi-folder') as HTMLInputElement;
        const watchBtn = document.getElementById('agi-watcher-btn') as HTMLButtonElement;
        const statusEl = document.getElementById('agi-status');
        let watcherInterval = null;
        let processedFiles = new Set();

        const logWatcher = (message) => {
            const entry = document.createElement('p');
            entry.className = 'log-entry mb-1';
            entry.innerHTML = `<span class="timestamp">${new Date().toLocaleTimeString()}</span> ${message}`;
            statusEl.prepend(entry);
        };

        watchBtn.addEventListener('click', () => {
            if (watcherInterval) { // Stop watching
                clearInterval(watcherInterval);
                watcherInterval = null;
                watchBtn.innerHTML = `<i class="fa-solid fa-binoculars me-2"></i>Start Watching`;
                watchBtn.classList.remove('btn-danger');
                log('WARN', 'AGI Watcher stopped by user.');
                logWatcher('Watcher stopped.');
            } else { // Start watching
                const folder = folderInput.value.trim();
                if (!vfs.fs[folder] || vfs.fs[folder].type !== 'dir') {
                    log('ERROR', `AGI Watcher: Directory not found: ${folder}`);
                    logWatcher(`Error: Directory '${folder}' not found.`);
                    return;
                }
                watchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i>Stop Watching`;
                watchBtn.classList.add('btn-danger');
                log('INFO', `AGI Watcher started on directory: ${folder}`);
                logWatcher(`Watching directory: <strong>${folder}</strong>`);
                processedFiles.clear();

                watcherInterval = setInterval(async () => {
                    const files = vfs.ls(folder).split('\n').filter(f => f);
                    for (const fileName of files) {
                        const filePath = `${folder.replace(/\/$/, '')}/${fileName}`;
                        if (!processedFiles.has(filePath)) {
                            processedFiles.add(filePath);
                            logWatcher(`New file detected: <strong>${fileName}</strong>. Processing...`);
                            SystemMonitor.tempActivate("API Gateway");

                            const fileContent = vfs.cat(filePath);
                            if (!fileContent.startsWith('cat:')) {
                                try {
                                    const result = await ai.models.generateContent({
                                        model: 'gemini-2.5-flash',
                                        contents: `This file was detected in an incoming folder. Briefly describe its content and suggest a next action. Content: ${fileContent.substring(0, 1000)}`,
                                    });
                                    logWatcher(`<strong>${fileName}</strong> analysis: ${result.text}`);
                                    vfs.rm(filePath); // remove after processing
                                    logWatcher(`<strong>${fileName}</strong> processed and removed.`);
                                } catch (e) {
                                    log('ERROR', `AGI watcher failed on ${filePath}: ${e.message}`);
                                    logWatcher(`Error processing <strong>${fileName}</strong>.`);
                                }
                            }
                        }
                    }
                }, 3000);
            }
        });
    }

    function setupModeSwitcher() {
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
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

    function setupVisualizerPanel() {
        const container = document.getElementById('visualizer-container');
        const startBtn = document.getElementById('start-visualizer-btn');
        let renderer, scene, camera, cubes, analyser, dataArray, audioStream;
        let animationFrameId;

        async function init() {
            try {
                audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                startBtn.style.display = 'none';
                container.style.display = 'block';

                const audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(audioStream);
                source.connect(analyser);
                analyser.fftSize = 512;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);

                // Three.js setup
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
                camera.position.z = 100;

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(renderer.domElement);

                const geometry = new THREE.BoxGeometry(2, 2, 2);
                cubes = [];
                for (let i = 0; i < bufferLength; i++) {
                    const material = new THREE.MeshBasicMaterial({ color: 0x00ff6a, wireframe: true });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.x = (i - bufferLength / 2) * 2.5;
                    scene.add(cube);
                    cubes.push(cube);
                }

                window.addEventListener('resize', () => {
                    camera.aspect = container.clientWidth / container.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                });

                animate();
                log('SUCCESS', 'Audio visualizer started.');
            } catch (err) {
                log('ERROR', 'Could not access microphone for visualizer.');
                console.error('getUserMedia error:', err);
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            analyser.getByteFrequencyData(dataArray);
            
            cubes.forEach((cube, i) => {
                const scale = dataArray[i] / 10;
                cube.scale.y = scale > 0.1 ? scale : 0.1;
                cube.rotation.y += 0.01;
                const hue = (i / dataArray.length);
                cube.material.color.setHSL(hue, 1, 0.5);
            });

            renderer.render(scene, camera);
        }

        function stop() {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (audioStream) audioStream.getTracks().forEach(track => track.stop());
            if (container) container.innerHTML = '';
            startBtn.style.display = 'block';
            container.style.display = 'none';
        }

        startBtn.addEventListener('click', init);

        const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting && animationFrameId) {
                stop();
                log('INFO', 'Audio visualizer stopped as panel is no longer visible.');
            }
        }, { threshold: 0.1 });
        observer.observe(document.getElementById('panel-visualizer'));
    }

    function setupGhostingPanel() {
        const container = document.getElementById('ghosting-canvas-container');
        const captureBtn = document.getElementById('capture-echo-btn') as HTMLButtonElement;
        const liveSensorsToggle = document.getElementById('use-live-sensors-toggle') as HTMLInputElement;
        const outputEl = document.getElementById('echo-analysis-output');
        
        let renderer, scene, camera, particles;
        let animationFrameId;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 50;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            const particleCount = 5000;
            const positions = new Float32Array(particleCount * 3);
            for(let i=0; i<particleCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 100;
            }
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const material = new THREE.PointsMaterial({