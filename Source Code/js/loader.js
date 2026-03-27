/**
 * Filename: loader.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-26
 * License: MIT
 *
 * Tech Stack: JavaScript (DOM Orchestration)
 *
 * Description: 
 * Initialization sequence controller for the terminal workspace. 
 * Orchestrates kernel-level status updates and view transitions.
 */

class TerminalLoader {
    constructor(loaderId, statusId) {
        this.loader = document.getElementById(loaderId);
        this.statusText = document.getElementById(statusId);
    }

    async boot() {
        if (!this.loader || !this.statusText) return Promise.resolve();

        const bootSteps = [
            { text: "INITIALIZING KERNEL...", progress: 25 },
            { text: "MOUNTING REGISTRY...", progress: 50 },
            { text: "CALIBRATING SYMMETRY...", progress: 85 },
            { text: "TECHNICAL SYNC COMPLETE.", progress: 100 }
        ];

        let currentProgress = 0;
        for (const step of bootSteps) {
            // Animate progress to target for this step
            while (currentProgress < step.progress) {
                currentProgress++;
                this.statusText.innerHTML = `${step.text} <span class="loader-percent">(${currentProgress}%)</span>`;
                // Variable speed for realistic 'processing' feel
                const jitter = Math.random() * 20;
                await this.delay(10 + jitter);
            }
            await this.delay(400); // Brief pause on milestone
        }

        await this.delay(200);
        this.loader.classList.add('hidden');
        return this.delay(600); 
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
