# Claude Spinner Words

[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-success)](https://github.com/Amey-Thakur/claude-spinner-words)
[![Developed by Amey Thakur](https://img.shields.io/badge/Developed%20by-Amey%20Thakur-blue.svg)](https://orcid.org/0000-0001-5644-1575)

[Technical Specification](docs/SPECIFICATION.md) | [Official Data](official/) | [Thematic Indices](themes/) | [Automation Scripts](scripts/)

## Abstract
Claude Spinner Words is a technical registry and automation suite designed for the Claude Code CLI environment. While the default Claude Code experience is whimsical, **Claude Spinner Words** was built to provide transparency and control over those hidden UI mechanics. This project includes official light and dark mode brand assets for visual consistency across environments. This project serves as a comprehensive collection of official state indicators and custom configuration datasets, enabling precise control over the terminal-based processing feedback loops.

## Technical Context
The Claude Code CLI utilizes a configuration-driven mechanism to display asynchronous state indicators (verbs) during operation. These indicators are defined within the internal configuration of the tool, historically referred to under the project designator "Tengu". This repository provides the necessary indices to implement sovereign customization of these feedback states.

## Key Features
- **Official Registry**: A complete index of the 90-verb set utilized by the production CLI.
- **Thematic Extensions**: Professionally curated collections for specific development environments (e.g., Professional, Sci-Fi).
- **Automation Pipelines**: Scripted configuration injection for Windows (PowerShell) and Unix (Bash).
- **System Analysis**: Detailed documentation of schema definitions and implementation heuristics.

## Repository Structure
- `official/`: Authentic datasets extracted from CLI binary audits.
- `themes/`: Curated indices for alternative aesthetic configurations.
- `scripts/`: Implementation tools for deterministic state updates.
- `docs/`: Technical specifications and architectural guidelines.
- `CITATION.cff`: Scholarly metadata for project attribution.

## Implementation Guide

### Automated Injection
To apply a selected index, utilize the provided shell scripts targeting the configuration directory (`~/.claude/settings.json` or equivalent).

**Windows:**
```powershell
.\scripts\apply.ps1 -ThemeFile ".\themes\sci-fi.json"
```

**Unix/macOS:**
```bash
./scripts/apply.sh ./themes/cyber-punk.json
```

## Methodology and Data Integrity
All datasets provided in this registry are mapped against the Claude Code internal schema. The transition history of these indicators has been audited across multiple versions of the CLI to ensure technical accuracy and longitudinal compatibility.

## Author
**Amey Thakur**  
[ORCID: 0000-0001-5644-1575](https://orcid.org/0000-0001-5644-1575)  
Independent Researcher in CLI State Management.

## License
Distributed under the MIT License. See `LICENSE` for further details.
