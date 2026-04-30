# Task Management Extension Design

**Date:** 2026-05-01  
**Status:** Brainstorming Complete

## Overview

Create a PI extension that integrates [task-cli](https://github.com/svystunov/task-cli) - a CLI tool for managing tasks with support for assignees, tags, and comments.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PI User                                  │
│  (asks to create/list/edit tasks)                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              PI Skill (skills/tasks/SKILL.md)               │
│  - Documents available task-cli commands                    │
│  - Provides usage examples                                  │
│  - Explains options and filters                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              task-cli (npm package)                          │
│  - Executes actual CLI commands                             │
│  - Manages .task/ directory                                 │
│  - Handles file storage and parsing                         │
└─────────────────────────────────────────────────────────────┘
```

## Package Structure

```
pi-task-cli-extension/
├── package.json           # PI package manifest
├── tsconfig.json          # TypeScript config
├── README.md              # Extension documentation
├── docs/                  # Design docs
│   └── README.md
└── skills/
    └── tasks/
        └── SKILL.md       # PI skill documentation
```

## Key Decisions

1. **No custom implementation** - The skill only documents and exposes existing task-cli commands
2. **Declarative skill** - Uses markdown documentation to teach PI about task-cli capabilities
3. **Project-local storage** - Tasks stored in `.task/` folder per project
4. **Leverage existing tool** - Uses task-cli's built-in file structure and commands

## Implementation Plan

1. Create PI package structure with `package.json`
2. Create skill documentation in `skills/tasks/SKILL.md`
3. Add README with installation instructions
4. Test the extension with `pi -e .`

## Next Steps

- [ ] Run `npm install` to install task-cli dependency
- [ ] Test the extension locally
- [ ] Commit changes to git
- [ ] Share with PI for testing