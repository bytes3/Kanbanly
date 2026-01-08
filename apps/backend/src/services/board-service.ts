import type { Board, BoardList, BoardListItem } from "core/entity";
import type { BoardRepository } from "core/repositories";
import type { BoardService } from "core/services";
import {
  BoardListItemsNotFound,
  BoardListNotFound,
  BoardsNotFound,
  UserError
} from "../errors/errors";
import { handleServerError } from "../utils/handleServerErrors";

export class IBoardService implements BoardService {
  private boardRepository: BoardRepository;

  constructor(boardRepository: BoardRepository) {
    this.boardRepository = boardRepository;
  }

  async getBoards(projectId: string): Promise<Board[]> {
    try {
      const boards = await this.boardRepository.getBoardsByProjectId(projectId);

      if (boards.length <= 0) {
        throw new BoardsNotFound();
      }

      return boards;
    } catch (error: any) {
      if (error instanceof UserError) {
        throw error;
      }

      handleServerError("Failed to get boards", error);
    }
  }

  async getBoardsList(
    projectId: string,
    boardId: string
  ): Promise<BoardList[]> {
    try {
      const boardsList = await this.boardRepository.getBoardListsByBoardId(
        projectId,
        boardId
      );

      if (boardsList.length <= 0) {
        throw new BoardListNotFound();
      }

      return boardsList;
    } catch (error: any) {
      if (error instanceof UserError) {
        throw error;
      }

      handleServerError("Failed to get boards list", error);
    }
  }

  async getBoardsListItems(
    projectId: string,
    boardId: string,
    boardListId: string
  ): Promise<BoardListItem[]> {
    try {
      const result = await this.boardRepository.getBoardListItemByBoardListId(
        projectId,
        boardId,
        boardListId
      );

      if (result.length <= 0) {
        throw new BoardListItemsNotFound();
      }

      return result;
    } catch (error: any) {
      if (error instanceof UserError) {
        throw error;
      }

      handleServerError("Failed to get boards list items", error);
    }
  }
}
