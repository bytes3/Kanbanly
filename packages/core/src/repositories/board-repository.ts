import type { Board, BoardList, BoardListItem } from "../entity";

export interface BoardRepository {
  getBoadByDefaultBoardByProjectId(projectId: string): Promise<Board | null>;
  getBoardListsByBoardId(boardId: string): Promise<BoardList[] | null>;
  getBoardListItemByBoardListId(
    boardListId: string
  ): Promise<BoardListItem[] | null>;
}
