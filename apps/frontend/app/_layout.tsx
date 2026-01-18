import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoreProvider } from "../hooks/useStore";
import { LoadingComponent } from "../components/LoadingComponent";
import { createRootStore, type KanbanlyStore } from "@/store/setup";
import { gluestackUIConfig } from "../config/gluestack-ui.config";

import "@/global.css";

export default function RootLayout() {
  const [rootStore, setRootStore] = useState<KanbanlyStore>();

  useEffect(() => {
    if (!rootStore) {
      createRootStore().then((store) => setRootStore(store));
    }
  }, [rootStore]);

  if (!rootStore) {
    return (
      <GluestackUIProvider config={gluestackUIConfig}>
        <LoadingComponent />
      </GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider config={gluestackUIConfig}>
      <StoreProvider store={rootStore}>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </StoreProvider>
    </GluestackUIProvider>
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
