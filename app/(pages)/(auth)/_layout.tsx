import { useAuthStore } from "@/store/authStore";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function Layout() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(main)/Home");
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login/index" />
      <Stack.Screen name="getStarted/index" />
    </Stack>
  );
}
