# PI Task CLI Extension

A PI extension that integrates [task-cli](https://github.com/svystunov/task-cli) for task management directly within your PI workflow.

## Features

- Create, list, edit, and delete tasks
- Assign tasks to team members
- Add comments to tasks
- Track task status and priority
- Due date management

## Installation

```bash
pi install git:github.com/svystunov/task-cli
```

Or for project-specific installation:

```bash
pi install -l git:github.com/svystunov/task-cli
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

## Development

This extension wraps the task-cli tool. To modify the extension:

1. Clone this repository
2. Modify the skill in `skills/tasks/SKILL.md`
3. Update `package.json` if needed
4. Test with `pi -e .`

## License

ISC