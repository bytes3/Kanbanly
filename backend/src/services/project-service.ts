import { Account } from "@/backend/core/entity/account";
import { Project } from "@/backend/core/entity/project";
import { ProjectRepository } from "@/backend/core/repositories/project-repository";
import { ProjectService } from "@/backend/core/services/project-service";
import { CommonCreateResult } from "@/backend/core/utils/common";
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
        id: result.id,
        name: result.name,
        createdAt: result.created_at
      };
    } catch (error: any) {
      handleServerError(ProjectCreationMessage.serverError, error);
    }
  }
}
