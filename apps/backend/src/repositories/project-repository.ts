import type { SessionInfo } from "core/entity";
import type { CreateProjectParams, ProjectRepository } from "core/repositories";
import type { CommonCreateResult } from "core/utils";
import sql from "../db/instance";

export class IProjectRepository implements ProjectRepository {
  private sessionInfo: SessionInfo;

  constructor(sessionInfo: SessionInfo) {
    this.sessionInfo = sessionInfo;
  }

  async create(params: CreateProjectParams): Promise<CommonCreateResult> {
    const [queryResult] = await sql`
      SELECT * FROM fn_init_board(
        ${this.sessionInfo.accountId},
        ${params.projectName},
        ${params.projectDescription},
        ${params.boardName},
        ARRAY[${params.boardList.join(", ")}]
      );
    `;

    if (!queryResult) {
      throw new Error("Empty query result");
    }

    return {
      id: queryResult.project_id,
      name: queryResult.project_name,
      createdAt: queryResult.project_created_at
    };
  }
}
