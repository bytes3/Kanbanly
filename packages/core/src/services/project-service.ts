import type { InitProject } from "../entity";
import type { CommonCreateResult } from "../utils";

export interface ProjectService {
  create: (project: InitProject) => Promise<CommonCreateResult>;
}
