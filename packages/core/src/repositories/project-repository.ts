import type { Project } from "../entity";

export interface ProjectRepository {
  create: (project: Project) => Promise<Project>;
}
