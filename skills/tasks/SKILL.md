---
name: tasks
description: "Use this skill to manage tasks using the task-cli tool. Supports creating, listing, editing, assigning, and tracking tasks with comments."
---

> **Related skills:** Use `/skill:brainstorming` to plan task management features, then `/skill:writing-plans` for implementation.

# Task Management with task-cli

## Overview

This skill provides access to task-cli commands for managing tasks with assignees, tags, and comments. All task data is stored in a `.task` folder in your project.

## Available Commands

### Basic Operations

| Command | Description |
|---------|-------------|
| `task init` | Initialize task management in your project |
| `task add "description"` | Create a new task |
| `task list` | List all tasks |
| `task list --status <status>` | Filter tasks by status |
| `task show <id>` | Show task details |
| `task edit <id>` | Edit an existing task |
| `task delete <id>` | Delete a task |
| `task done <id>` | Mark a task as done |

### Assignment

| Command | Description |
|---------|-------------|
| `task assign <id> <user>` | Assign a task to a user |
| `task unassign <id>` | Remove assignment from a task |

### Comments

| Command | Description |
|---------|-------------|
| `task comment add <id> "text"` | Add a comment to a task |
| `task comment list <id>` | List comments for a task |
| `task comment show <id>` | Show a specific comment |
| `task comment edit <id> "text"` | Edit a comment |
| `task comment delete <id>` | Delete a comment |

## Options

- `-P, --priority <level>`: Priority (low/medium/high)
- `-a, --assignee <user>`: Assignee
- `-d, --due <date>`: Due date (YYYY-MM-DD)
- `-s, --status <status>`: Status (draft/ready_to_work/...)

## Usage Examples

```
# Initialize task management
task init

# Create a new task
task add "Implement user authentication" --priority high --assign me

# List all tasks
task list

# List high priority pending tasks
task list --status pending --priority high

# Show task details
task show 1

# Add a comment to a task
task comment add 1 "This is critical for the MVP" --author me

# Mark task as done
task done 1
```

## File Structure

Tasks are stored in a `.task` folder:

```
.task/
├── config/
│   ├── team.md
│   ├── statuses.md
│   └── priority.md
├── tasks/
│   ├── 00001-the-init-task-for-repo-initialization.md
│   ├── 00002-ci-cd-initial-configuration.md
│   └── ...
└── next_id.txt
```

## Key Principles

- **Use task-cli for all task operations** - Don't try to implement task logic yourself
- **Respect project structure** - Tasks are stored in `.task` folder
- **Filter when appropriate** - Use `task list` with filters instead of listing all tasks
- **Clear descriptions** - Encourage users to provide detailed task descriptions
