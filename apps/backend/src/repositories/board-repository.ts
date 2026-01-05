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
      SELECT * FROM board
        WHERE is_default = true AND 
              project_id = ${projectId};
    `;

    return parseBoards(queryResult);
  }

  async getBoardListsByBoardId(boardId: string): Promise<BoardList[]> {
    const queryResult = await sql`
      SELECT board_list.* FROM board_list
        LEFT JOIN project_board on project_board_id = project_board.id
        LEFT JOIN project on project_id = project.id
        LEFT JOIN account on account_id = account.id
      WHERE account_id = ${this.sessionInfo.accountId} AND
            project_board_id = ${boardId};
    `;

    return parseBoardList(queryResult);
  }

  async getBoardListItemByBoardListId(
    boardListId: string
  ): Promise<BoardListItem[]> {
    const queryResult = await sql`
      SELECT board_list_item.* FROM board_list_item
        LEFT JOIN board_list on board_list_id = board_list.id
        LEFT JOIN project_board on project_board_id = project_board.id
        LEFT JOIN project on project_id = project.id
        LEFT JOIN account on account_id = account.id
      WHERE account_id = ${this.sessionInfo.accountId} AND
            board_list_id = ${boardListId};
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
