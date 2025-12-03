import { describe, it, expect } from "bun:test";
import {
  AccountLoginMessage,
  AccountRegisterMessage
} from "@/backend/core/entity/server-message";
import {
  AccountAlreadyExist,
  AccountLoginFailure,
  AccountNotFound,
  ServerError
} from "@/backend/core/errors/errors";
import { IAccountService } from "./account-service";
import { createTestContext } from "../test/utils";

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

describe("Login account", () => {
  it("should login the user successfully", async () => {
    const { account, accountRepository } = createTestContext();
    const accountService = new IAccountService(accountRepository);

    const token = await accountService.login(account.email, "password");

    expect(token).toBeString();
    expect(token.length >= 50).toBe(true);
  });

  it("should fail to login if the account doesn't exit", async () => {
    const expectedError = new AccountNotFound();
    const { account, accountRepository } = createTestContext();
    accountRepository.findAccountByEmail.mockResolvedValue(null);
    const accountService = new IAccountService(accountRepository);

    expect(async () => {
      await accountService.login(account.email, "password");
    }).toThrow(expectedError);
  });

  it("should fail to login if the account password doesn't match", async () => {
    const expectedError = new AccountLoginFailure();
    const { account, accountRepository } = createTestContext();
    const accountService = new IAccountService(accountRepository);

    expect(async () => {
      await accountService.login(account.email, "wrong_password");
    }).toThrow(expectedError);
  });

  it("should return server error", async () => {
    const expectedError = new ServerError(AccountLoginMessage.serverError);
    const { account, accountRepository } = createTestContext();
    accountRepository.findAccountByEmail.mockRejectedValue(new Error());
    const accountService = new IAccountService(accountRepository);

    expect(async () => {
      await accountService.login(account.email, "password");
    }).toThrow(expectedError);
  });
});
