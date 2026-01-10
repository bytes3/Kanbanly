import type { Board, BoardList, BoardListItem } from "../entity";
import type {
  CommonCreateResult,
  CommonDeleteResult,
  CommonUpdateResult
} from "../utils";

export interface BoardService {
  getBoards(projectId: string): Promise<Board[]>;
  getBoardsList(projectId: string, boardId: string): Promise<BoardList[]>;
  getBoardsListItems(
    projectId: string,
    boardId: string,
    boardListId: string
  ): Promise<BoardListItem[]>;
  createBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonCreateResult>;
  updateBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonUpdateResult>;
  deleteBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonDeleteResult>;
}
