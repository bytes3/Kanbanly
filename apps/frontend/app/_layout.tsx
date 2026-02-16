import React, { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContextProvider, useTheme } from "../context/ThemeContext";
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
  const { backgroundColor } = useTheme();

  return (
    <Stack
      initialRouteName={"auth/register/index"}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="auth/register/success"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
