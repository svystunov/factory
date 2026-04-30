# PI Extension for task-cli

This directory contains a PI extension that integrates the task-cli tool for task management.

## Structure

- `package.json` - Package manifest with PI configuration
- `tsconfig.json` - TypeScript configuration
- `skills/tasks/SKILL.md` - PI skill that exposes task-cli commands
- `README.md` - This file

## How It Works

The extension provides a PI skill that wraps task-cli commands. When you use task-related commands in PI, it will use the task-cli tool under the hood.

## Installation

```bash
pi install git:github.com/svystunov/task-cli
```

## Development

To develop this extension:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Modify the skill in `skills/tasks/SKILL.md`
4. Test with `pi -e .`

## License

ISC