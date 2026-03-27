/**
 * Filename: engine.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-26
 * License: MIT
 *
 * Tech Stack: JavaScript (Asynchronous DOM Manipulation)
 *
 * Description: 
 * Core simulation engine for the Claude Thinking Simulator. 
 * Manages the asynchronous typewriter lifecycle and state transitions.
 */

class ClaudeTypewriterEngine {
    constructor(config = {}) {
        this.verbContainer = document.getElementById(config.verbId || 'verb-text');
        this.dotsContainer = document.getElementById(config.dotsId || 'dots');
        this.wrapper = document.getElementById(config.wrapperId || 'feedback-group');
        
        this.typingSpeed = config.typingSpeed || 45;    
        this.backspaceSpeed = config.backspaceSpeed || 25; 
        this.dotInterval = config.dotInterval || 550;   
        this.holdDuration = config.holdDuration || 2000; 
        
        this.isActive = false;
    }

    init() {
        if (!this.verbContainer || !this.dotsContainer || !this.wrapper) return;
        this.isActive = true;
        this.executeSimulationCycle();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async typeWrite(text) {
        for (const char of text) {
            this.verbContainer.innerText += char;
            await this.delay(this.typingSpeed);
        }
    }

    async backspace() {
        while (this.dotsContainer.innerText.length > 0) {
            this.dotsContainer.innerText = this.dotsContainer.innerText.slice(0, -1);
            await this.delay(this.backspaceSpeed);
        }
        while (this.verbContainer.innerText.length > 0) {
            this.verbContainer.innerText = this.verbContainer.innerText.slice(0, -1);
            await this.delay(this.backspaceSpeed);
        }
    }

    async executeSimulationCycle() {
        while (this.isActive) {
            this.verbContainer.innerText = '';
            this.dotsContainer.innerText = '';
            
            if (typeof CLAUDE_VERBS === 'undefined') {
                console.error('[ERR] Global registry data not found.');
                break;
            }

            const targetState = CLAUDE_VERBS[Math.floor(Math.random() * CLAUDE_VERBS.length)];
            
            await this.typeWrite(targetState);
            await this.delay(this.dotInterval);
            this.dotsContainer.innerText = '.';
            await this.delay(this.dotInterval);
            this.dotsContainer.innerText = '..';
            await this.delay(this.dotInterval);
            this.dotsContainer.innerText = '...';
            await this.delay(this.holdDuration);
            await this.backspace();
            await this.delay(400); 
        }
    }

    stop() {
        this.isActive = false;
    }
}
