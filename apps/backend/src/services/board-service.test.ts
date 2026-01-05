import { beforeEach, describe, expect, it } from "bun:test";
import {
  createTestContext,
  type MockedBoardRepository,
  type MockedProjectRepository
} from "../test/utils";
import { IBoardService } from "./board-service";
import {
  BoardListItemsNotFound,
  BoardListNotFound,
  ProjectNotFound
} from "../errors/errors";

describe("BoardService", () => {
  let projectRepository: MockedProjectRepository;
  let boardRepository: MockedBoardRepository;
  let boardService: IBoardService;
  let entities: any;

  beforeEach(() => {
    const testContext = createTestContext();

    projectRepository = testContext.projectRepository;
    boardRepository = testContext.boardRepository;
    entities = testContext.entities;
    boardService = new IBoardService(boardRepository, projectRepository);
  });

  describe("getBoards()", () => {
    it("should get boards successfully", async () => {
      const result = await boardService.getBoards();

      expect(result).toEqual(entities.boards);
      expect(boardRepository.getBoardsByProjectId).toBeCalled();
      expect(projectRepository.getMainProject).toBeCalled();
    });

    it("should throw if the project doesn't exist", async () => {
      const expectedError = new ProjectNotFound();
      projectRepository.getMainProject.mockResolvedValue(null);

      expect(async () => {
        await boardService.getBoards();
      }).toThrow(expectedError);
      expect(boardRepository.getBoardsByProjectId).not.toBeCalled();
    });
  });

  describe("getBoardList()", () => {
    it("should get board list successfully", async () => {
      const boardId = entities.boards[0].id;

      const result = await boardService.getBoardsList(boardId);

      expect(result).toEqual(entities.boardList);
      expect(boardRepository.getBoardListsByBoardId).toBeCalledWith(boardId);
    });

    it("should throw if the board list doesn't exist", async () => {
      const boardId = entities.boards[0].id;
      const expectedError = new BoardListNotFound();
      boardRepository.getBoardListsByBoardId.mockResolvedValue([]);

      expect(async () => {
        await boardService.getBoardsList(boardId);
      }).toThrow(expectedError);
      expect(boardRepository.getBoardListsByBoardId).toBeCalledWith(boardId);
    });
  });

  describe("getBoardsListItems()", () => {
    it("should get board list items successfully", async () => {
      const boardListId = entities.boardList[0].id;

      const result = await boardService.getBoardsListItems(boardListId);

      expect(result).toEqual(entities.boardListItems);
      expect(boardRepository.getBoardListItemByBoardListId).toBeCalledWith(
        boardListId
      );
    });

    it("should throw if the board list doesn't exist", async () => {
      const boardListId = entities.boardList[0].id;
      const expectedError = new BoardListItemsNotFound();
      boardRepository.getBoardListItemByBoardListId.mockResolvedValue([]);

      expect(async () => {
        await boardService.getBoardsListItems(boardListId);
      }).toThrow(expectedError);
      expect(boardRepository.getBoardListItemByBoardListId).toBeCalledWith(
        boardListId
      );
    });
  });
});
