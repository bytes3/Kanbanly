import { describe, beforeEach, it, expect } from "bun:test";
import { IProjectService } from "./project-service";
import { createTestContext } from "../test/utils";

describe("Project service", () => {
  describe("create()", () => {
    it("should create a project", async () => {
      const { projectRepository, project, account } = createTestContext();
      const projectService = new IProjectService(projectRepository);

      const result = await projectService.create(project);

      expect(result).toEqual({
        id: "id",
        name: project.name,
        createdAt: project.createdAt
      });
    });
  });
});
