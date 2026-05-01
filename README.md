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
# PI Package for Factory
## PI Package for Factory
