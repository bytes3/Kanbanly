import type { Board, BoardList, BoardListItem } from "../entity";

export interface BoardRepository {
  getBoardsByProjectId(projectId: string): Promise<Board[]>;
  getBoardListsByBoardId(boardId: string): Promise<BoardList[]>;
  getBoardListItemByBoardListId(boardListId: string): Promise<BoardListItem[]>;
}
