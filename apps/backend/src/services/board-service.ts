import type { Board, BoardList, BoardListItem } from "core/entity";
import type { BoardRepository, ProjectRepository } from "core/repositories";
import type { BoardService } from "core/services";
import {
  BoardListItemsNotFound,
  BoardListNotFound,
  ProjectNotFound,
  UserError
} from "../errors/errors";
import { handleServerError } from "../utils/handleServerErrors";

export class IBoardService implements BoardService {
  private boardRepository: BoardRepository;
  private projectRepository: ProjectRepository;

  constructor(
    boardRepository: BoardRepository,
    projectRepository: ProjectRepository
  ) {
    this.boardRepository = boardRepository;
    this.projectRepository = projectRepository;
  }

  async getBoards(): Promise<Board[]> {
    try {
      const project = await this.projectRepository.getMainProject();
      if (!project) {
        throw new ProjectNotFound();
      }

      const boards = await this.boardRepository.getBoardsByProjectId(
        project.id!
      );

      return boards;
    } catch (error: any) {
      if (error instanceof UserError) {
        throw error;
      }

      handleServerError("Failed to get boards", error);
    }
  }

  async getBoardsList(boardId: string): Promise<BoardList[]> {
    try {
      const boardsList =
        await this.boardRepository.getBoardListsByBoardId(boardId);

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

  async getBoardsListItems(boardListId: string): Promise<BoardListItem[]> {
    try {
      const result =
        await this.boardRepository.getBoardListItemByBoardListId(boardListId);

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
