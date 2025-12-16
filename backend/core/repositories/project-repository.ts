import {
  AccountQueryResult,
  ProjectQueryResult
} from "@/backend/src/db/query-results";
import { Project } from "../entity/project";

export interface ProjectRepository {
  create: (project: Project) => Promise<ProjectQueryResult>;
}
