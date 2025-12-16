import { type Mock, mock } from "bun:test";
import type { Account, SessionInfo } from "core/entity";
import type { AccountRepository, UserRepository } from "core/repositories";
import type { User } from "core/entity";
import type {
  AccountQueryResult,
  ProjectQueryResult,
  UserQueryResult
} from "../db/query-results";
import type { Project } from "core/entity";

export const createQueryResults = () => ({
  accountQuery: {
    id: "123124",
    email: "testuser@test.ro",
    created_at: Date.now().toString(),
    password_hash:
      "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  } as AccountQueryResult,
  userQuery: {
    id: "id",
    username: "BellyJohn88",
    first_name: "John",
    last_name: "Doe",
    city: "NY",
    country: "US",
    state: "NY",
    completed_onboarding: true,
    date_birth: Date.now().toString(),
    gender: "Male"
  } as UserQueryResult,
  projectQuery: {
    id: "id",
    name: "project-name",
    description: "a new project to test on",
    created_at: "2022-01-12T06:15:00.000Z",
    board: {
      name: "board-name",
      list_names: ["To Do", "In Progress", "In QA", "Done"],
      created_at: "2022-01-12T06:15:00.000Z"
    }
  } as ProjectQueryResult
});

export const createTestContext = (
  account: Account = {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString(),
    passwordHash: "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
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
  project: Project = {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z",
    board: {
      name: "board-name",
      listNames: ["To Do", "In Progress", "In QA", "Done"],
      createdAt: "2022-01-12T06:15:00.000Z"
    }
  }
) => {
  const queryResults = createQueryResults();
  return {
    account,
    user,
    project,
    queryResults,
    accountRepository: {
      findAccountByEmail: mock(
        async (email: string): Promise<Account | null> => {
          return { ...account, email };
        }
      ),
      create: mock(
        async (email: string, password: string): Promise<Account> => {
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
      findUserByAccountId: mock(
        async (_accountId: string): Promise<User | null> => {
          return { ...user };
        }
      ),
      findUserByUsername: mock(
        async (username: string): Promise<User | null> => {
          return { ...user, username };
        }
      )
    },
    projectRepository: {
      account: {
        accountId: "account-id",
        email: "test@test.ro"
      } as SessionInfo,
      create: mock(async (project: Project): Promise<Project> => {
        return { ...project };
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
