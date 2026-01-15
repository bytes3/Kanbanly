import { Instance, onSnapshot, types } from "mobx-state-tree";
import { ApisauceInstance, create } from "apisauce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStore } from "./user/user-store";
import { EnvVars } from "@/config/env";

const KanbanlyStore = types.model("KanbanlyStore", {
  userStore: UserStore
});

export type KanbanlyAppEnv = {
  sauce: ApisauceInstance;
  apis: {
    auth: {};
  };
};

export const createRootStore = async (): Promise<KanbanlyStore> => {
  const { baseURL } = EnvVars;
  const sauce = create({
    baseURL
  });

  const preservedStore = JSON.parse(
    (await AsyncStorage.getItem("kanbanlyStore")) ?? "{}"
  );

  const kanbanlyEnv: KanbanlyAppEnv = {
    sauce,
    apis: {
      auth: {} // TODO: createUserApi(sauce),
    }
  };

  const store = KanbanlyStore.create(
    {
      userStore: {},
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
