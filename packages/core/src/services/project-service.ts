import type { Project } from "../entity";
import type { CommonCreateResult } from "../utils";

export interface ProjectService {
  create: (project: Project) => Promise<CommonCreateResult>;
}
