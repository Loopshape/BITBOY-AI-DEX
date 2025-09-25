#!/usr/bin/env bash
set -eu
IFS=$'\n\t'

# -----------------------
# USER CONFIG
# -----------------------
USER_HOME="${HOME:-/data/data/com.termux/files/home}"
BACKUP_DIR="$USER_HOME/.ai_backups"
mkdir -p "$BACKUP_DIR"

BITBOY_REPO="git@github.com:Loopshape/AI-BITBOY-DEX-202X.git"
CODERS_AGI_REPO="https://github.com/Loopshape/CODERS-AGI.git"
REPO_DIR="$USER_HOME/AI-BITBOY-DEX-202X"
OLLAMA_MODEL="2244-1"
OLLAMA_CMD="/home/linuxbrew/.linuxbrew/bin/ollama"

# -----------------------
# LOGGING HELPERS
# -----------------------
log_info()    { printf '\033[34m[*] %s\033[0m\n' "$*"; }
log_success() { printf '\033[32m[+] %s\033[0m\n' "$*"; }
log_warn()    { printf '\033[33m[!] %s\033[0m\n' "$*"; }
log_error()   { printf '\033[31m[-] %s\033[0m\n' "$*"; }

backup_file() {
    local file="$1"
    [ -f "$file" ] || return
    local ts=$(date +%Y%m%d%H%M%S)
    cp "$file" "$BACKUP_DIR/$(basename "$file").$ts.bak"
    log_info "Backup created: $file -> $BACKUP_DIR"
}

# -----------------------
# .bashrc ENFORCEMENT
# -----------------------
enforce_bashrc() {
    local bashrc="$USER_HOME/.bashrc"
    backup_file "$bashrc"
    cat > "$bashrc" <<'EOF'
# ~/.bashrc enforced by AI installer
export PATH="$HOME/bin:$PATH"
alias ai="$HOME/bin/ai"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
EOF
    log_success ".bashrc enforced"
}

# -----------------------
# PYTHON3 VIRTUALENV
# -----------------------
setup_python() {
    log_info "Setting up Python3 virtualenv..."
    python3 -m venv "$USER_HOME/env"
    source "$USER_HOME/env/bin/activate"
    pip install --upgrade pip
    log_success "Python3 virtualenv ready"
}

# -----------------------
# NVM + NODE LTS
# -----------------------
setup_nvm() {
    log_info "Installing NVM and Node.js LTS..."
    if [ ! -d "$USER_HOME/.nvm" ]; then
        git clone https://github.com/nvm-sh/nvm.git "$USER_HOME/.nvm"
    fi
    export NVM_DIR="$USER_HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

    nvm install --lts --no-progress
    nvm use --lts
    log_success "Node.js LTS installed via NVM"
}

# -----------------------
# REPO MANAGEMENT
# -----------------------
clone_or_pull() {
    local url="$1"
    local dir="$2"
    if [ ! -d "$dir/.git" ]; then
        log_info "Cloning $url -> $dir"
        git clone "$url" "$dir"
    else
        log_info "Pulling latest changes for $dir"
        cd "$dir" && git pull
    fi
}

# -----------------------
# OLLAMA HELPER
# -----------------------
run_ollama() {
    local prompt="$1"
    if [ ! -x "$OLLAMA_CMD" ]; then
        log_warn "Ollama CLI not found at $OLLAMA_CMD"
        return
    fi
    "$OLLAMA_CMD" run "$OLLAMA_MODEL" <<< "$prompt"
}

# -----------------------
# AI TOOL INSTALL
# -----------------------
install_ai_tool() {
    mkdir -p "$USER_HOME/bin"
    cp -f "$0" "$USER_HOME/bin/ai"
    chmod +x "$USER_HOME/bin/ai"
    log_success "AI tool installed at $USER_HOME/bin/ai"
}

# -----------------------
# MAIN
# -----------------------
log_info "[*] Starting full installer..."

enforce_bashrc
setup_python
setup_nvm

clone_or_pull "$BITBOY_REPO" "$REPO_DIR"
clone_or_pull "$CODERS_AGI_REPO" "$USER_HOME/CODERS-AGI"

install_ai_tool

log_success "[*] Installer complete. Use 'ai' to manage your environment."
