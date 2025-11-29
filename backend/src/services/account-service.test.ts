import { describe, it, expect, mock } from "bun:test";
import { Account } from "@/backend/core/entity/account";
import { AccountRegisterMessage } from "@/backend/core/entity/server-message";
import { AccountAlreadyExist, ServerError } from "@/backend/core/errors/errors";
import { IAccountService } from "./account-service";
import { password } from "bun";

describe("Register account", () => {
  it("should register the account successfully", async () => {
    const password = "password@123";
    const expectedEmail = "testuser@test.ro";
    const { accountRepository } = createTestContext({
      id: "123123",
      email: expectedEmail,
      createdAt: Date.now().toString()
    });
    accountRepository.findAccountByEmail.mockResolvedValue(null);
    const accountService = new IAccountService(accountRepository);

    const result = await accountService.register(expectedEmail, password);

    expect(result).toBe(AccountRegisterMessage.ok);
    expect(accountRepository.create.mock.calls[0][0]).toEqual(expectedEmail);
    expect(accountRepository.create.mock.calls[0][1]).not.toBeEmpty();
  });

  it("should return error when the user already exist", async () => {
    const { accountRepository, account } = createTestContext();
    const accountService = new IAccountService(accountRepository);

    expect(async () => {
      await accountService.register(account.email, "password");
    }).toThrow(AccountAlreadyExist);
    expect(accountRepository.create.mock.calls.length).toBe(0);
  });

  it("should return server error", async () => {
    const expectedError = new ServerError(AccountRegisterMessage.serverError);
    const { accountRepository, account } = createTestContext();
    accountRepository.findAccountByEmail.mockResolvedValue(null);
    accountRepository.create.mockRejectedValue(new Error());
    const accountService = new IAccountService(accountRepository);

    expect(async () => {
      await accountService.register(account.email, "password");
    }).toThrow(expectedError);
  });
});

const createTestContext = (
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
