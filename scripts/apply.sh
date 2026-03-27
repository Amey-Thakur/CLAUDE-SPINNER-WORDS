#!/bin/bash

# Claude Spinner Theme Injector (Unix/macOS)
# Usage: ./apply.sh ../themes/sci-fi.json

THEME_FILE=$1
SETTINGS_PATH="$HOME/.claude/settings.json"

if [ -z "$THEME_FILE" ]; then
    echo "Usage: ./apply.sh <theme_file>"
    exit 1
fi

if [ ! -f "$THEME_FILE" ]; then
    echo "Error: Theme file not found at $THEME_FILE"
    exit 1
fi

mkdir -p "$(dirname "$SETTINGS_PATH")"

if [ ! -f "$SETTINGS_PATH" ]; then
    echo "{}" > "$SETTINGS_PATH"
fi

THEME_JSON=$(cat "$THEME_FILE")

# Use jq if available for safe JSON manipulation
if command -v jq >/dev/null 2>&1; then
    TEMP_FILE=$(mktemp)
    jq --argjson verbs "$THEME_JSON" '.spinner = {"mode": "replace", "verbs": $verbs}' "$SETTINGS_PATH" > "$TEMP_FILE" && mv "$TEMP_FILE" "$SETTINGS_PATH"
else
    echo "Warning: jq is not installed. Manual installation recommended for safe JSON manipulation."
    echo "Note: This script requires jq for automated injection on Unix systems."
fi

echo "Success: Theme applied to $SETTINGS_PATH"
echo "Restart Claude Code to see changes."
