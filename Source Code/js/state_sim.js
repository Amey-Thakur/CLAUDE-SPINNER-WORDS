/**
 * Filename: state_sim.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-26
 * License: MIT
 *
 * Tech Stack: Vanilla JavaScript (State Machine Pattern)
 *
 * Description: 
 * State management and real-time diagnostic orchestration for the Claude State Indicator Simulator.
 */

const DIAGNOSTIC_STATES = {
    idle: {
        color: '#555',
        label: 'IDLE',
        sub: 'ORCHESTRATION_SUSPENDED',
        log: 'Diagnostic module transitioned to IDLE. Registry standby.'
    },
    thinking: {
        color: '#ffbd2e',
        label: 'THINKING',
        sub: 'PLANNING_SEQUENCE_ACTIVE',
        log: 'State → THINKING. Analyzing architectural roadmap and tool constraints.'
    },
    running: {
        color: '#3b9eff',
        label: 'RUNNING',
        sub: 'EXECUTION_THREAD_SPAWNED',
        log: 'State → RUNNING. Spawning subprocess: technical_workstation_expansion.'
    },
    waiting: {
        color: '#27c93f',
        label: 'WAITING',
        sub: 'USER_VERIFICATION_REQUIRED',
        log: 'State → WAITING. Orchestration paused for external user approval.'
    },
    error: {
        color: '#ff5f56',
        label: 'ERROR',
        sub: 'SIMULATION_FAULT_DETECTED',
        log: 'State → ERROR. Non-zero exit code detected. Initializing stack audit.'
    }
};

let currentSimulationState = 'idle';

/**
 * Format timestamp for diagnostic log
 */
function getDiagTimestamp() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Append entry to the diagnostic event log
 */
function appendDiagLog(msg, highlight = false) {
    const logBox = document.getElementById('diag-log-body');
    if (!logBox) return;

    const row = document.createElement('div');
    row.className = 'log-row';
    row.innerHTML = `
        <span class="log-time">[${getDiagTimestamp()}]</span>
        <span class="log-body ${highlight ? 'highlight' : ''}">${msg}</span>
    `;
    
    logBox.appendChild(row);
    logBox.scrollTop = logBox.scrollHeight;
}

/**
 * Transition the diagnostic simulator to a new state
 */
function setDiagnosticState(stateId) {
    if (stateId === currentSimulationState) return;
    
    const config = DIAGNOSTIC_STATES[stateId];
    if (!config) return;

    currentSimulationState = stateId;

    // Update HUD (Status Bar)
    const hudDot = document.getElementById('hud-status-dot');
    const hudLabel = document.getElementById('hud-status-label');
    const hudSub = document.getElementById('hud-status-sub');

    if (hudDot && hudLabel && hudSub) {
        hudDot.style.background = config.color;
        hudDot.className = 'hud-dot'; // Reset animations
        
        if (stateId === 'thinking') hudDot.classList.add('dot-think');
        else if (stateId === 'running') hudDot.classList.add('dot-run');
        else if (stateId === 'error') hudDot.classList.add('dot-error');
        else hudDot.classList.add(`dot-${stateId}`);

        hudLabel.textContent = config.label;
        hudLabel.style.color = config.color;
        hudSub.textContent = `— ${config.sub}`;
    }

    // Update Legendary Index highlighting
    document.querySelectorAll('.state-entry').forEach(el => el.classList.remove('is-active'));
    document.getElementById(`entry-${stateId}`)?.classList.add('is-active');

    // Update Button Grid highlighting
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('is-selected'));
    document.getElementById(`btn-${stateId}`)?.classList.add('is-selected');

    // Log the event
    appendDiagLog(config.log, true);
}

/**
 * Seed the diagnostic log immediately
 */
function seedDiagnosticRegistry() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    appendDiagLog(`Diagnostic Registry v${dateStr} loaded successfully.`);
    appendDiagLog('Establishing secure channel to technical workstation...', false);
    appendDiagLog('Workstation verified. Current state: IDLE.', true);
}

/**
 * Initialize the diagnostic simulator interactivity
 */
function initDiagnosticSimulator() {
    // This now only handles interactivity/HUD setup if needed
    // The log is already seeded
}

// Global initialization hook
document.addEventListener('DOMContentLoaded', () => {
    // Seed the log immediately to ensure it's at the top
    seedDiagnosticRegistry();

    // Wait for the main boot loader to finish (stochastic delay) before allowing interactions
    setTimeout(initDiagnosticSimulator, 4500);
});
