import { describe, beforeEach, it, expect } from "bun:test";
import { AccountRegisterMessage } from "../utils/server-message";
import {
  AccountAlreadyExist,
  AccountLoginFailure,
  AccountNotFound
} from "../errors/errors";
import { IAccountService } from "./account-service";
import { createTestContext, type MockedAccountRepository } from "../test/utils";
import type { AccountService } from "core/services";
import type { Account } from "core/entity";

describe("Auth Tests", () => {
  let account: Account;
  let accountRepository: MockedAccountRepository;
  let accountService: AccountService;

  beforeEach(() => {
    const testContext = createTestContext();

    account = testContext.entities.account;
    accountRepository = testContext.accountRepository;

    accountService = new IAccountService(accountRepository);
  });

  describe("Register account", () => {
    it("should register the account successfully", async () => {
      const password = "password@123";
      const expectedEmail = "testuser@test.ro";
      accountRepository.findAccountByEmail.mockResolvedValue(null);

      const result = await accountService.register(expectedEmail, password);

      expect(result).toBe(AccountRegisterMessage.ok);
      expect(accountRepository.create).toBeCalledTimes(1);
    });

    it("should return error when the user already exist", async () => {
      expect(async () => {
        await accountService.register(account.email, "password");
      }).toThrow(AccountAlreadyExist);

      expect(accountRepository.create.mock.calls.length).toBe(0);
    });
  });

  describe("Login account", () => {
    it("should login the user successfully", async () => {
      const token = await accountService.login(account.email, "password");

      expect(token).toBeString();
      expect(token.length >= 50).toBe(true);
    });

    it("should fail to login if the account doesn't exit", async () => {
      const expectedError = new AccountNotFound();
      accountRepository.findAccountByEmail.mockResolvedValue(null);

      expect(async () => {
        await accountService.login(account.email, "password");
      }).toThrow(expectedError);
    });

    it("should fail to login if the account password doesn't match", async () => {
      const expectedError = new AccountLoginFailure();

      expect(async () => {
        await accountService.login(account.email, "wrong_password");
      }).toThrow(expectedError);
    });
  });
});
