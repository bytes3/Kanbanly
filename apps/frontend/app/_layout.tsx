import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContextProvider } from "../context/ThemeContext";
import { StoreProvider } from "../hooks/useStore";
import { LoadingComponent } from "../components/LoadingComponent";
import { createRootStore, type KanbanlyStore } from "@/store/setup";

export default function RootLayout() {
  const [rootStore, setRootStore] = useState<KanbanlyStore>();

  useEffect(() => {
    if (!rootStore) {
      createRootStore().then((store) => setRootStore(store));
    }
  }, [rootStore]);

  if (!rootStore) {
    return (
      <ThemeContextProvider>
        <LoadingComponent />
      </ThemeContextProvider>
    );
  }

  return (
    <ThemeContextProvider>
      <StoreProvider store={rootStore}>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </StoreProvider>
    </ThemeContextProvider>
  );
}

function RootNavigation() {
  return (
    <Stack
      initialRouteName={"index"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
