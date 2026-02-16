import { describe, it, expect, beforeEach } from "bun:test";
import { createTestContext, MockedAuthApi, TestContext } from "@/test/context";
import { AccountStore } from "./account-store";
import { UserError } from "@/errors/errors";

describe("Account store", () => {
  let context: TestContext;
  let accountStore: AccountStore;
  let mockedAuthApi: MockedAuthApi;

  beforeEach(() => {
    context = createTestContext();
    accountStore = context.stores.accountStore;
    mockedAuthApi = context.mockedAuthApi;
  });

  describe("Auth flow", () => {
    const authCredentials = {
      email: "email",
      password: "password"
    };

    it("should successfully register the user", async () => {
      const result = await accountStore.register(authCredentials);

      expect(result).toEqual({
        userDidRegister: true
      });
      expect(mockedAuthApi.postRegister).toBeCalledWith(authCredentials);
    });

    it("should return error message when register fails", async () => {
      const error = new UserError("User already exists");
      mockedAuthApi.postRegister.mockRejectedValue(error);

      const result = await accountStore.register(authCredentials);

      expect(result).toEqual({
        userDidRegister: false,
        errorMessage: "User already exists"
      });
      expect(mockedAuthApi.postRegister).toBeCalledWith(authCredentials);
    });
  });
});
