import { Project } from "../entity/project";
import { CommonCreateResult } from "../utils/common";

export interface ProjectService {
  create: (project: Project) => Promise<CommonCreateResult>;
}
