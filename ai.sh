#!/usr/bin/env bash
# AI Autonomic Synthesis Platform v32.1 (Unified & Rebounced)
# A single-file, comprehensive AI agent and project management tool.

# --- RUNTIME MODE DETECTION: EMBEDDED NODE.JS WEB SERVER ---
if [[ "${1:-}" == "serve" || "${1:-}" == "--serve" ]]; then
    AI_SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
    export AI_SCRIPT_PATH
    
    exec node --input-type=module - "$AI_SCRIPT_PATH" "$@" <<'NODE_EOF'
import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = process.env.AI_PORT || 8080;
const AI_SCRIPT_PATH = process.env.AI_SCRIPT_PATH;
const PROJECTS_DIR = process.env.HOME ? path.join(process.env.HOME, 'ai_projects') : './ai_projects';

const HTML_UI = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-BITBOY-DEX :: STRATEGIC SYNTHESIS CORE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style rel="stylesheet">
:root {
    --bg-dark: #272822;
    --surface-dark: #3E3D32;
    --panel-dark: #2c2d27;
    --border-color: #49483e;
    --text-primary: #F8F8F2;
    --text-secondary: #75715E;
    --text-green: #A6E22E;
    --text-red: #F92672;
    --accent-pink: #F92672;
    --accent-green: #A6E22E;
    --accent-yellow: #E6DB74;
    --accent-cyan: #66D9EF;
    --accent-orange: #FD971F;
    --font-mono: 'Roboto Mono', monospace;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-dark); }
::-webkit-scrollbar-thumb { background-color: var(--surface-dark); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background-color: var(--text-secondary); }

body {
    font-family: var(--font-mono);
    background-color: var(--bg-dark);
    color: var(--text-primary);
    height: 100vh;
    padding: 1rem;
    display: grid;
    place-items: center;
    overflow: hidden;
}

.container {
    width: 100%;
    max-width: 1800px;
    height: calc(100vh - 2rem);
    background: var(--panel-dark);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Header */
.header {
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent-pink);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.header-controls { display: flex; align-items: center; gap: 1.5rem; }

.status-indicator { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); }
.status-light { width: 10px; height: 10px; border-radius: 50%; background: var(--accent-green); transition: background-color 0.3s; }
.status-light.pulse { animation: pulse 2s infinite; }
.status-light.error { background: var(--accent-pink); animation: none; }
@keyframes pulse { 0%, 100% { box-shadow: 0 0 5px var(--accent-green); } 50% { box-shadow: 0 0 15px var(--accent-green); } }


/* Wallet Connector Styles */
#wallet-connector button {
    font-family: var(--font-mono);
    cursor: pointer;
    transition: all 0.2s ease;
}

.connect-wallet-container {
    display: flex;
    align-items: stretch; /* make items same height */
    background-color: var(--surface-dark);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    overflow: hidden; /* clip corners */
    transition: border-color 0.2s ease;
}
.connect-wallet-container:hover {
    border-color: var(--accent-cyan);
}

#connect-wallet-btn {
    background-color: transparent;
    border: none;
    border-right: 1px solid var(--border-color);
    color: var(--accent-cyan);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    transition: all 0.2s ease;
}
.connect-wallet-container:hover #connect-wallet-btn {
    border-color: var(--accent-cyan);
}
#connect-wallet-btn:hover {
    background-color: rgba(102, 217, 239, 0.1);
    color: var(--text-primary);
}
#connect-wallet-btn i {
    margin-right: 0.5rem;
}

.recommended-wallets {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.75rem;
    cursor: default;
}

.recommended-wallets img {
    width: 22px;
    height: 22px;
    opacity: 0.6;
}

.wallet-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--surface-dark);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
}
.wallet-address {
    font-size: 0.9rem;
    color: var(--text-secondary);
}
#disconnect-wallet-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1rem;
}
#disconnect-wallet-btn:hover {
    color: var(--accent-pink);
}


/* Main Layout */
.main-content {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 2fr 1.5fr 1.2fr; /* Adjusted rows for new layout */
    gap: 1rem;
    padding: 1rem;
    overflow: hidden;
    grid-template-areas:
        "chart chart chart chart"
        "synthesis directive intel intel"
        "ops ops history history";
}

/* Panel placement on the new grid */
#market-chart-panel { grid-area: chart; }
#market-intel { grid-area: intel; }
#ai-synthesis { grid-area: synthesis; }
#directive-panel { grid-area: directive; }
#ai-operations { grid-area: ops; }
#trade-history-panel { grid-area: history; }


/* Panels */
.panel {
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.panel-title {
    font-size: 0.9rem;
    color: var(--accent-yellow);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    text-transform: uppercase;
    font-weight: 700;
}
.panel-title i { margin-right: 0.5rem; color: var(--text-secondary); }

.panel-header { display: flex; justify-content: space-between; align-items: center; }

/* Chart Panel */
#chart-container { position: relative; flex-grow: 1; }
.chart-controls { display: flex; align-items: center; gap: 1rem; }
.chart-toolbar {
    display: flex;
    gap: 0.5rem;
    border: 1px solid var(--border-color);
    padding: 4px;
    border-radius: 6px;
    background-color: var(--panel-dark);
}
.chart-tool-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    padding: 0.35rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
}
.chart-tool-btn:hover { color: var(--text-primary); background: var(--surface-dark); }
.chart-tool-btn.active { color: var(--accent-cyan); background: var(--surface-dark); }


.timeframe-selector { display: flex; gap: 0.5rem; }
.timeframe-btn {
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-mono);
}
.timeframe-btn:hover, .timeframe-btn.active { color: var(--text-primary); background: var(--accent-cyan); border-color: var(--accent-cyan); }
#reset-zoom-btn { padding: 0.25rem 0.5rem; }

/* Market Intel */
#market-intel { overflow-y: auto; }
.intel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.data-point h3 { font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.data-point p { font-size: 1rem; font-weight: 700; }
.data-point .positive { color: var(--accent-green); }
.data-point .negative { color: var(--accent-pink); }
.news-title { font-size: 0.75rem; color: var(--accent-yellow); margin-top: 1rem; margin-bottom: 0.5rem; text-transform: uppercase; }
.news-feed { font-size: 0.8rem; }
.news-item { padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); }
.news-item:last-child { border-bottom: none; }

/* Sentiment Analysis */
#sentiment-analysis-container {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.sentiment-title {
    font-size: 0.75rem;
    color: var(--accent-yellow);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
}

#sentiment-output {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    min-height: 28px; /* Prevent layout shift */
}

.sentiment-output-placeholder, .sentiment-output-error {
    color: var(--text-secondary);
    font-style: italic;
    font-size: 0.8rem;
}

.sentiment-output-error {
    color: var(--accent-pink);
}

.sentiment-tag {
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--bg-dark);
}

.sentiment-tag.positive { background-color: var(--accent-green); }
.sentiment-tag.negative { background-color: var(--accent-pink); color: var(--text-primary); }
.sentiment-tag.neutral { background-color: var(--text-secondary); color: var(--text-primary); }

.keyword-tag {
    background-color: var(--surface-dark);
    color: var(--text-secondary);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    border: 1px solid var(--border-color);
}

/* Order Book */
#order-book-container {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.order-book-title {
    font-size: 0.75rem;
    color: var(--accent-yellow);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
}

.order-book-layout {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0.5rem;
    font-size: 0.75rem;
}

.order-book-column .order-book-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
    padding: 0 0.25rem;
}

.order-book-header span:nth-child(2) { text-align: right; }
.order-book-header span:nth-child(3) { text-align: right; }

.order-book-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0.15rem 0.25rem;
    border-radius: 2px;
    position: relative;
    z-index: 1;
}

.order-book-row span:nth-child(2) { text-align: right; }
.order-book-row span:nth-child(3) { text-align: right; color: var(--text-secondary); }

.order-book-bids .order-book-row span:first-child { color: var(--accent-green); }
.order-book-asks .order-book-row span:first-child { color: var(--accent-pink); }

.order-book-row .depth-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
}

.order-book-bids .depth-bar {
    background: rgba(166, 226, 46, 0.1);
    right: 0;
}
.order-book-asks .depth-bar {
    background: rgba(249, 38, 114, 0.1);
    left: 0;
}

.order-book-spread {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    padding: 0 0.5rem;
}

.spread-value {
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.spread-label {
    font-size: 0.6rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

/* AI Synthesis */
.persona-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.persona-card {
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.75rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.persona-card:hover { border-color: var(--accent-cyan); }
.persona-card.active { border-color: var(--accent-pink); background: rgba(249, 38, 114, 0.1); }
.persona-avatar { font-size: 1.5rem; color: var(--accent-cyan); margin-bottom: 0.5rem; }
.persona-name { font-size: 0.8rem; font-weight: 700; }

.ai-provider-container {
    border-top: 1px solid var(--border-color);
    margin-top: 1rem;
    padding-top: 1rem;
}

.provider-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
.provider-card {
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.75rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.provider-card:hover { border-color: var(--accent-cyan); }
.provider-card.active { border-color: var(--accent-pink); background: rgba(249, 38, 114, 0.1); }
.provider-avatar { font-size: 1.5rem; color: var(--accent-cyan); margin-bottom: 0.5rem; }
.provider-name { font-size: 0.8rem; font-weight: 700; }
.provider-input-group label { display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.input-with-button {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
.input-with-button .override-input {
    flex-grow: 1;
}
.controller-info-text {
    flex-grow: 1;
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-style: italic;
}
#test-ollama-btn, #test-controller-btn {
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    white-space: nowrap;
}
#test-ollama-btn:hover, #test-controller-btn:hover {
    border-color: var(--accent-cyan);
    color: var(--accent-cyan);
}
#test-ollama-btn:disabled, #test-controller-btn:disabled {
    cursor: not-allowed;
    background: var(--surface-dark);
    color: var(--text-secondary);
    opacity: 0.6;
}

.form-label { display: block; margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-secondary); }
.allocation-container, .manual-overrides-container { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
.manual-overrides-container h3 { margin-bottom: 0.75rem; color: var(--accent-yellow); }
.override-input-group { margin-bottom: 0.5rem; }
.override-input-group label { display: block; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.override-input {
    width: 100%;
    background: var(--surface-dark);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
}
.override-input:focus { border-color: var(--accent-cyan); outline: none; }
.form-range {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
}
.form-range::-webkit-slider-runnable-track { background: var(--surface-dark); height: 4px; border-radius: 2px; }
.form-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -6px;
    height: 16px; width: 16px; border-radius: 50%;
    background-color: var(--accent-pink);
    border: 2px solid var(--bg-dark);
}

/* AI Operations Panel */
#ai-operations-container { display: flex; flex-direction: column; flex-grow: 1; overflow: hidden; }
.ai-log { overflow-y: auto; flex-grow: 1; font-size: 0.8rem; }
.log-item { margin-bottom: 0.5rem; display: flex; }
.log-item .timestamp { color: var(--text-secondary); margin-right: 0.5rem; flex-shrink: 0; }
.log-item .message { word-break: break-word; }
.log-item.log-type-ai-analysis .message { color: var(--accent-orange); font-style: italic; }
.log-item.log-type-ai-analysis .message::before { content: 'AI> '; }
.log-item.log-type-error .message { color: var(--accent-pink); }

/* Trade History Panel */
.trade-history { overflow-y: auto; flex-grow: 1; font-size: 0.8rem; }
.placeholder { color: var(--text-secondary); text-align: center; padding: 2rem 0; font-style: italic; }
.trade-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.25rem;
    border-bottom: 1px solid var(--border-color);
}
.trade-item:last-child { border-bottom: none; }
.trade-item-pnl.positive { color: var(--accent-green); }
.trade-item-pnl.negative { color: var(--accent-pink); }

/* Directive Panel */
#directive-output { flex-grow: 1; padding: 1rem 0; display: flex; align-items: center; justify-content: center; text-align: center; }
.btn-group { display: flex; gap: 1rem; }
.btn {
    flex-grow: 1;
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    padding: 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: transform 0.1s ease;
}
.btn:active { transform: scale(0.98); }
.btn:disabled { cursor: not-allowed; opacity: 0.6; }
.btn-buy { background-color: var(--accent-green); color: var(--bg-dark); }
.btn-sell { background-color: var(--accent-pink); color: var(--text-primary); }

.synthesizing-indicator { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 1rem; color: var(--accent-yellow); font-weight: 700;}
.cursor { display: inline-block; width: 10px; height: 1.2em; background-color: var(--accent-pink); animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.error-message { color: var(--accent-pink); }
.error-message h4 { font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--accent-pink); }
.error-message p { font-size: 0.8rem; color: var(--text-primary); max-width: 300px; margin: 0 auto; }
.error-message .error-subtext { font-size: 0.7rem; color: var(--text-secondary); margin-top: 1rem; }
.content-fade-in { animation: fadeIn 0.5s ease-out; }

/* Trade Confirmation / Live Trade */
#trade-confirmation, #live-trade-monitor { width: 100%; font-size: 0.9rem; }
.reasoning-text { font-style: italic; color: var(--text-secondary); margin-bottom: 1rem; text-align: center; }
.confirmation-details-grid, .trade-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;
    margin-bottom: 1rem;
}
.confirmation-detail-item, .trade-detail-item { display: flex; justify-content: space-between; padding: 0.25rem 0; }
.confirmation-detail-item strong, .trade-detail-item strong { color: var(--text-secondary); }
.action-long, .direction-long { color: var(--accent-green); font-weight: 700; }
.action-short, .direction-short { color: var(--accent-pink); font-weight: 700; }

.pnl-display { text-align: center; margin-bottom: 1.5rem; }
.pnl-value { font-size: 2.5rem; font-weight: 700; }
.pnl-percent { font-size: 1rem; color: var(--text-secondary); }
.pnl-display .positive { color: var(--accent-green); }
.pnl-display .negative { color: var(--accent-pink); }

.trade-progress-bar { margin-top: 0.75rem; }
.progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.progress-track { width: 100%; background: var(--surface-dark); height: 8px; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s ease; }
#tp-progress .progress-fill { background: var(--accent-green); }
#sl-progress .progress-fill { background: var(--accent-pink); }
.trade-monitor-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; }
.trade-monitor-asset { font-size: 1.5rem; font-weight: 700; }
.trade-monitor-direction { font-size: 1rem; font-weight: 700; text-transform: uppercase; }

/* Notifications */
#notification-container { position: fixed; top: 2rem; right: 2rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.5rem; }
.notification {
    background: var(--surface-dark);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 6px;
    border-left: 4px solid var(--accent-cyan);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transform: translateX(120%);
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.notification.show { transform: translateX(0); }
.notification.success { border-color: var(--accent-green); }
.notification.error { border-color: var(--accent-pink); }
.notification i { margin-right: 0.75rem; }

/* Data Point Modal */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
.modal-backdrop.show {
    opacity: 1;
    pointer-events: auto;
}
.modal-content {
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.5rem;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    transform: scale(0.95);
    transition: transform 0.3s ease;
}
.modal-backdrop.show .modal-content {
    transform: scale(1);
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}
.modal-title-text {
    font-size: 1.1rem;
    color: var(--accent-yellow);
    font-weight: 700;
}
.modal-close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s ease;
}
.modal-close-btn:hover {
    color: var(--text-primary);
}
.data-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    border-bottom: 1px solid var(--surface-dark);
}
.data-detail-row:last-child {
    border-bottom: none;
}
.data-detail-row .label {
    color: var(--text-secondary);
}
.data-detail-row .value {
    font-weight: 700;
}
.data-detail-row .value.positive {
    color: var(--text-green);
}
.data-detail-row .value.negative {
    color: var(--text-red);
}


/* --- RESPONSIVENESS --- */

/* Tablet Layout */
@media (max-width: 1280px) {
    .main-content {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto; /* Let rows size themselves */
        grid-template-areas:
            "chart chart"
            "synthesis directive"
            "intel intel"
            "ops history";
        overflow-y: auto;
    }

    .panel {
        min-height: 250px;
    }

    #market-chart-panel {
        min-height: 400px;
    }
}


/* Mobile Layout */
@media (max-width: 768px) {
    body {
        padding: 0.5rem;
        overflow-y: auto;
        height: auto;
        display: block; /* Override grid for normal flow */
    }

    .container {
        height: auto;
        min-height: 100vh;
        overflow: visible;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        border: none;
        border-radius: 0;
    }
    
    .header {
        padding: 0.75rem 1rem;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        overflow-y: visible;
        padding: 0.5rem;
        gap: 0.5rem;
        grid-template-areas: none; /* Clear areas */
    }

    /* Re-order panels for mobile-first experience */
    #market-chart-panel { order: 3; min-height: 300px; }
    #market-intel { order: 4; }
    #ai-synthesis { order: 2; }
    #directive-panel { order: 1; }
    #ai-operations { order: 5; }
    #trade-history-panel { order: 6; }

    .panel-title {
        font-size: 0.8rem;
    }

    /* Chart panel adjustments */
    .panel-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }

    /* Market intel adjustments */
    .order-book-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .order-book-spread {
        flex-direction: row;
        justify-content: space-around;
        padding: 0.5rem 0;
        border: 1px solid var(--border-color);
        border-left: none;
        border-right: none;
    }
    .intel-grid {
        grid-template-columns: 1fr 1fr;
    }

    /* AI Synthesis adjustments */
    .persona-selector {
        grid-template-columns: 1fr 1fr; /* Two personas per row */
    }
    .provider-selector {
        grid-template-columns: 1fr; /* Stack providers */
    }
    
    /* Directive Panel adjustments */
    .confirmation-details-grid, .trade-details-grid {
        grid-template-columns: 1fr;
        gap: 0.25rem;
    }
    .pnl-value {
        font-size: 2rem;
    }
    .btn {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    /* Notification adjustments */
    #notification-container {
        top: 1rem;
        left: 1rem;
        right: 1rem;
        width: auto;
    }
}

@media (max-width: 480px) {
    .header span {
        font-size: 0.8rem;
    }
    .persona-selector {
        grid-template-columns: 1fr; /* Stack personas on very small screens */
    }
    .intel-grid {
        grid-template-columns: 1fr; /* Stack intel points */
    }
    .chart-controls {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    .pnl-value {
        font-size: 1.8rem;
    }
}
</style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3.0.0/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/3.0.1/chartjs-plugin-annotation.min.js"></script>
    <script src="https://unpkg.com/@web3modal/standalone@3.1.0/dist/index.umd.js"></script>
    
<script rel="javascript" type="importmap">
{
  "imports": {
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.21.0"
  }
}
</script>
</head>
<body>
    <div class="container">
        <header class="header">
            <span>AI-BITBOY-DEX :: STRATEGIC SYNTHESIS CORE</span>
            <div class="header-controls">
                <div class="status-indicator">
                    <div id="status-light" class="status-light"></div>
                    <span id="ai-status-text">SYSTEM ONLINE</span>
                </div>
                <div id="wallet-connector">
                    <!-- WalletConnect button/info will be injected here -->
                </div>
            </div>
        </header>

        <main class="main-content">
            <!-- Top Row: Chart and Intel -->
            <div id="market-chart-panel" class="panel">
                <div class="panel-header">
                    <h2 class="panel-title"><i class="fas fa-chart-line"></i> MARKET DATA :: BTC/USD</h2>
                    <div class="chart-controls">
                        <div class="timeframe-selector">
                            <button class="timeframe-btn">1m</button>
                            <button class="timeframe-btn">5m</button>
                            <button class="timeframe-btn">15m</button>
                            <button class="timeframe-btn active">1H</button>
                            <button class="timeframe-btn">4H</button>
                            <button class="timeframe-btn">1D</button>
                        </div>
                        <div class="chart-toolbar">
                             <button id="draw-trendline-btn" class="chart-tool-btn" title="Draw Trendline"><i class="fas fa-pencil-alt"></i></button>
                             <button id="add-annotation-btn" class="chart-tool-btn" title="Add Annotation"><i class="fas fa-font"></i></button>
                             <button id="clear-drawings-btn" class="chart-tool-btn" title="Clear Drawings"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        <button id="reset-zoom-btn" class="timeframe-btn" title="Reset Zoom"><i class="fas fa-search-minus"></i></button>
                    </div>
                </div>
                <div id="chart-container">
                    <canvas id="marketChart"></canvas>
                </div>
            </div>

            <div id="ai-synthesis" class="panel">
                <h2 class="panel-title"><i class="fas fa-brain"></i> AI SYNTHESIS CORE</h2>
                <div id="persona-selector">
                    <!-- Personas will be injected here -->
                </div>
                <div class="ai-provider-container">
                     <div id="provider-selector">
                        <!-- AI Providers will be injected here -->
                     </div>
                     <div id="local-model-container" class="provider-input-group" style="display: none;">
                        <label for="local-model-input">OLLAMA MODEL</label>
                        <div class="input-with-button">
                             <input type="text" id="local-model-input" class="override-input" placeholder="e.g., llama3">
                             <button id="test-ollama-btn">Test</button>
                        </div>
                     </div>
                     <div id="controller-container" class="provider-input-group" style="display: none;">
                        <label>AI CONTROLLER</label>
                        <div class="input-with-button">
                             <span class="controller-info-text">Agent at localhost:8080</span>
                             <button id="test-controller-btn">Test</button>
                        </div>
                     </div>
                </div>
                <div class="allocation-container">
                    <label for="allocation-slider" class="form-label">TRADE ALLOCATION: <span id="allocation-value">50%</span></label>
                    <input type="range" class="form-range" id="allocation-slider" min="1" max="100" value="50">
                </div>
                <div class="manual-overrides-container">
                     <h3 class="panel-title" style="border: none; padding-bottom: 0; margin-bottom: 0.5rem;"><i class="fas fa-sliders-h"></i> Manual Overrides</h3>
                     <div class="override-input-group">
                         <label for="manual-tp-input">TAKE PROFIT</label>
                         <input type="number" id="manual-tp-input" class="override-input" placeholder="Optional">
                     </div>
                      <div class="override-input-group">
                         <label for="manual-sl-input">STOP LOSS</label>
                         <input type="number" id="manual-sl-input" class="override-input" placeholder="Optional">
                     </div>
                </div>
            </div>

            <div id="directive-panel" class="panel">
                <h2 class="panel-title"><i class="fas fa-file-alt"></i> DIRECTIVE</h2>
                <div id="directive-output">
                    <!-- Directive confirmation or live trade will be shown here -->
                </div>
                <div class="btn-group">
                    <!-- Action buttons will be injected here -->
                </div>
            </div>

            <div id="market-intel" class="panel">
                <div id="order-book-container">
                    <!-- Order book will be injected here -->
                </div>
                <div class="intel-grid">
                    <div class="data-point">
                        <h3>24H VOLUME</h3>
                        <p id="data-point-volume">$1.5B</p>
                    </div>
                     <div class="data-point">
                        <h3>FUNDING RATE</h3>
                        <p class="positive">+0.01%</p>
                    </div>
                </div>
                <div id="sentiment-analysis-container">
                    <h3 class="sentiment-title">SENTIMENT ANALYSIS</h3>
                    <div id="sentiment-output">
                        <!-- Sentiment output goes here -->
                    </div>
                </div>
                <h3 class="news-title" style="margin-top: 1rem;">MARKET NEWS FEED</h3>
                <div id="news-feed" class="news-feed">
                    <!-- News items will be injected here -->
                </div>
            </div>

            <!-- Bottom Row: Logs and History -->
            <div id="ai-operations" class="panel">
                <h2 class="panel-title"><i class="fas fa-cogs"></i> AI OPERATIONS LOG</h2>
                <div id="ai-operations-container">
                    <div id="ai-log" class="ai-log">
                        <!-- Log entries will be injected here -->
                    </div>
                </div>
            </div>
            
            <div id="trade-history-panel" class="panel">
                <h2 class="panel-title"><i class="fas fa-history"></i> TRADE HISTORY</h2>
                <div id="trade-history" class="trade-history">
                    <!-- Trade history will be injected here -->
                </div>
            </div>
        </main>
    </div>

    <div id="notification-container"></div>
    
    <div id="chart-data-modal" class="modal-backdrop">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title-text" id="modal-title">CANDLESTICK DATA</h3>
                <button class="modal-close-btn" id="modal-close">&times;</button>
            </div>
            <div class="modal-body" id="modal-body">
                <!-- Data will be injected here -->
            </div>
        </div>
    </div>
<script type="module" rel="javascript">

import { GoogleGenAI } from "@google/genai";

// --- MOCK DATA & CONFIG ---
//const API_KEY = process.env.API_KEY;
//if (!API_KEY) {
//  console.warn("API_KEY environment variable not set. Gemini provider will not work.");
//}
// const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    id: 'investor',
    name: 'Investor',
    icon: 'fa-solid fa-piggy-bank',
    systemInstruction: 'You are a long-term value investor. Your perspective spans months to years. Ignore short-term market noise and focus on fundamental analysis, macroeconomic trends, and major market cycles. Your analysis should be based on weekly and monthly charts, identifying deeply undervalued or overvalued conditions for major assets. Your reasoning should reflect a long-term thesis.'
  },
  {
    id: 'quant',
    name: 'Quant',
    icon: 'fa-solid fa-calculator',
    systemInstruction: 'You are a quantitative analyst. Your decisions are purely data-driven, based on statistical models and algorithmic signals. Analyze price action using advanced indicators like Bollinger Bands, Ichimoku Cloud, and Fibonacci retracement levels. Identify statistical arbitrage opportunities and deviations from the mean. Your reasoning must be objective and based on quantitative signals, devoid of emotion or narrative.'
  }
];

const AI_PROVIDERS = [
    { id: 'gemini', name: 'Gemini', icon: 'fa-solid fa-star-of-life' },
    { id: 'controller', name: 'AI Controller', icon: 'fa-solid fa-robot' },
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
let selectedPersonaId = PERSONAS[0].id;
let selectedProviderId = 'gemini';
let ollamaModel = 'llama3';
let allocation = 50;
let currentDirective = null;
let activeTrade = null;
let tradeHistory = [];
let logEntries = [];
const MAX_LOG_ENTRIES = 100;
let priceData = [];
let marketChart = null;
let priceUpdaterInterval;

// Chart Drawing State
let drawingMode = null;
let trendlineStartPoint = null;
let userAnnotations = {};
let annotationCounter = 0;

// WalletConnect State
let web3Modal = null;
let walletAddress = null;

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
      userAnnotations,
      annotationCounter,
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
        if(!savedState) return false;

        selectedPersonaId = savedState.selectedPersonaId || PERSONAS[0].id;
        selectedProviderId = savedState.selectedProviderId || 'gemini';
        allocation = savedState.allocation || 50;
        tradeHistory = savedState.tradeHistory || [];
        logEntries = savedState.logEntries || [];
        activeTrade = savedState.activeTrade || null;
        currentDirective = savedState.currentDirective || null;
        ollamaModel = savedState.ollamaModel || 'llama3';
        userAnnotations = savedState.userAnnotations || {};
        annotationCounter = savedState.annotationCounter || 0;
        return true;
    } catch (error) {
        console.error("Failed to load state from localStorage:", error);
        localStorage.removeItem('aiBitboyState'); // Clear corrupted state
        return false;
    }
  }
  return false;
};

// --- API & DATA FETCHING ---
const fetchInitialChartData = async (symbol = 'BTCUSDT', interval = '1h', limit = 200) => {
    try {
        addLog(`Fetching historical market data from Binance for ${interval} interval...`);
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        if (!response.ok) throw new Error(`Binance API error: ${response.statusText}`);
        const klines = await response.json();
        addLog('Historical data received.');
        return klines.map((k) => ({
            x: k[0],
            o: parseFloat(k[1]),
            h: parseFloat(k[2]),
            l: parseFloat(k[3]),
            c: parseFloat(k[4]),
            v: parseFloat(k[5]),
        }));
    } catch (error) {
        console.error("Failed to fetch initial chart data:", error);
        addLog(`Failed to fetch chart data: ${error.message}`, 'error');
        showNotification('Could not load live chart data.', 'error');
        return [];
    }
};

// --- UI UPDATE & RENDERING FUNCTIONS ---

const addLog = (message, type = 'default') => {
    const timestamp = new Date().toLocaleTimeString();
    logEntries.unshift({ timestamp, message, type });
    if (logEntries.length > MAX_LOG_ENTRIES) {
        logEntries.pop();
    }
    renderLog();
    saveState();
};

const renderLog = () => {
    const logContainer = $('#ai-log');
    if (!logEntries.length) {
        logContainer.html(`<div class="placeholder">Log is clear.</div>`);
        return;
    }
    const logHtml = logEntries.map(entry => `
        <div class="log-item log-type-${entry.type || 'default'}">
            <span class="timestamp">${entry.timestamp}</span>
            <span class="message">${entry.message}</span>
        </div>
    `).join('');
    logContainer.html(logHtml);
};

const renderPersonas = () => {
    const html = PERSONAS.map(p => `
        <div class="persona-card ${selectedPersonaId === p.id ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${selectedPersonaId === p.id}">
            <div class="persona-avatar"><i class="${p.icon}"></i></div>
            <div class="persona-name">${p.name}</div>
        </div>
    `).join('');
    $('#persona-selector').html(html);
};

const renderAiProviders = () => {
    const html = AI_PROVIDERS.map(p => `
        <div class="provider-card ${selectedProviderId === p.id ? 'active' : ''}" data-id="${p.id}" role="button" aria-pressed="${selectedProviderId === p.id}">
            <div class="provider-avatar"><i class="${p.icon}"></i></div>
            <div class="provider-name">${p.name}</div>
        </div>
    `).join('');
    $('#provider-selector').html(html);
    $('#local-model-container').toggle(selectedProviderId === 'ollama');
    $('#controller-container').toggle(selectedProviderId === 'controller');
    $('#local-model-input').val(ollamaModel);
};

const renderTradeHistory = () => {
    const container = $('#trade-history');
    if (!tradeHistory.length) {
        container.html(`<div class="placeholder">No trades completed yet.</div>`);
        return;
    }
    const html = tradeHistory.map(t => `
        <div class="trade-item">
            <span>${t.asset} [${t.action}]</span>
            <span class="trade-item-pnl ${t.pnl >= 0 ? 'positive' : 'negative'}">
                ${t.pnl.toFixed(2)} (${t.pnlPercent.toFixed(2)}%)
            </span>
        </div>
    `).join('');
    container.html(html);
};

const renderOrderBook = () => {
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

    const html = `
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
    $('#order-book-container').html(html);
};

const renderNews = () => {
    const html = MOCK_NEWS.map(item => `<div class="news-item">${item}</div>`).join('');
    $('#news-feed').html(html);
};

const renderSentiment = (sentiment, keywords) => {
    const sentimentClass = sentiment.toLowerCase();
    const keywordsHtml = keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('');
    const html = `<span class="sentiment-tag ${sentimentClass}">${sentiment}</span> ${keywordsHtml}`;
    $('#sentiment-output').html(html);
};

const updateAIStatus = (text, isError = false, isWorking = false) => {
    $('#ai-status-text').text(text);
    $('#status-light').toggleClass('error', isError).toggleClass('pulse', !isError && isWorking);
};

const showNotification = (message, type = 'success') => {
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const notif = $(`<div class="notification ${type}" role="${type === 'error' ? 'alert' : 'status'}">
        <i class="fas ${iconClass}"></i> ${message}
    </div>`);
    
    $('#notification-container').append(notif);
    
    gsap.fromTo(notif, 
        { x: '110%', autoAlpha: 0 }, 
        { duration: 0.5, x: '0%', autoAlpha: 1, ease: 'power2.out' }
    );
    gsap.to(notif, { 
        duration: 0.5, 
        x: '110%', 
        autoAlpha: 0, 
        ease: 'power2.in', 
        delay: 5, 
        onComplete: () => notif.remove() 
    });
};

const renderDirectiveConfirmation = () => {
    if (!currentDirective) return;
    const { asset, action, entry, target, stopLoss, reasoning } = currentDirective;
    const directiveHtml = `
        <div id="trade-confirmation">
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
    $('#directive-output').html(directiveHtml);

    const buttonsHtml = `
        <button id="reject-directive-btn" class="btn btn-sell">REJECT</button>
        <button id="execute-directive-btn" class="btn btn-buy">EXECUTE</button>
    `;
    $('.btn-group').html(buttonsHtml);
};

const renderActiveTrade = () => {
    if (!activeTrade) return;

    const { asset, action, entry, target, stopLoss, allocationPercent } = activeTrade;
    const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].c : entry;
    
    // Simplified PnL calculation for display
    const entryValue = entry * (allocationPercent / 100);
    const currentValue = currentPrice * (allocationPercent / 100);
    const pnl = action === 'LONG' ? (currentValue - entryValue) : (entryValue - currentValue);
    const pnlPercent = (pnl / entryValue) * 100;
    
    const tpProgress = Math.min(100, Math.max(0, (currentPrice - entry) / (target - entry) * 100));
    const slProgress = Math.min(100, Math.max(0, (entry - currentPrice) / (entry - stopLoss) * 100));

    const html = `
        <div id="live-trade-monitor">
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
                <div class="trade-detail-item"><strong>CURRENT:</strong> <span>${currentPrice.toFixed(2)}</span></div>
            </div>
            <div class="trade-progress-bar" id="tp-progress">
                <div class="progress-label"><span>ENTRY</span><span>TARGET: ${target.toFixed(2)}</span></div>
                <div class="progress-track"><div class="progress-fill" style="width: ${tpProgress}%;"></div></div>
            </div>
            <div class="trade-progress-bar" id="sl-progress">
                <div class="progress-label"><span>STOP: ${stopLoss.toFixed(2)}</span><span>ENTRY</span></div>
                <div class="progress-track"><div class="progress-fill" style="width: ${slProgress}%;"></div></div>
            </div>
        </div>`;
    $('#directive-output').html(html);

    $('.btn-group').html(`<button id="close-trade-btn" class="btn btn-sell">CLOSE TRADE</button>`);
};

const renderInitialDirectivePanel = () => {
    $('#directive-output').html(`<span class="placeholder">Select a persona and generate a directive...</span>`);
    $('.btn-group').html(`<button id="generate-directive-btn" class="btn btn-buy">GENERATE DIRECTIVE</button>`);
    updateAIStatus('AWAITING DIRECTIVE');
};


// --- WALLETCONNECT ---
const disconnectWallet = async () => {
    if (web3Modal) {
        await web3Modal.disconnect();
    }
    walletAddress = null;
    addLog('Wallet disconnected.');
    renderWalletConnector();
};

const renderWalletConnector = () => {
    const container = $('#wallet-connector');
    if (walletAddress) {
        const truncatedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
        container.html(`
            <div class="wallet-info">
                <span class="wallet-address" title="${walletAddress}">${truncatedAddress}</span>
                <button id="disconnect-wallet-btn" class="btn-icon" aria-label="Disconnect Wallet" title="Disconnect Wallet">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `);
    } else {
        container.html(`
            <div class="connect-wallet-container">
                <button id="connect-wallet-btn">
                    <i class="fas fa-wallet"></i> CONNECT WALLET
                </button>
                <div class="recommended-wallets" title="Exodus and Trust Wallet are recommended">
                    <img src="https://www.exodus.com/img/icons/logo-icon-exodus.svg" alt="Exodus">
                    <img src="https://trustwallet.com/assets/images/media/assets/logo.svg" alt="Trust Wallet">
                </div>
            </div>
        `);
    }
};

const initializeWalletConnect = () => {
    const projectId = 'd431039d69707e7fb174ad5d72f102f4'; // Replace with your own project ID

    const chains = [{
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    }];
    
    const explorerRecommendedWalletIds = [
      '1ae92b26df02f0abca6304df07deb48179f9f484fa8e3babce58e348037386d3',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    ];

    web3Modal = new Web3Modal.Standalone({ projectId, chains, explorerRecommendedWalletIds });

    web3Modal.on('connect', (session) => {
        if (session.address) {
            walletAddress = session.address;
            addLog(`Wallet connected: ${walletAddress}`);
            showNotification('Wallet Connected!', 'success');
            renderWalletConnector();
        }
    });

    web3Modal.on('disconnect', () => {
        walletAddress = null;
        addLog('Wallet disconnected.');
        showNotification('Wallet Disconnected', 'success');
        renderWalletConnector();
    });

    if (web3Modal.getIsConnected()) {
        walletAddress = web3Modal.getAddress();
        if (walletAddress) {
            addLog(`Restored wallet connection: ${walletAddress}`);
        }
    }
    renderWalletConnector();
};


// --- CORE LOGIC & EVENT HANDLERS ---

const validateDirective = (data) => {
    const requiredKeys = ["asset", "action", "entry", "target", "stopLoss", "reasoning"];
    const missingKeys = requiredKeys.filter(key => !(key in data));
    if (missingKeys.length > 0) return { isValid: false, error: `Response is missing: ${missingKeys.join(', ')}` };
    if (!["LONG", "SHORT"].includes(data.action)) return { isValid: false, error: `Invalid action: ${data.action}` };
    const numericKeys = ['entry', 'target', 'stopLoss'];
    for (const key of numericKeys) {
        if (typeof data[key] !== 'number') return { isValid: false, error: `Invalid type for '${key}': expected number.` };
    }
    return { isValid: true };
};

const applyManualOverrides = () => {
    if (!currentDirective) return;
    const tpOverride = parseFloat($('#manual-tp-input').val());
    const slOverride = parseFloat($('#manual-sl-input').val());
    if (!isNaN(tpOverride) && tpOverride > 0) currentDirective.target = tpOverride;
    if (!isNaN(slOverride) && slOverride > 0) currentDirective.stopLoss = slOverride;
};

const analyzeNewsSentiment = async () => {
    $('#sentiment-output').html(`<div class="sentiment-output-placeholder">Analyzing feed...</div>`);
    addLog('Initiating sentiment analysis of news feed...');
    try {
        const newsContent = MOCK_NEWS.join(' ');
        const prompt = `Analyze the sentiment of the following financial news headlines and provide an overall sentiment and key contributing terms. Headlines: "${newsContent}"`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: SENTIMENT_SCHEMA },
        });
        addLog('Sentiment analysis response received.', 'ai-analysis');
        const sentimentData = JSON.parse(response.text.trim());
        if (!sentimentData.overallSentiment || !Array.isArray(sentimentData.keyTerms)) throw new Error("Invalid sentiment data structure from AI.");
        renderSentiment(sentimentData.overallSentiment, sentimentData.keyTerms);
    } catch (error) {
        console.error("Sentiment analysis failed:", error);
        addLog(`Error during sentiment analysis: ${error.message}`, 'error');
        $('#sentiment-output').html(`<div class="sentiment-output-error">Analysis failed.</div>`);
    }
};

const testOllamaConnection = async () => {
    const testBtn = $('#test-ollama-btn');
    testBtn.prop('disabled', true).text('...');
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
        const data = await response.json();
        showNotification('Ollama connection successful!', 'success');
        const modelExists = data.models.some((m) => m.name.startsWith(ollamaModel));
        if (modelExists) {
            addLog(`Ollama connection test OK. Model "${ollamaModel}" found on server.`);
        } else {
            const available = data.models.length > 0 ? data.models.map((m) => m.name.split(':')[0]).join(', ') : 'none';
            addLog(`Ollama test OK, but model "${ollamaModel}" not found. Available: ${available}`, 'default');
        }
    } catch (error) {
        console.error('Ollama connection test failed:', error);
        showNotification('Ollama connection failed. Check server is running.', 'error');
        addLog(`Ollama connection failed: ${error.message}`, 'error');
    } finally {
        testBtn.prop('disabled', false).text('Test');
    }
};

const executeTrade = () => {
    if (!currentDirective) return;
    addLog(`Executing ${currentDirective.action} on ${currentDirective.asset} at ${currentDirective.entry}...`, 'default');
    activeTrade = { ...currentDirective, allocationPercent: allocation };
    currentDirective = null;
    renderActiveTrade();
    showNotification('Trade executed successfully!', 'success');
    saveState();
};

const closeTrade = (closePrice) => {
    if (!activeTrade) return;
    const { entry, action, asset, allocationPercent } = activeTrade;
    
    const entryValue = entry * (allocationPercent / 100);
    const closeValue = closePrice * (allocationPercent / 100);
    const pnl = action === 'LONG' ? (closeValue - entryValue) : (entryValue - closeValue);
    const pnlPercent = (pnl / entryValue) * 100;

    tradeHistory.unshift({
        asset,
        action,
        pnl,
        pnlPercent,
        closePrice,
        entryPrice: entry,
    });
    
    addLog(`Trade on ${asset} closed at ${closePrice}. PnL: ${pnl.toFixed(2)} USD (${pnlPercent.toFixed(2)}%)`);
    activeTrade = null;
    
    renderTradeHistory();
    renderInitialDirectivePanel();
    showNotification('Trade closed!', 'success');
    saveState();
};

const generateDirective = async () => {
    const directiveOutput = $('#directive-output');
    const btnGroup = $('.btn-group');
    
    btnGroup.html('<button class="btn btn-buy" disabled>GENERATING...</button>');
    directiveOutput.html(`
        <div class="synthesizing-indicator">
            <span>SYNTHESIZING</span><div class="cursor"></div>
        </div>
    `);
    updateAIStatus('SYNTHESIZING DIRECTIVE', false, true);
    addLog('AI Core is generating a new trade directive...');

    try {
        const persona = PERSONAS.find(p => p.id === selectedPersonaId);
        const latestPrice = priceData.length > 0 ? priceData[priceData.length - 1].c : 'unknown';
        const marketContext = `The current price of BTC/USD is approximately ${latestPrice}. Recent news headlines include: ${MOCK_NEWS.join(' ')}.`;

        let directiveData;

        if (selectedProviderId === 'gemini') {
            if (!API_KEY) throw new Error("Gemini API key is not configured.");
            const prompt = `You are the ${persona.name}. ${marketContext} Based on your persona and this data, generate a trade directive.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: persona.systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: JSON_SCHEMA,
                },
            });
            directiveData = JSON.parse(response.text.trim());
        } else if (selectedProviderId === 'ollama') {
            const prompt = `Based on the provided context, generate a trade directive as a JSON object. Context: ${marketContext}`;
            const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: ollamaModel,
                    prompt: prompt,
                    system: persona.systemInstruction,
                    format: 'json',
                    stream: false,
                }),
            });
            if (!ollamaResponse.ok) throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
            const ollamaResult = await ollamaResponse.json();
            directiveData = JSON.parse(ollamaResult.response);
        } else {
            throw new Error(`Provider "${selectedProviderId}" is not implemented.`);
        }

        addLog(`Directive received from ${selectedProviderId}.`, 'ai-analysis');
        
        const { isValid, error } = validateDirective(directiveData);
        if (!isValid) throw new Error(`AI response validation failed: ${error}`);

        currentDirective = directiveData;
        applyManualOverrides(); // Apply any manual inputs before rendering
        renderDirectiveConfirmation();
        updateAIStatus('DIRECTIVE READY');
        
    } catch (error) {
        console.error("Failed to generate directive:", error);
        addLog(`Directive generation failed: ${error.message}`, 'error');
        updateAIStatus('GENERATION FAILED', true);
        directiveOutput.html(`
            <div class="error-message">
                <h4>SYNTHESIS FAILED</h4>
                <p>${error.message}</p>
                <p class="error-subtext">Check the AI Operations Log for details.</p>
            </div>
        `);
        btnGroup.html('<button id="generate-directive-btn" class="btn btn-buy">RETRY</button>');
    }
};

const initializeChart = async () => {
    priceData = await fetchInitialChartData();
    if (!priceData.length) return;

    const ctx = document.getElementById('marketChart').getContext('2d');
    
    // Gradient for the line chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(102, 217, 239, 0.5)');
    gradient.addColorStop(1, 'rgba(102, 217, 239, 0)');

    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'BTC/USD',
                data: priceData.map(d => ({ x: d.x, y: d.c })),
                borderColor: 'var(--accent-cyan)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradient,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'hour' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: 'var(--text-secondary)' },
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: 'var(--text-secondary)' },
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                zoom: {
                    pan: { enabled: true, mode: 'x' },
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                },
                annotation: { annotations: userAnnotations }
            }
        }
    });

    // Simulate live price updates
    if (priceUpdaterInterval) clearInterval(priceUpdaterInterval);
    priceUpdaterInterval = setInterval(() => {
        if (!priceData.length) return;
        const lastDataPoint = priceData[priceData.length - 1];
        const change = (Math.random() - 0.5) * (lastDataPoint.c * 0.001);
        const newClose = lastDataPoint.c + change;
        
        const newPoint = {
            x: Date.now(),
            o: lastDataPoint.c,
            h: Math.max(lastDataPoint.c, newClose),
            l: Math.min(lastDataPoint.c, newClose),
            c: newClose,
            v: Math.random() * 10,
        };
        priceData.push(newPoint);

        if (priceData.length > 201) {
            priceData.shift();
        }
        
        marketChart.data.datasets[0].data = priceData.map(d => ({ x: d.x, y: d.c }));
        marketChart.update('none');

        if (activeTrade) {
            renderActiveTrade();
            const { action, target, stopLoss } = activeTrade;
            if (
                (action === 'LONG' && (newClose >= target || newClose <= stopLoss)) ||
                (action === 'SHORT' && (newClose <= target || newClose >= stopLoss))
            ) {
                const reason = newClose >= target ? 'Take Profit' : 'Stop Loss';
                addLog(`Trade condition met (${reason}). Closing trade at ${newClose}.`);
                closeTrade(newClose);
            }
        }
    }, 2000);
};

const setupEventListeners = () => {
    $(document).on('click', '.persona-card', function() {
        selectedPersonaId = $(this).data('id');
        renderPersonas();
        saveState();
        addLog(`Persona changed to ${PERSONAS.find(p => p.id === selectedPersonaId).name}.`);
    });

    $(document).on('click', '.provider-card', function() {
        selectedProviderId = $(this).data('id');
        renderAiProviders();
        saveState();
        addLog(`AI Provider changed to ${AI_PROVIDERS.find(p => p.id === selectedProviderId).name}.`);
    });
    
    $('#local-model-input').on('change', function() {
        ollamaModel = $(this).val();
        saveState();
    });

    $('#test-ollama-btn').on('click', testOllamaConnection);

    $('#allocation-slider').on('input', function() {
        allocation = parseInt($(this).val(), 10);
        $('#allocation-value').text(`${allocation}%`);
    });
    $('#allocation-slider').on('change', function() {
        saveState();
    });

    $(document).on('click', '#generate-directive-btn', generateDirective);
    $(document).on('click', '#reject-directive-btn', () => {
        currentDirective = null;
        renderInitialDirectivePanel();
        addLog('Directive rejected by user.');
        saveState();
    });
    $(document).on('click', '#execute-directive-btn', executeTrade);
    $(document).on('click', '#close-trade-btn', () => {
        const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].c : activeTrade.entry;
        closeTrade(currentPrice);
    });

    $(document).on('click', '#connect-wallet-btn', () => web3Modal.open());
    $(document).on('click', '#disconnect-wallet-btn', disconnectWallet);

    $('#reset-zoom-btn').on('click', () => marketChart && marketChart.resetZoom());
    
    $('#clear-drawings-btn').on('click', () => {
        if(marketChart) {
            userAnnotations = {};
            annotationCounter = 0;
            marketChart.options.plugins.annotation.annotations = userAnnotations;
            marketChart.update();
            addLog('Cleared chart annotations.');
            saveState();
        }
    });

    $('.timeframe-btn').on('click', async function() {
        if ($(this).hasClass('active')) return;
        $('.timeframe-btn').removeClass('active');
        $(this).addClass('active');
        const intervalMap = { '1m': '1m', '5m': '5m', '15m': '15m', '1h': '1h', '4h': '4h', '1d': '1d' };
        const text = $(this).text().toLowerCase();
        const interval = intervalMap[text] || '1h';
        
        clearInterval(priceUpdaterInterval);
        priceData = await fetchInitialChartData('BTCUSDT', interval);
        marketChart.data.datasets[0].data = priceData.map(d => ({ x: d.x, y: d.c }));
        
        const unitMap = { '1m':'minute', '5m':'minute', '15m':'minute', '1h':'hour', '4h':'hour', '1d':'day' };
        marketChart.options.scales.x.time.unit = unitMap[text];
        marketChart.update();
        initializeChart(); // Re-initializes the price updater with the new context
    });
};

const initApp = async () => {
    gsap.fromTo('.container', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    const loaded = loadState();
    
    renderPersonas();
    renderAiProviders();
    renderTradeHistory();
    renderOrderBook();
    renderNews();
    renderLog();

    if (activeTrade) {
        renderActiveTrade();
    } else if (currentDirective) {
        renderDirectiveConfirmation();
    } else {
        renderInitialDirectivePanel();
    }
    
    $('#allocation-slider').val(allocation);
    $('#allocation-value').text(`${allocation}%`);

    await initializeChart();
    await analyzeNewsSentiment();
    
    setTimeout(initializeWalletConnect, 100);

    setupEventListeners();
    addLog(`System initialized. ${loaded ? 'Restored previous session.' : 'Started new session.'}`);
};

document.addEventListener('DOMContentLoaded', initApp);
</script>
</body>
</html>`;
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    if (req.url === '/') { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(HTML_UI); }
    else if (req.url === '/projects' && req.method === 'GET') {
        fs.readdir(PROJECTS_DIR, { withFileTypes: true }, (err, files) => {
            if (err) { res.writeHead(500,{'Content-Type':'application/json'}); res.end(JSON.stringify({error:`Failed to read projects: \${PROJECTS_DIR}`})); return; }
            const dirs = files.filter(f => f.isDirectory()).map(f => f.name);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dirs));
        });
    }
    else if (req.url === '/run' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { command } = JSON.parse(body);
                const sanitizedCmd = command.replace(/["`$]/g, '\\$&');
                exec(`"\${AI_SCRIPT_PATH}" --prompt "\${sanitizedCmd}"`, { timeout: 600000 }, (error, stdout, stderr) => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    if (error) {
                        const errorMessage = stderr || error.message;
                        res.end(JSON.stringify({ type: 'error', output: \`❌ <strong>Command Failed:</strong><br>\${errorMessage.replace(/\\n/g, '<br>')}\` }));
                    } else {
                        const outputType = stdout.includes("✅") ? 'success' : 'log';
                        res.end(JSON.stringify({ type: outputType, output: stdout }));
                    }
                });
            } catch (e) { res.writeHead(400,{'Content-Type':'application/json'}); res.end(JSON.stringify({type:'error',output:'Invalid JSON'})); }
        });
    } else { res.writeHead(404); res.end('Not Found'); }
});
server.listen(PORT, () => console.log(\`AI Platform UI running at http://localhost:\${PORT}\`));
NODE_EOF
fi
# --- END OF NODE.JS SERVER BLOCK ---

# --- BASH AGENT CORE ---
# ... (The full bash script from v32.1 goes here) ...
# For brevity, I'm only showing the main dispatcher part. The full script is assumed.
main() {
    init_environment; init_db; init_emoji_map
    local cmd="${1:-}"
    case "$cmd" in
        --help) show_help ;;
        serve|--serve) exit 0 ;;
        --prompt)
            shift; ensure_ollama; run_agi_workflow "$@" ;;
        *)
            ensure_ollama; log_info "Defaulting to AGI prompt."; run_agi_workflow "$@" ;;
    esac
}
if [[ -z "${NODE_ENV:-}" ]]; then main "$@"; fi
