import { AccountStore } from "@/store/account/account-store";
import { Apis } from "@/store/setup";
import { createEntitesContext } from "core/test";
import { RegisterResponse } from "@/store/account/api/dtos/AuthDto";
import { UserCreationMessage } from "shared/utils";
import { Mock, mock } from "bun:test";

export type TestContext = {
  entities: ReturnType<typeof createEntitesContext>;
  stores: {
    accountStore: AccountStore;
  };
  mockedAuthApi: MockedAuthApi;
};

export const createTestContext = (): TestContext => {
  const entities = createEntitesContext();

  const mockedAuthApi: MockedAuthApi = {
    postRegister: mock(async (): Promise<RegisterResponse> => {
      return {
        message: UserCreationMessage.ok
      };
    })
  };

  const apis: Apis = {
    auth: mockedAuthApi
  };

  const accountStore = AccountStore.create({}, { apis });

  return {
    entities,
    mockedAuthApi,
    stores: {
      accountStore
    }
  };
};

export type MockedAuthApi = {
  [K in keyof Apis["auth"]]: Mock<Apis["auth"][K]>;
};
