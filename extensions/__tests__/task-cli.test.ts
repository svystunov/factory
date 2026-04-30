import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { taskCliExtension } from "../task-cli";

describe("taskCliExtension", () => {
  describe("extension metadata", () => {
    it("should have correct name", () => {
      expect(taskCliExtension.name).toBe("task-cli");
    });

    it("should have correct description", () => {
      expect(taskCliExtension.description).toBe("Task Management CLI extension for PI");
    });

    it("should have correct version", () => {
      expect(taskCliExtension.version).toBe("0.1.0");
    });
  });

  describe("init", () => {
    it("should register task skill", () => {
      const mockPi = {
        registerSkill: jest.fn(),
      };

      taskCliExtension.init(mockPi as any);

      expect(mockPi.registerSkill).toHaveBeenCalledWith(
        "task",
        expect.stringContaining("skills/tasks/SKILL.md")
      );
    });
  });

  describe("commands", () => {
    it("should have task command", () => {
      const taskCommand = taskCliExtension.commands?.find((c) => c.name === "task");
      expect(taskCommand).toBeDefined();
      expect(taskCommand?.description).toBe("Task management commands via task-cli");
    });
  });
});
