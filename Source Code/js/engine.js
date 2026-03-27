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
        
        // Randomization State
        this.shuffledVerbs = [];
        this.currentIndex = -1;
    }

    init() {
        if (!this.verbContainer || !this.dotsContainer || !this.wrapper) return;
        this.isActive = true;
        this.executeSimulationCycle();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Fisher-Yates Shuffle implementation
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    getNextVerb() {
        if (typeof CLAUDE_VERBS === 'undefined') return 'Thinking';
        
        // Initialize or reshuffle if we've reached the end
        if (this.currentIndex === -1 || this.currentIndex >= this.shuffledVerbs.length) {
            const lastVerb = this.shuffledVerbs.length > 0 ? this.shuffledVerbs[this.shuffledVerbs.length - 1] : null;
            
            this.shuffledVerbs = this.shuffleArray(CLAUDE_VERBS);
            this.currentIndex = 0;
            
            // Prevent immediate repeat if the new first verb is the same as the last verb
            if (lastVerb && this.shuffledVerbs[0] === lastVerb && this.shuffledVerbs.length > 1) {
                [this.shuffledVerbs[0], this.shuffledVerbs[1]] = [this.shuffledVerbs[1], this.shuffledVerbs[0]];
            }
        }
        
        const verb = this.shuffledVerbs[this.currentIndex];
        this.currentIndex++;
        return verb;
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
            
            const targetState = this.getNextVerb();
            
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
