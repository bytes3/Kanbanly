import type { Project } from "core/entity";
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

  async create(project: Project): Promise<CommonCreateResult> {
    try {
      const result = await this.projectRepository.create(project);

      return {
        id: result.id ?? "",
        name: result.name,
        createdAt: result.createdAt
      };
    } catch (error: any) {
      handleServerError(ProjectCreationMessage.serverError, error);
    }
  }
}
