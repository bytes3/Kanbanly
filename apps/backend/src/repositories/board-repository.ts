import type { Board, BoardList, BoardListItem } from "core/entity";
import type { BoardRepository } from "core/repositories";
import sql from "../db/instance";

export class IBoardRepository implements BoardRepository {
  async getBoadByDefaultBoardByProjectId(
    projectId: string
  ): Promise<Board | null> {
    const [queryResult] = await sql`
      SELECT * FROM beard
        WHERE is_default = true AND 
              project_id = ${projectId};
    `;

    if (!queryResult) {
      return null;
    }

    return parseBoard(queryResult);
  }

  async getBoardListsByBoardId(boardId: string): Promise<BoardList[] | null> {
    const queryResult = await sql`
      SELECT * FROM BoardList
        WHERE board_id = ${boardId};
    `;

    if (queryResult.length <= 0) {
      return null;
    }

    return parseBoardList(queryResult);
  }

  async getBoardListItemByBoardListId(
    boardListId: string
  ): Promise<BoardListItem[] | null> {
    const queryResult = await sql`
      SELECT * FROM BoardListItem
        WHERE board_list_id = ${boardListId};
    `;

    if (queryResult.length <= 0) {
      return null;
    }

    return parseBoardListItem(queryResult);
  }
}

function parseBoard(queryResult: any): Board {
  return {
    id: queryResult.id,
    projectId: queryResult.project_id,
    name: queryResult.name,
    isDefault: queryResult.is_default,
    position: queryResult.position,
    createdAt: queryResult.created_at,
    updatedAt: queryResult.updated_at
  };
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
