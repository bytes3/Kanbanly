import type { Board, BoardList, BoardListItem } from "../entity";

export interface BoardRepository {
  getBoardsByProjectId(projectId: string): Promise<Board[]>;
  getBoardListsByBoardId(
    projectId: string,
    boardId: string
  ): Promise<BoardList[]>;
  getBoardListItemByBoardListId(
    projectId: string,
    boardId: string,
    boardListId: string
  ): Promise<BoardListItem[]>;
}
