import { Mock, mock } from "bun:test";
import { Account } from "@/backend/core/entity/account";
import { AccountRepository } from "@/backend/core/repositories/account-repository";
import { UserRepository } from "@/backend/core/repositories/user-repository";
import { User } from "@/backend/core/entity/user";
import { AccountQueryResult, UserQueryResult } from "../db/query-results";

export const createQueryResults = () => ({
  accountQuery: {
    id: "123124",
    email: "testuser@test.ro",
    created_at: Date.now().toString(),
    password_hash:
      "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  } as AccountQueryResult,
  userQuery: {
    account_id: "123124",
    username: "BellyJohn88",
    first_name: "John",
    last_name: "Doe",
    city: "NY",
    country: "US",
    state: "NY",
    completed_onboarding: true,
    date_birth: Date.now().toString(),
    gender: "Male"
  } as UserQueryResult
});

export const createTestContext = (
  account: Account = {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString()
  },
  user: User = {
    accountId: "123124",
    username: "BellyJohn88",
    firstName: "John",
    lastName: "Doe",
    city: "NY",
    country: "US",
    state: "NY",
    dateBirth: Date.now().toString(),
    gender: "Male",
    completedOnboarding: true
  }
) => {
  const queryResults = createQueryResults();

  return {
    account,
    user,
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
      create: mock(async function (user: User): Promise<User> {
        return user;
      }),
      findUserByAccountId: mock(
        async (accountId: string): Promise<User | null> => {
          return { ...user, accountId };
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
