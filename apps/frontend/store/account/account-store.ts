import { getEnv, Instance, types } from "mobx-state-tree";
import { KanbanlyAppEnv } from "../setup";
import { AuthCredentials } from "./api/dtos/AuthDto";

interface RegisterResult {
  userDidRegister: boolean;
  errorMessage?: string;
}

export const AccountStore = types.model("AccountStore", {}).actions((self) => {
  const { apis } = getEnv<KanbanlyAppEnv>(self);

  return {
    register: async (
      authCredentials: AuthCredentials
    ): Promise<RegisterResult> => {
      try {
        await apis.auth.postRegister(authCredentials);

        return {
          userDidRegister: true
        };
      } catch (error: any) {
        // TODO: Handle user and server errors

        return {
          userDidRegister: false,
          errorMessage: error.message
        };
      }
    }
  };
});

export type AccountStore = Instance<typeof AccountStore>;
