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
import type {
  CommonCreateResult,
  CommonDeleteResult,
  CommonUpdateResult
} from "core/utils";

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

  async createBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonCreateResult> {
    try {
      const createdBoardListItem =
        await this.boardRepository.createBoardListItem(
          boardListId,
          boardListItem
        );

      const result: CommonCreateResult = {
        id: createdBoardListItem.id,
        name: createdBoardListItem.title,
        createdAt: createdBoardListItem.createdAt
      };

      return result;
    } catch (error: any) {
      handleServerError("Failed to create board list item", error);
    }
  }

  async updateBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonUpdateResult> {
    try {
      const updatedBoardListItem =
        await this.boardRepository.updateBoardListItem(
          boardListId,
          boardListItem
        );

      const result: CommonUpdateResult = {
        id: updatedBoardListItem.id,
        name: updatedBoardListItem.title,
        modifiedAt: updatedBoardListItem.updatedAt
      };

      return result;
    } catch (error: any) {
      handleServerError("Failed to update board list item", error);
    }
  }

  async deleteBoardItem(
    boardListId: string,
    boardListItem: BoardListItem
  ): Promise<CommonDeleteResult> {
    try {
      const updatedBoardListItem =
        await this.boardRepository.deleteBoardListItem(
          boardListId,
          boardListItem
        );

      const result: CommonDeleteResult = {
        id: updatedBoardListItem.id,
        name: updatedBoardListItem.title,
        deletedAt: updatedBoardListItem.deletedAt!
      };

      return result;
    } catch (error: any) {
      handleServerError("Failed to update board list item", error);
    }
  }
}
