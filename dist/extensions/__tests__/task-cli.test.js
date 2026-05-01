import { describe, it, expect } from "@jest/globals";
import { taskCliExtension } from "./task-cli";
describe("taskCliExtension", () => {
    it("should be a valid extension factory", () => {
        expect(typeof taskCliExtension).toBe("function");
    });
});
