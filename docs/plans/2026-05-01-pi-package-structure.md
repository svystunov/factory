# PI Package Structure Implementation Plan

> **REQUIRED SUB-SKILL:** Use the executing-plans skill to implement this plan task-by-task.

**Goal:** Convert the PI extension into a proper pi package with extensions directory, updating package.json with correct pi manifest and creating the task-cli extension.

**Architecture:** 
- Create `extensions/` directory with `task-cli.ts` extension
- Update `package.json` to include `extensions` in pi manifest
- Update documentation to reflect pi package structure
- Remove `typebox` from peerDependencies (not needed)

**Tech Stack:**
- TypeScript for extension
- PI coding agent APIs (`@mariozechner/pi-ai`)
- task-cli for task management

---

## Task 1: Update package.json with pi package manifest

**TDD scenario:** Trivial change - verify package.json structure

**Files:**
- Modify: `package.json`

**Step 1: Update package.json**

Replace the entire file content with:

```json
{
  "name": "pi-task-cli",
  "version": "0.1.0",
  "description": "PI package that integrates task-cli for task management",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "keywords": [
    "pi-package",
    "task",
    "cli",
    "extension"
  ],
  "pi": {
    "skills": ["skills"],
    "extensions": ["extensions"]
  },
  "dependencies": {
    "task-cli": "git:github.com/svystunov/task-cli.git"
  },
  "peerDependencies": {
    "@mariozechner/pi-ai": "*",
    "@mariozechner/pi-agent-core": "*",
    "@mariozechner/pi-coding-agent": "*",
    "@mariozechner/pi-tui": "*"
  },
  "devDependencies": {
    "typescript": "^5.8.3"
  }
}
```

**Step 2: Verify package.json**

Run: `cat package.json`
Expected: File contains correct pi manifest with `extensions` array

**Step 3: Commit**

```bash
git add package.json
git commit -m "refactor: update package.json with pi package manifest"
```

---

## Task 2: Create extensions directory and task-cli.ts

**TDD scenario:** New feature - create extension file

**Files:**
- Create: `extensions/task-cli.ts`

**Step 1: Create extensions directory**

```bash
mkdir -p extensions
```

**Step 2: Create extensions/task-cli.ts**

```typescript
import { Extension } from "@mariozechner/pi-ai";
import { spawn } from "child_process";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const taskCliExtension: Extension = {
  name: "task-cli",
  description: "Task Management CLI extension for PI",
  version: "0.1.0",
  init: async (pi) => {
    pi.registerSkill("task", join(__dirname, "../skills/tasks/SKILL.md"));
  },
  commands: [
    {
      name: "task",
      description: "Task management commands via task-cli",
      args: [
        {
          name: "command",
          description: "Task command to run (init, add, list, show, edit, delete, assign, unassign, comment, done)",
          required: true,
        },
      ],
      execute: async (args: string[]) => {
        try {
          const projectRoot = process.cwd();
          const taskPath = join(projectRoot, ".task");

          // Ensure .task directory exists
          try {
            await readFile(join(taskPath, "config", "statuses.md"));
          } catch {
            // Initialize if not exists
            const initArgs = ["task", "init"];
            const result = await runTaskCommand(initArgs);
            if (result.error) {
              return { success: false, message: `Failed to initialize: ${result.error}` };
            }
          }

          const commandArgs = ["task", ...args];
          const result = await runTaskCommand(commandArgs);

          if (result.error) {
            return { success: false, message: `Command failed: ${result.error}` };
          }

          return { success: true, message: result.stdout };
        } catch (error) {
          return { success: false, message: `Error: ${error}` };
        }
      },
    },
  ],
};

async function runTaskCommand(args: string[]): Promise<{ stdout: string; error: string | null }> {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";

    const child = spawn("node", args, {
      stdio: ["pipe", "pipe", "pipe"],
      cwd: process.cwd(),
    });

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, error: null });
      } else {
        resolve({ stdout, error: stderr || `Exit code: ${code}` });
      }
    });

    child.on("error", (error) => {
      resolve({ stdout, error: error.message });
    });
  });
}
```

**Step 3: Verify file exists**

Run: `ls -la extensions/task-cli.ts`
Expected: File exists with correct content

**Step 4: Commit**

```bash
git add extensions/task-cli.ts
git commit -m "feat: add task-cli extension"
```

---

## Task 3: Update README.md with accurate package information

**TDD scenario:** Trivial change - update documentation

**Files:**
- Modify: `README.md`

**Step 1: Update README.md**

Replace the entire file content with:

```markdown
# PI Task CLI Package

A PI package that integrates [task-cli](https://github.com/svystunov/task-cli) for task management directly within your PI workflow.

## Features

- Create, list, edit, and delete tasks
- Assign tasks to team members
- Add comments to tasks
- Track task status and priority
- Due date management
- Natural language task management through PI

## Installation

```bash
# Global installation
pi install git:github.com/svystunov/task-cli

# Project-specific installation
pi install -l git:github.com/svystunov/task-cli
```

Or using npm:

```bash
npm install git+https://github.com/svystunov/task-cli.git
```

## Usage

Once installed, you can use task-cli commands through the PI skill:

```
/task: Initialize task management
/task: Create a new task
/task: List all tasks
/task: Show task details
/task: Mark task as done
```

Or use the CLI directly:

```bash
task init
task add "Implement user authentication" --priority high
task list
task show 1
```

## PI Package Structure

This package follows the PI package specification:

```
├── package.json          # Package manifest with PI configuration
├── tsconfig.json         # TypeScript configuration
├── extensions/           # PI extensions
│   └── task-cli.ts       # Task CLI extension
├── skills/               # PI skills
│   └── tasks/            # Task management skill
│       └── SKILL.md
└── README.md             # This file
```

## Development

To develop this package:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Modify the extension in `extensions/task-cli.ts`
4. Modify the skill in `skills/tasks/SKILL.md`
5. Test with `pi -e .`
6. Build with `npm run build`

## License

ISC
```

**Step 2: Verify README.md**

Run: `cat README.md`
Expected: File contains correct pi package information

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README.md with pi package structure"
```

---

## Task 4: Update docs/README.md with package structure details

**TDD scenario:** Trivial change - update documentation

**Files:**
- Modify: `docs/README.md`

**Step 1: Update docs/README.md**

Replace the entire file content with:

```markdown
# PI Extension for task-cli

This directory contains a PI package that integrates the task-cli tool for task management.

## Structure

- `package.json` - Package manifest with PI configuration
- `tsconfig.json` - TypeScript configuration
- `extensions/` - PI extensions (loads `.ts` and `.js` files)
- `skills/tasks/SKILL.md` - PI skill that exposes task-cli commands
- `README.md` - This file

## How It Works

The package provides a PI extension and skill that wrap task-cli commands. When you use task-related commands in PI, it will use the task-cli tool under the hood.

## Installation

```bash
pi install git:github.com/svystunov/task-cli
```

## Development

To develop this package:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Modify the extension in `extensions/task-cli.ts`
4. Modify the skill in `skills/tasks/SKILL.md`
5. Test with `pi -e .`
6. Build with `npm run build`

## License

ISC
```

**Step 2: Verify docs/README.md**

Run: `cat docs/README.md`
Expected: File contains correct package structure information

**Step 3: Commit**

```bash
git add docs/README.md
git commit -m "docs: update docs/README.md with package structure"
```

---

## Task 5: Update skills/tasks/SKILL.md with installation documentation

**TDD scenario:** Trivial change - update documentation

**Files:**
- Modify: `skills/tasks/SKILL.md`

**Step 1: Update skills/tasks/SKILL.md**

Add the following after the header comment:

```markdown
> **Installation:** Install this pi package with `pi install git:github.com/svystunov/task-cli` or `pi install -l git:github.com/svystunov/task-cli` for project-specific installation.
```

Add the following section after the Usage Examples:

```markdown
## PI Integration

When using this skill through PI, you can use natural language to manage tasks:

```
/task: Create a new task for fixing the login bug
/task: List all high priority tasks
/task: Assign task 5 to John
/task: Add a comment to task 3
```

PI will translate these commands to the appropriate task-cli commands and execute them.
```

**Step 2: Verify skills/tasks/SKILL.md**

Run: `head -20 skills/tasks/SKILL.md`
Expected: File contains installation information

**Step 3: Commit**

```bash
git add skills/tasks/SKILL.md
git commit -m "docs: update SKILL.md with installation and PI integration"
```

---

## Task 6: Verify package structure

**TDD scenario:** New feature - verify package structure

**Files:**
- No file changes

**Step 1: Verify directory structure**

Run: `ls -la`
Expected: Output shows:
- `package.json`
- `tsconfig.json`
- `README.md`
- `docs/`
- `extensions/`
- `skills/`

**Step 2: Verify extensions directory**

Run: `ls -la extensions/`
Expected: Output shows `task-cli.ts`

**Step 3: Verify package.json pi manifest**

Run: `grep -A5 '"pi"' package.json`
Expected: Output shows:
```json
  "pi": {
    "skills": ["skills"],
    "extensions": ["extensions"]
  }
```

**Step 4: Commit**

```bash
git add .
git commit -m "refactor: verify pi package structure"
```

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-05-01-pi-package-structure.md`. Two execution options:

**1. Subagent-Driven (this session)** - Fresh subagent per task with two-stage review. Better for plans with many independent tasks.

**2. Parallel Session (separate)** - Batch execution with human review checkpoints. Better when tasks are tightly coupled or you want more control between batches.

**Which approach?**
