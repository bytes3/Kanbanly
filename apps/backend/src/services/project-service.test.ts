import { describe, expect, it } from "bun:test";
import { createTestContext } from "../test/utils";
import { IProjectService } from "./project-service";

describe("Project service", () => {
  describe("create()", () => {
    it("should create a project", async () => {
      const { projectRepository, entities } = createTestContext();
      const { initProject } = entities;
      const projectService = new IProjectService(projectRepository);

      const result = await projectService.create(initProject);

      expect(result).toEqual({
        id: "project-id",
        name: initProject.name,
        createdAt: initProject.createdAt!
      });
    });
  });
});
