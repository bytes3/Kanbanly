import { type Mock, mock } from "bun:test";
import * as entity from "core/entity";
import type {
  AccountRepository,
  BoardRepository,
  CreateProjectParams,
  ProjectRepository,
  UserRepository
} from "core/repositories";
import type { Board, InitProject, User } from "core/entity";
import type { Project } from "core/entity";
import type { CommonCreateResult } from "core/utils";

const createEntitesContext = () => ({
  account: {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString(),
    passwordHash: "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  } as entity.Account,
  sessionInfo: {
    accountId: "account-id",
    email: "test@test.ro",
    createdAt: new Date(Date.now()).toISOString()
  } as entity.SessionInfo,
  user: {
    id: "123",
    username: "BellyJohn88",
    firstName: "John",
    lastName: "Doe",
    city: "NY",
    country: "US",
    state: "NY",
    dateBirth: Date.now().toString(),
    gender: "Male",
    completedOnboarding: true
  } as entity.User,
  initProject: {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z",
    board: {
      name: "board-name",
      listNames: ["To Do", "In Progress", "In QA", "Done"],
      createdAt: "2022-01-12T06:15:00.000Z"
    }
  } as entity.InitProject,
  project: {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z"
  } as entity.Project,
  boards: [
    {
      id: "board-id",
      projectId: "project-id",
      name: "board-name",
      isDefault: true,
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    },
    {
      id: "board-id-2",
      projectId: "project-id",
      name: "board-name-2",
      isDefault: false,
      position: 1,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as Board[],
  boardList: [
    {
      id: "list-id",
      boardId: "board-id",
      name: "list-name",
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    },
    {
      id: "list-id-2",
      boardId: "board-id",
      name: "list-name-2",
      position: 1,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as entity.BoardList[],
  boardListItems: [
    {
      id: "item-id",
      boardListId: "list-id",
      title: "item-title",
      description: "item-description",
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z",
      completedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as entity.BoardListItem[]
});

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
        async (_boardId: string): Promise<entity.BoardList[]> => {
          return boardList;
        }
      ),
      getBoardListItemByBoardListId: mock(
        async (_boardListItemId: string): Promise<entity.BoardListItem[]> => {
          return boardListItems;
        }
      )
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
