import { type Mock, mock } from "bun:test";
import type * as entity from "core/entity";
import type {
  AccountRepository,
  CreateProjectParams,
  ProjectRepository,
  UserRepository
} from "core/repositories";
import type { InitProject, User } from "core/entity";
import type { Project } from "core/entity";
import type { CommonCreateResult } from "core/utils";

export const createTestContext = (
  account: entity.Account = {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString(),
    passwordHash: "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  },
  sessionInfo: entity.SessionInfo = {
    accountId: "account-id",
    email: "test@test.ro",
    createdAt: new Date(Date.now()).toISOString()
  },
  user: User = {
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
  },
  initProject: InitProject = {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z",
    board: {
      name: "board-name",
      listNames: ["To Do", "In Progress", "In QA", "Done"],
      createdAt: "2022-01-12T06:15:00.000Z"
    }
  },
  project: Project = {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z"
  }
) => {
  return {
    account,
    user,
    sessionInfo,
    project,
    initProject,
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
          return { ...user };
        }
      ),
      findUserByUsername: mock(
        async (username: string): Promise<User | null> => {
          return { ...user, username };
        }
      ),
      getCurrentUser: mock(async (): Promise<User | null> => {
        return { ...user };
      })
    },
    projectRepository: {
      sessionInfo,
      getMainProject: mock(async (): Promise<Project> => {
        return { ...project };
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
