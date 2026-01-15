import { Instance, types } from "mobx-state-tree";

export const UserStore = types
  .model("UserStore", {})
  .actions((self) => ({
    // Add actions here when needed
  }))
  .views((self) => ({
    // Add computed values here when needed
  }));

export type UserStore = Instance<typeof UserStore>;
