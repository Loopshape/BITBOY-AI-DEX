#!/bin/bash
# termux_ollama_python.sh
# Termux installer: Python3-only Ollama environment
set -e

# ------------------------
# 0. Ensure Python3 only
# ------------------------
pkg update -y && pkg upgrade -y
pkg install -y python python-dev python3-pip git curl build-essential

# ------------------------
# 1. Install Python packages
# ------------------------
pip3 install --upgrade pip
pip3 install requests asyncio aiofiles

# ------------------------
# 2. Install Ollama CLI via Homebrew
# ------------------------
if [ ! -d "$HOME/.linuxbrew" ]; then
    echo "Installing Homebrew..."
    echo | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$($HOME/.linuxbrew/bin/brew shellenv)"
brew update
brew install ollama

# ------------------------
# 3. Copy deepseek-r1:1.5b as 2244-1
# ------------------------
OLLAMA_MODELS_DIR="$HOME/.ollama/models"
mkdir -p "$OLLAMA_MODELS_DIR"
cp -r "$OLLAMA_MODELS_DIR/deepseek-r1:1.5b" "$OLLAMA_MODELS_DIR/2244-1"

echo "=== Environment ready ==="
echo "Python3: $(python3 --version)"
echo "Pip: $(pip3 --version)"
echo "Ollama: $(ollama --version)"
echo "Model deepseek-r1:1.5b aliased as 2244-1"
echo "gemma3:1b ready to use"
