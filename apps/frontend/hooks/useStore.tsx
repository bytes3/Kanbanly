import React, { createContext, useContext } from "react";
import { Instance } from "mobx-state-tree";

const StoreContext = createContext<Instance<any>>({});

export function useStore<T = Instance<any>>(): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Store must be used within a StoreProvider");
  }
  return store as T;
}

export const StoreProvider: React.FC<{
  store: Instance<any>;
  children: React.ReactNode;
}> = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
