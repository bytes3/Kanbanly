import { Instance, onSnapshot, types } from "mobx-state-tree";
import { ApisauceInstance, create } from "apisauce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EnvVars } from "@/config/env";
import { AuthApi, createAuthApi } from "./account/api/auth.api";
import { AccountStore } from "./account/account-store";

const KanbanlyStore = types.model("KanbanlyStore", {
  accountStore: AccountStore
});

export type Apis = {
  auth: AuthApi;
};

export type KanbanlyAppEnv = {
  sauce: ApisauceInstance;
  apis: Apis;
};

export const createRootStore = async (): Promise<KanbanlyStore> => {
  const { baseURL } = EnvVars;
  const sauce = create({
    baseURL
  });

  const preservedStore = JSON.parse(
    (await AsyncStorage.getItem("kanbanlyStore")) ?? "{}"
  );

  const authApi = createAuthApi(sauce);

  const kanbanlyEnv: KanbanlyAppEnv = {
    sauce,
    apis: {
      auth: authApi
    }
  };

  const store = KanbanlyStore.create(
    {
      accountStore: {},
      ...preservedStore
    },
    kanbanlyEnv
  );

  onSnapshot(store, () => {
    AsyncStorage.setItem("kanbanlyStore", JSON.stringify(store));
  });

  return store;
};

export type KanbanlyStore = Instance<typeof KanbanlyStore>;
