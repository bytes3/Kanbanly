import type { InitProject, Project } from "core/entity";
import type { ProjectRepository } from "core/repositories";
import type { ProjectService } from "core/services";
import type { CommonCreateResult } from "core/utils";
import { handleServerError } from "../utils/handleServerErrors";
import { ProjectCreationMessage } from "../utils/server-message";
import { ProjectNotFound, UserError } from "../errors/errors";

export class IProjectService implements ProjectService {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async create(project: InitProject): Promise<CommonCreateResult> {
    try {
      const result = await this.projectRepository.create({
        projectName: project.name,
        projectDescription: project.description,
        boardName: project.board.name,
        boardList: project.board.listNames
      });

      return {
        id: result.id,
        name: result.name,
        createdAt: result.createdAt
      };
    } catch (error: any) {
      handleServerError(ProjectCreationMessage.serverError, error);
    }
  }

  async getDefaultProject(): Promise<Project | null> {
    try {
      const result = await this.projectRepository.getMainProject();

      if (!result) {
        throw new ProjectNotFound();
      }

      return result;
    } catch (error: any) {
      if (error instanceof UserError) {
        throw error;
      }

      handleServerError("Failed to get default project", error);
    }
  }
}
