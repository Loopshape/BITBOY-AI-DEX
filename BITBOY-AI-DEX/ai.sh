#!/usr/bin/env bash
# ~/bin/ai - AI DevOps Platform v8.0 - The Triumvirate Mind Edition
# A multi-worker cognitive system with advanced hashing and a Gemini evaluation trigger.

set -euo pipefail
IFS=$'\n\t'

# --- CONFIG ---
AI_HOME="${AI_HOME:-$HOME/.ai_builder}"
PROJECTS_DIR="${AI_HOME}/projects"
# The Three Worker Models
MESSENGER_MODEL="gemma3:1b"
COMBINATOR_MODEL="deepseek-r1:1.5b"
TRADER_MODEL="2244-1" # The mandatory executive model
OLLAMA_BIN="${OLLAMA_BIN:-$(command -v ollama || true)}"
CHAIN_LOG="$AI_HOME/chain.log" # Simulated blockchain resonance
MAX_ITERATIONS=5 # Iterations per worker stage

# --- COLORS & LOGGING ---
C_RESET='\033[0m'; C_BOLD='\033[1m'; C_RED='\033[0;31m'; C_GREEN='\033[0;32m'
C_YELLOW='\033[0;33m'; C_BLUE='\033[0;34m'; C_CYAN='\033[0;36m'; C_MAGENTA='\033[0;35m'
log() { printf "${C_BLUE}[%s]${C_RESET} %s\n" "$(date '+%T')" "$*"; }
log_success() { log "${C_GREEN}$*${C_RESET}"; }
log_warn() { log "${C_YELLOW}WARN: $*${C_RESET}"; }
log_error() { log "${C_RED}ERROR: $*${C_RESET}"; exit 1; }
log_worker() { log "${C_BOLD}${C_MAGENTA}--- WORKER: $1 ---${C_RESET}"; }

# --- BOOTSTRAP ---
mkdir -p "$AI_HOME" "$PROJECTS_DIR"
touch "$CHAIN_LOG"

# --- CORE UTILITIES ---
check_dependencies() { for cmd in "$@"; do if ! command -v "$cmd" >/dev/null; then log_warn "Required command '$cmd' not found."; fi; done; }
ensure_ollama_server() { if ! pgrep -f "ollama serve" >/dev/null; then log "Ollama server starting..."; nohup "$OLLAMA_BIN" serve >/dev/null 2>&1 & sleep 3; fi; }

# --- NEW: COGNITIVE PROJECTIONS (Hashing) ---
generate_projection() {
    local prompt_hash; prompt_hash=$(echo -n "$1" | sha256sum | awk '{print $1}')
    local time_hash; time_hash=$(echo -n "$(date +%s%N)" | sha256sum | awk '{print $1}')
    local random_hash; random_hash=$(echo -n "$RANDOM" | sha256sum | awk '{print $1}')
    local seed_hash="unseeded"
    if [[ -n "${AI_SEED-}" ]]; then
        seed_hash=$(echo -n "$AI_SEED" | sha256sum | awk '{print $1}')
    fi
    # Concatenate hashes for the final projection
    echo -n "${prompt_hash}${time_hash}${random_hash}${seed_hash}" | sha256sum | awk '{print $1}'
}

# --- AGENT TOOLS (Simplified for clarity, used by Messenger) ---
tool_list_directory() { local p="${1:-.}"; if [[ -d "$p" ]]; then tree -L 2 "$p"; else echo "Error: Dir not found: $p"; fi; }
tool_web_search() { local q="$*"; curl -sL "https://html.duckduckgo.com/html/?q=$(jq -nr --arg q "$q" '$q|@uri')" | lynx -dump -stdin -nolist; }

# --- AGENT CORE (Re-architected for Triumvirate Mind) ---
run_worker() {
    local worker_name="$1"
    local model="$2"
    local system_prompt="$3"
    local conversation_history="$4"

    log_worker "$worker_name ($model)"
    echo -e "${C_YELLOW}--- $worker_name Thinking (Live Stream) ---${C_RESET}"
    ensure_ollama_server
    local response; response=$("$OLLAMA_BIN" run "$model" "${system_prompt}\n${conversation_history}" 2>&1 | tee /dev/tty)
    echo -e "${C_YELLOW}--- End of $worker_name Thought ---${C_RESET}"
    echo "$response"
}

run_triumvirate_agent() {
    local user_prompt="$*"
    
    # --- PROJECTION PHASE ---
    log_worker "SYSTEM: Generating Cognitive Projection"
    local task_id; task_id=$(generate_projection "$user_prompt")
    local task_dir="$PROJECTS_DIR/$task_id"
    mkdir -p "$task_dir"
    echo "$task_id" >> "$CHAIN_LOG" # Add to chain for resonance
    log_success "Task ID (Projection): $task_id"
    log_success "Workspace created: $task_dir"

    # --- RESONANCE PHASE ---
    local resonance_context; resonance_context=$(tail -n 10 "$CHAIN_LOG")

    # --- MESSENGER PHASE ---
    local messenger_prompt="You are the Messenger. Your job is to gather raw information using the available tools. Be fast and efficient.
TOOLS: \`list_directory <path>\`, \`web_search <query>\`
Analyze the user's request and use your tools to collect initial data."
    local messenger_response; messenger_response=$(run_worker "MESSENGER" "$MESSENGER_MODEL" "$messenger_prompt" "User Request: ${user_prompt}")

    # --- COMBINATOR PHASE ---
    local combinator_prompt="You are the Combinator. You are a creative coder. Your job is to take the user's request and the Messenger's raw data, then brainstorm multiple potential solutions and code snippets. Don't worry about being perfect; focus on generating diverse ideas."
    local combinator_context="User Request: ${user_prompt}\n--- Messenger's Report ---\n${messenger_response}"
    local combinator_response; combinator_response=$(run_worker "COMBINATOR" "$COMBINATOR_MODEL" "$combinator_prompt" "$combinator_context")
    
    # --- TRADER PHASE ---
    local trader_prompt="You are the Trader. You are the final executive decision-maker. Your job is to analyze the user's request, the Messenger's raw data, and the Combinator's creative ideas.
You must also consider the historical 'resonance' of past tasks.
Your final output MUST be a single, logical, optimal plan of action formatted with [FINAL_ANSWER] at the end, ready for evaluation by an external system like Gemini."
    local trader_context="User Request: ${user_prompt}\n--- Messenger's Report ---\n${messenger_response}\n--- Combinator's Ideas ---\n${combinator_response}\n--- Task Resonance (Recent Task History) ---\n${resonance_context}"
    local trader_response; trader_response=$(run_worker "TRADER" "$TRADER_MODEL" "$trader_prompt" "$trader_context")
    
    # --- TRIGGER EVALUATION PHASE ---
    if echo "$trader_response" | grep -q '\[FINAL_ANSWER\]'; then
        log_success "Trader has produced the final actionable answer."
        local final_answer_payload; final_answer_payload=$(echo "$trader_response" | sed -n '/\[FINAL_ANSWER\]/,$p' | sed '1d' | sed 's/^[ \t]*//' | jq -sR .)
        
        echo
        log_info "The final answer is ready for evaluation by Gemini."
        printf "${C_BOLD}${C_GREEN}To evaluate, run the following command:${C_RESET}\n"
        printf "${C_CYAN}echo %s | gcloud ai-platform models predict --model gemini-pro --region us-central1 --json-request=-\n" "$final_answer_payload"
        echo
    else
        log_warn "The Trader did not produce a [FINAL_ANSWER]. The task may be incomplete."
    fi
}

# --- HELP & MAIN DISPATCHER ---
show_help() {
    printf "${C_BOLD}${C_CYAN}AI Agent v8.0 - The Triumvirate Mind Edition${C_RESET}\n\n"
    printf "An agent that uses a multi-worker cognitive system to solve complex tasks.\n\n"
    printf "${C_BOLD}${C_YELLOW}USAGE:${C_RESET}\n"
    printf "  ${C_GREEN}ai${C_RESET} \"Your high-level goal or project idea\"\n"
    printf "  ${C_GREEN}ai --seed${C_RESET} \"your bip39 phrase\" \"Your goal...\"\n"
    printf "  The agent will use its three workers (Messenger, Combinator, Trader) to create a final plan.\n\n"
    printf "${C_BOLD}${C_YELLOW}UTILITY:${C_RESET}\n"
    printf "  ${C_GREEN}ai --setup${C_RESET}              Install all required dependencies.\n"
    printf "  ${C_GREEN}ai --help${C_RESET}               Show this help message.\n"
}

main() {
    check_dependencies ollama curl jq tree lynx
    if [[ $# -eq 0 ]]; then show_help && exit 0; fi

    local seed_phrase=""
    if [[ "$1" == "--seed" ]]; then
        if [[ $# -lt 3 ]]; then log_error "Usage: ai --seed <phrase> \"<prompt>\""; fi
        export AI_SEED="$2"
        shift 2
        log_info "Task seeded with user reflection."
    fi

    case "$1" in
        --setup)
            log "Installing dependencies...";
            if command -v apt-get &>/dev/null; then sudo apt-get update && sudo apt-get install -y tree jq; fi
            log_success "Setup complete.";;
        --help) show_help ;;
        *)
            run_triumvirate_agent "$@"
            ;;
    esac
}

main "$@"