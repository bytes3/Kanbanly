import type { Board, BoardList, BoardListItem } from "../entity";

export interface BoardService {
  getBoards(): Promise<Board[]>;
  getBoardsList(boardId: string): Promise<BoardList[]>;
  getBoardsListItems(boardListId: string): Promise<BoardListItem[]>;
}
