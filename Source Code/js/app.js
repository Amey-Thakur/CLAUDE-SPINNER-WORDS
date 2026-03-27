/**
 * Filename: app.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-26
 * License: MIT
 *
 * Tech Stack: JavaScript (Application Orchestration)
 *
 * Description: 
 * Main application entry point. 
 * Synchronizes the initialization of the developer signature, boot loader, and simulation engine.
 */

window.addEventListener('load', async () => {
    // 1. Developer identity initialization
    if (typeof initializeConsoleSignature === 'function') {
        initializeConsoleSignature();
    }

    // 2. Terminal workspace initialization
    const loader = new TerminalLoader('terminal-boot-loader', 'boot-status');
    await loader.boot();

    // 3. Simulation engine initialization
    const engine = new ClaudeTypewriterEngine();
    engine.init();
});
