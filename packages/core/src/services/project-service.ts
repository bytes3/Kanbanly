import type { InitProject, Project } from "../entity";
import type { CommonCreateResult } from "../utils";

export interface ProjectService {
  create: (project: InitProject) => Promise<CommonCreateResult>;
  getDefaultProject: () => Promise<Project | null>;
}
