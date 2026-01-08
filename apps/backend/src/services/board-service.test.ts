import { beforeEach, describe, expect, it } from "bun:test";
import { createTestContext, type MockedBoardRepository } from "../test/utils";
import { IBoardService } from "./board-service";
import {
  BoardListItemsNotFound,
  BoardListNotFound,
  BoardsNotFound
} from "../errors/errors";

describe("BoardService", () => {
  let boardRepository: MockedBoardRepository;
  let boardService: IBoardService;
  let entities: any;
  let projectId: string;
  let boardId: string;
  let boardListId: string;

  beforeEach(() => {
    const testContext = createTestContext();

    boardRepository = testContext.boardRepository;
    entities = testContext.entities;
    boardService = new IBoardService(boardRepository);

    projectId = entities.project.id;
    boardId = entities.boards[0].id;
    boardListId = entities.boardList[0].id;
  });

  describe("getBoards()", () => {
    it("should get boards successfully", async () => {
      const result = await boardService.getBoards(projectId);

      expect(result).toEqual(entities.boards);
      expect(boardRepository.getBoardsByProjectId).toBeCalledWith(projectId);
    });

    it("should throw if the board boards doesn't exist", async () => {
      const expectedError = new BoardsNotFound();
      boardRepository.getBoardsByProjectId.mockResolvedValue([]);

      expect(async () => {
        await boardService.getBoards(projectId);
      }).toThrow(expectedError);
      expect(boardRepository.getBoardsByProjectId).toBeCalledWith(projectId);
    });
  });

  describe("getBoardList()", () => {
    it("should get board list successfully", async () => {
      const result = await boardService.getBoardsList(projectId, boardId);

      expect(result).toEqual(entities.boardList);
      expect(boardRepository.getBoardListsByBoardId).toBeCalledWith(
        projectId,
        boardId
      );
    });

    it("should throw if the board list doesn't exist", async () => {
      const expectedError = new BoardListNotFound();
      boardRepository.getBoardListsByBoardId.mockResolvedValue([]);

      expect(async () => {
        await boardService.getBoardsList(projectId, boardId);
      }).toThrow(expectedError);
      expect(boardRepository.getBoardListsByBoardId).toBeCalledWith(
        projectId,
        boardId
      );
    });
  });

  describe("getBoardsListItems()", () => {
    it("should get board list items successfully", async () => {
      const result = await boardService.getBoardsListItems(
        projectId,
        boardId,
        boardListId
      );

      expect(result).toEqual(entities.boardListItems);
      expect(boardRepository.getBoardListItemByBoardListId).toBeCalledWith(
        projectId,
        boardId,
        boardListId
      );
    });

    it("should throw if the board list doesn't exist", async () => {
      const expectedError = new BoardListItemsNotFound();
      boardRepository.getBoardListItemByBoardListId.mockResolvedValue([]);

      expect(async () => {
        await boardService.getBoardsListItems(projectId, boardId, boardListId);
      }).toThrow(expectedError);
      expect(boardRepository.getBoardListItemByBoardListId).toBeCalledWith(
        projectId,
        boardId,
        boardListId
      );
    });
  });
});
