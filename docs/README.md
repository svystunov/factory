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
