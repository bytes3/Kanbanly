import type { Board, BoardList, BoardListItem, SessionInfo } from "core/entity";
import type { BoardRepository } from "core/repositories";
import sql from "../db/instance";

export class IBoardRepository implements BoardRepository {
  private sessionInfo: SessionInfo;

  constructor(sessionInfo: SessionInfo) {
    this.sessionInfo = sessionInfo;
  }

  async getBoardsByProjectId(projectId: string): Promise<Board[]> {
    const queryResult = await sql`
      SELECT *
        FROM project_board
      WHERE
        project_board.project_id = ${projectId}

        AND EXISTS (
          SELECT 1
          FROM project
          WHERE project.id = project_board.project_id
            AND project.account_id = ${this.sessionInfo.accountId}
        );
    `;

    return parseBoards(queryResult);
  }

  async getBoardListsByBoardId(
    projectId: string,
    boardId: string
  ): Promise<BoardList[]> {
    const queryResult = await sql`
      SELECT *
        FROM board_list
      WHERE
        board_list.project_board_id = ${boardId}

        AND EXISTS (
          SELECT 1
          FROM project_board
            JOIN project ON project.id = project_board.project_id
          WHERE project_board.id = board_list.project_board_id
            AND project.id = ${projectId}
            AND project.account_id = ${this.sessionInfo.accountId}
        );
    `;

    return parseBoardList(queryResult);
  }

  async getBoardListItemByBoardListId(
    projectId: string,
    boardId: string,
    boardListId: string
  ): Promise<BoardListItem[]> {
    const queryResult = await sql`
      SELECT *
        FROM board_list_item
      WHERE
        board_list_item.board_list_id = ${boardListId}

        -- validate hierarchy + ownership
        AND EXISTS (
          SELECT 1
          FROM board_list
            JOIN project_board ON project_board.id = board_list.project_board_id
            JOIN project ON project.id = project_board.project_id
          WHERE board_list.id = ${boardListId}
            AND project_board.id = ${boardId}
            AND project.id = ${projectId}
            AND project.account_id = ${this.sessionInfo.accountId}
        )
      ORDER BY board_list_item.position;
    `;

    return parseBoardListItem(queryResult);
  }
}

function parseBoards(queryResult: any[]): Board[] {
  return queryResult.map((board) => {
    return {
      id: board.id,
      projectId: board.project_id,
      name: board.name,
      isDefault: board.is_default,
      position: board.position,
      createdAt: board.created_at,
      updatedAt: board.updated_at
    };
  });
}

function parseBoardList(queryResult: any[]): BoardList[] {
  return queryResult.map((boardList) => {
    return {
      id: boardList.id,
      boardId: boardList.board_id,
      name: boardList.name,
      position: boardList.position,
      createdAt: boardList.created_at,
      updatedAt: boardList.updated_at
    };
  });
}

function parseBoardListItem(queryResult: any[]): BoardListItem[] {
  return queryResult.map((boardListItem) => {
    return {
      id: boardListItem.id,
      boardListId: boardListItem.board_list_id,
      title: boardListItem.title,
      description: boardListItem.description,
      position: boardListItem.position,
      createdAt: boardListItem.created_at,
      updatedAt: boardListItem.updated_at,
      completedAt: boardListItem.completed_at
    };
  });
}
