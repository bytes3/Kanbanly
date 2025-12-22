import type { InitProject } from "core/entity";
import type { ProjectRepository } from "core/repositories";
import type { ProjectService } from "core/services";
import type { CommonCreateResult } from "core/utils";
import { handleServerError } from "../utils/handleServerErrors";
import { ProjectCreationMessage } from "../utils/server-message";

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
}
