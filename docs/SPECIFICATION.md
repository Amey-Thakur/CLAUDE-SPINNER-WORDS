# Technical Specification: Claude Spinner Words

## Overview
This document outlines the technical architecture and implementation details for customizing the spinner verbs within the Claude Code CLI environment. 

## Architectural Design
Claude Code (v2.1.23+) utilizes a configuration-driven approach for UI state indicators. The spinner mechanism operates by cycling through a defined array of strings (verbs) during asynchronous task execution.

### Configuration Protocol
The customization is achieved via the `settings.json` file located in the user's configuration directory.

- **Windows Path**: `%USERPROFILE%\.claude\settings.json`
- **Unix/macOS Path**: `~/.claude/settings.json`

### Data Schema
The `spinner` object within `settings.json` follows this schema:

```json
{
  "spinner": {
    "mode": "replace" | "append",
    "verbs": string[]
  }
}
```

- **replace**: Overrides the internal "Tengu" verb list entirely.
- **append**: Integrates custom verbs into the existing internal registry.

## Implementation Heuristics
1. **Validation**: All verb collections must be stored as valid JSON arrays to ensure compatibility with the Claude Code parser.
2. **Persistence**: Changes to the configuration file are volatile and require a restart of the CLI process to synchronize state.
3. **Automation**: Shell scripts (PowerShell/Bash) are utilized to automate the `read-modify-write` cycle of the configuration file.

## Visual Identity
The Claude Code CLI maintains a distinct visual identity across different terminal environments. This registry supports both light and dark mode configurations.

| Light Mode Reference | Dark Mode Reference |
| :---: | :---: |
| ![Light Mode](../assets/claude-light.png) | ![Dark Mode](../assets/claude-dark.png) |

## Theme Registry
The repository categorizes verbs into functional and thematic indices to support diverse development workflows.
- **Official**: Located in the `official/` directory.
- **Thematic**: Located in the `themes/` directory.
