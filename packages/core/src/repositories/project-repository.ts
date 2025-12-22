import type { Project } from "../entity";
import type { CommonCreateResult } from "../utils";

export interface CreateProjectParams {
  projectName: string;
  projectDescription: string;
  boardName: string;
  boardList: string[];
}

export interface ProjectRepository {
  create: (params: CreateProjectParams) => Promise<CommonCreateResult>;
  getMainProject: () => Promise<Project | null>;
}
