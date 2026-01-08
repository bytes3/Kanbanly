import { beforeEach, describe, expect, it } from "bun:test";
import { createTestContext, type MockedProjectRepository } from "../test/utils";
import { IProjectService } from "./project-service";
import { ProjectNotFound } from "../errors/errors";

describe("Project service", () => {
  let projectRepository: MockedProjectRepository;
  let projectService: IProjectService;
  let entities: any;

  beforeEach(() => {
    const testContext = createTestContext();

    projectRepository = testContext.projectRepository;
    entities = testContext.entities;
    projectService = new IProjectService(projectRepository);
  });

  describe("create()", () => {
    it("should create a project", async () => {
      const { initProject } = entities;

      const result = await projectService.create(initProject);

      expect(result).toEqual({
        id: "project-id",
        name: initProject.name,
        createdAt: initProject.createdAt!
      });
    });
  });

  describe("getDefaultProject()", () => {
    it("should get the default project", async () => {
      const expectedError = new ProjectNotFound();
      projectRepository.getMainProject.mockResolvedValue(null);

      expect(async () => {
        await projectService.getDefaultProject();
      }).toThrow(expectedError);
      expect(projectRepository.getMainProject).toBeCalled();
    });
  });
});
