import { type Mock, mock } from "bun:test";
import * as entity from "core/entity";
import type {
  AccountRepository,
  BoardRepository,
  CreateProjectParams,
  ProjectRepository,
  UserRepository
} from "core/repositories";
import type { Board, User, Project } from "core/entity";
import type { CommonCreateResult } from "core/utils";
import { createEntitesContext } from "core/test";

export const createTestContext = () => {
  const {
    account,
    sessionInfo,
    user,
    initProject,
    project,
    boards,
    boardList,
    boardListItems
  } = createEntitesContext();

  return {
    entities: {
      account,
      sessionInfo,
      user,
      initProject,
      project,
      boards,
      boardList,
      boardListItems
    },
    accountRepository: {
      findAccountByEmail: mock(
        async (email: string): Promise<entity.Account | null> => {
          return { ...account, email };
        }
      ),
      create: mock(
        async (email: string, password: string): Promise<entity.Account> => {
          return { ...account, email, passwordHash: password };
        }
      )
    },
    userRepository: {
      create: mock(async function (
        _accountId: string,
        user: Omit<User, "id">
      ): Promise<User> {
        return { ...user, id: "123" };
      }),
      updateCompletedOnboarding: mock(async (): Promise<boolean> => {
        return true;
      }),
      findUserByAccountId: mock(
        async (_accountId: string): Promise<User | null> => {
          return user;
        }
      ),
      findUserByUsername: mock(
        async (username: string): Promise<User | null> => {
          return { ...user, username };
        }
      ),
      getCurrentUser: mock(async (): Promise<User | null> => {
        return user;
      })
    },
    projectRepository: {
      sessionInfo,
      getMainProject: mock(async (): Promise<Project> => {
        return project;
      }),
      create: mock(
        async (_params: CreateProjectParams): Promise<CommonCreateResult> => {
          return {
            id: "project-id",
            createdAt: initProject.createdAt!,
            name: "project-name"
          };
        }
      )
    },
    boardRepository: {
      getBoardsByProjectId: mock(
        async (_projectId: string): Promise<entity.Board[]> => {
          return boards;
        }
      ),
      getBoardListsByBoardId: mock(
        async (
          _projectId: string,
          _boardId: string
        ): Promise<entity.BoardList[]> => {
          return boardList;
        }
      ),
      getBoardListItemByBoardListId: mock(
        async (
          _projectId: string,
          _boardId: string,
          _boardListItemId: string
        ): Promise<entity.BoardListItem[]> => {
          return boardListItems;
        }
      ),
      createBoardListItem: mock(async () => {
        return boardListItems[0];
      }),
      updateBoardListItem: mock(async () => {
        return boardListItems[0];
      }),
      deleteBoardListItem: mock(async () => {
        return boardListItems[0];
      })
    }
  };
};

export type MockedAccountRepository = {
  [K in keyof AccountRepository]: Mock<AccountRepository[K]>;
};

export type MockedUserRepository = {
  [K in keyof UserRepository]: Mock<UserRepository[K]>;
};

export type MockedProjectRepository = {
  [K in keyof ProjectRepository]: Mock<ProjectRepository[K]>;
};

export type MockedBoardRepository = {
  [K in keyof BoardRepository]: Mock<BoardRepository[K]>;
};

export type EntitiesContext = ReturnType<typeof createEntitesContext>;
