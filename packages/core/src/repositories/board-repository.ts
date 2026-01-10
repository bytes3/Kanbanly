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
  createBoardListItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<BoardListItem>;
  updateBoardListItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<BoardListItem>;
  deleteBoardListItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<BoardListItem>;
}
