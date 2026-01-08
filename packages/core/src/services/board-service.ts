import type { Board, BoardList, BoardListItem } from "../entity";

export interface BoardService {
  getBoards(projectId: string): Promise<Board[]>;
  getBoardsList(projectId: string, boardId: string): Promise<BoardList[]>;
  getBoardsListItems(
    projectId: string,
    boardId: string,
    boardListId: string
  ): Promise<BoardListItem[]>;
}
