#!/usr/bin/env bash
# Universal Git Build Script v1.0
# Clones or updates a Git repository, detects the project type,
# installs dependencies, runs the build, and packages the output.

set -e
set -o pipefail
set -u

# --- 📜 CONFIGURATION 📜 ---
# Change these variables to build any Git project.
GIT_REPO_URL="git@github.com:Loopshape/CODERS-AGI.git"
GIT_BRANCH="main"

# The directory where the source code will be cloned/updated.
PROJECT_DIR="coders-agi-src"

# The final directory where build artifacts will be placed.
BUILD_DIR="build_output"

# Set to "true" to create a compressed archive of the build output.
CREATE_ARCHIVE="true"
# --- END OF CONFIGURATION ---

# --- Colors and Formatting ---
C_RESET='\033[0m'
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[0;33m'
C_BLUE='\033[0;34m'
C_BOLD='\033[1m'

# --- Helper Functions ---
log_header() { echo -e "\n${C_BLUE}${C_BOLD}--- $1 ---${C_RESET}"; }
log_info() { echo -e "${C_BLUE}INFO:${C_RESET} $1"; }
log_success() { echo -e "${C_GREEN}SUCCESS:${C_RESET} $1"; }
log_warn() { echo -e "${C_YELLOW}WARN:${C_RESET} $1"; }
log_error() { echo -e "${C_RED}ERROR:${C_RESET} $1"; exit 1; }

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log_error "'$1' is not installed but is required for this build. Please install it and re-run."
    fi
}

# --- Main Build Logic ---
main() {
    log_header "BUILD PROCESS STARTED"
    log_info "Repository: $GIT_REPO_URL"
    log_info "Branch: $GIT_BRANCH"
    log_info "Project Directory: $PROJECT_DIR"
    log_info "Final Build Directory: $BUILD_DIR"

    # 1. Dependency Check
    check_command "git"

    # 2. Clone or Update Repository
    if [ -d "$PROJECT_DIR" ]; then
        log_header "UPDATING EXISTING REPOSITORY"
        cd "$PROJECT_DIR"
        
        # Ensure it's the correct repository
        local current_url
        current_url=$(git config --get remote.origin.url)
        if [[ "$current_url" != "$GIT_REPO_URL" ]]; then
            log_error "Directory '$PROJECT_DIR' exists but is not for the correct repository.\nExpected: '$GIT_REPO_URL'\nFound: '$current_url'"
        fi

        log_info "Fetching latest changes from origin..."
        git fetch --all --prune
        log_info "Checking out and resetting '$GIT_BRANCH' branch..."
        git checkout -f "$GIT_BRANCH"
        git reset --hard "origin/$GIT_BRANCH"
        log_info "Pulling latest updates..."
        git pull
        cd ..
    else
        log_header "CLONING NEW REPOSITORY"
        git clone --branch "$GIT_BRANCH" "$GIT_REPO_URL" "$PROJECT_DIR"
    fi
    log_success "Source code is up to date."

    # Enter project directory for subsequent steps
    cd "$PROJECT_DIR"

    # 3. Detect Project Type and Install Dependencies
    log_header "INSTALLING DEPENDENCIES"
    if [ -f "package.json" ]; then
        log_info "Node.js project detected (found package.json)."
        check_command "npm"
        log_info "Running 'npm install'..."
        npm install
        log_success "Node.js dependencies installed."

    elif [ -f "requirements.txt" ]; then
        log_info "Python project detected (found requirements.txt)."
        check_command "python3"
        check_command "pip"
        
        if [ ! -d "venv" ]; then
            log_info "Creating Python virtual environment..."
            python3 -m venv venv
        fi
        
        log_info "Activating virtual environment and installing dependencies..."
        # shellcheck source=/dev/null
        source venv/bin/activate
        pip install -r requirements.txt
        deactivate
        log_success "Python dependencies installed in 'venv'."
    else
        log_warn "Could not detect project type (no package.json or requirements.txt). Skipping dependency installation."
    fi

    # 4. Run Build Command
    log_header "RUNNING BUILD SCRIPT"
    local build_source_dir="." # Default to current dir
    if [ -f "package.json" ] && jq -e '.scripts.build' package.json > /dev/null; then
        log_info "Build script found in package.json. Running 'npm run build'..."
        npm run build
        
        # Common build output directories for Node projects
        if [ -d "dist" ]; then
            build_source_dir="dist"
        elif [ -d "build" ]; then
            build_source_dir="build"
        elif [ -d "public" ]; then
            build_source_dir="public"
        fi
        log_success "Build completed. Artifacts are in './$build_source_dir'."
    else
        log_warn "No standard build script found. Assuming no build step is necessary."
    fi
    
    # Go back to the root directory
    cd ..

    # 5. Package for Deployment
    log_header "PACKAGING ARTIFACTS"
    log_info "Cleaning up previous build output..."
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"

    log_info "Copying artifacts from '$PROJECT_DIR/$build_source_dir' to '$BUILD_DIR'..."
    # Use rsync for robust copying
    rsync -a --delete "$PROJECT_DIR/$build_source_dir/" "$BUILD_DIR/"
    log_success "Artifacts packaged in '$BUILD_DIR'."

    if [[ "$CREATE_ARCHIVE" == "true" ]]; then
        local archive_name="${PROJECT_DIR}_$(date +%Y%m%d-%H%M%S).tar.gz"
        log_info "Creating compressed archive: '$archive_name'..."
        tar -czf "$archive_name" -C "$BUILD_DIR" .
        log_success "Archive created."
    fi

    # --- Final Summary ---
    echo -e "\n${C_GREEN}${C_BOLD}--- BUILD SUCCEEDED ---${C_RESET}"
    echo "The project '$PROJECT_DIR' has been successfully built."
    echo "Final deployable artifacts are located in: ${C_YELLOW}${BUILD_DIR}/${C_RESET}"
    if [[ "$CREATE_ARCHIVE" == "true" ]]; then
        echo "A compressed archive is available at: ${C_YELLOW}${archive_name}${C_RESET}"
    fi
    echo ""
}

# --- Script Entry Point ---
main "$@"
