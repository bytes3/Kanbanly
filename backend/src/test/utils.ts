import { Mock, mock } from "bun:test";
import { Account } from "@/backend/core/entity/account";
import { AccountRepository } from "@/backend/core/repositories/account-repository";
import { UserRepository } from "@/backend/core/repositories/user-repository";
import { User } from "@/backend/core/entity/user";
import {
  AccountQueryResult,
  ProjectQueryResult,
  UserQueryResult
} from "../db/query-results";
import { Project } from "@/backend/core/entity/project";

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
    createdAt: Date.now().toString()
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
        async (email: string): Promise<AccountQueryResult | null> => {
          return { ...queryResults.accountQuery, email };
        }
      ),
      create: mock(
        async (
          email: string,
          _password: string
        ): Promise<AccountQueryResult> => {
          return { ...queryResults.accountQuery, email };
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
        id: "account-id",
        email: "test@test.ro"
      } as Account,
      create: mock(async (_project: Project): Promise<ProjectQueryResult> => {
        return queryResults.projectQuery;
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
