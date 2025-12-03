import { mock } from "bun:test";
import { Account } from "@/backend/core/entity/account";
import { AccountQueryResult } from "../db/query-results";

export const createQueryResults = () => ({
  accountQuery: {
    id: "123124",
    email: "testuser@test.ro",
    created_at: Date.now().toString(),
    password_hash:
      "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  } as AccountQueryResult
});

export const createTestContext = (
  account: Account = {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString()
  }
) => {
  const queryResults = createQueryResults();

  return {
    account,
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
    }
  };
};
