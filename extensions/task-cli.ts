import { Extension } from "@mariozechner/pi-ai";
import { spawn } from "child_process";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execAsync = promisify(exec);

// Check if task-cli is available
async function checkTaskCliAvailable(): Promise<boolean> {
  try {
    await execAsync("which task");
    return true;
  } catch {
    return false;
  }
}

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
        // Check if task-cli is available
        const isAvailable = await checkTaskCliAvailable();
        if (!isAvailable) {
          return {
            success: false,
            message: "task-cli is not installed. Please install it first with: npm install -g task-cli",
          };
        }

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
