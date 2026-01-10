import { beforeEach, describe, expect, it } from "bun:test";
import {
  createTestContext,
  type EntitiesContext,
  type MockedBoardRepository
} from "../test/utils";
import { IBoardService } from "./board-service";
import {
  BoardListItemsNotFound,
  BoardListNotFound,
  BoardsNotFound
} from "../errors/errors";
import type {
  CommonCreateResult,
  CommonDeleteResult,
  CommonUpdateResult
} from "core/utils";

describe("BoardService", () => {
  let boardRepository: MockedBoardRepository;
  let boardService: IBoardService;
  let entities: EntitiesContext;
  let projectId: string;
  let boardId: string;
  let boardListId: string;

  beforeEach(() => {
    const testContext = createTestContext();

    boardRepository = testContext.boardRepository;
    entities = testContext.entities;
    boardService = new IBoardService(boardRepository);

    projectId = entities.project.id!;
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

  describe("createBoardItem()", () => {
    it("should create a board list item, and return common create result", async () => {
      const [boardListItem] = entities.boardListItems;
      const expectedResult: CommonCreateResult = {
        id: boardListItem.id,
        name: boardListItem.title,
        createdAt: boardListItem.createdAt
      };

      const result = await boardService.createBoardItem(
        boardListId,
        boardListItem
      );

      expect(result).toEqual(expectedResult);
      expect(boardRepository.createBoardListItem).toBeCalledWith(
        boardListId,
        boardListItem
      );
    });
  });

  describe("updateBoardItem()", () => {
    it("should update board list item", async () => {
      const [boardListItem] = entities.boardListItems;
      const expectedResult: CommonUpdateResult = {
        id: boardListItem.id,
        name: boardListItem.title,
        modifiedAt: boardListItem.createdAt
      };

      const result = await boardService.updateBoardItem(
        boardListId,
        boardListItem
      );

      expect(result).toEqual(expectedResult);
      expect(boardRepository.updateBoardListItem).toBeCalledWith(
        boardListId,
        boardListItem
      );
    });
  });

  describe("deleteBoardItem()", () => {
    it("should delete board list item", async () => {
      const [boardListItem] = entities.boardListItems;
      const isoDate = new Date(Date.now()).toISOString();
      boardRepository.deleteBoardListItem.mockResolvedValue({
        ...boardListItem,
        deletedAt: isoDate
      });
      const expectedResult: CommonDeleteResult = {
        id: boardListItem.id,
        name: boardListItem.title,
        deletedAt: isoDate
      };

      const result = await boardService.deleteBoardItem(
        boardListId,
        boardListItem
      );

      expect(result).toEqual(expectedResult);
      expect(boardRepository.deleteBoardListItem).toBeCalledWith(
        boardListId,
        boardListItem
      );
    });
  });
});
