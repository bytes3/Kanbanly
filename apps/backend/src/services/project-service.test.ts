import { describe, expect, it } from "bun:test";
import { createTestContext } from "../test/utils";
import { IProjectService } from "./project-service";

describe("Project service", () => {
  describe("create()", () => {
    it("should create a project", async () => {
      const { projectRepository, project } = createTestContext();
      const projectService = new IProjectService(projectRepository);

      const result = await projectService.create(project);

      expect(result).toEqual({
        id: "project-id",
        name: project.name,
        createdAt: project.createdAt!
      });
    });
  });
});
