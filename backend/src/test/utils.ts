import { mock } from "bun:test";
import { Account } from "@/backend/core/entity/account";

export const createTestContext = (
  account: Account = {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString()
  }
) => ({
  account,
  accountRepository: {
    findAccountByEmail: mock(async (id: string): Promise<Account | null> => {
      return { ...account, id };
    }),
    create: mock(async (email: string, password: string): Promise<Account> => {
      return { ...account, email };
    })
  }
});
