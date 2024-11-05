import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function Layout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(main)/Home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login/index" />
      <Stack.Screen name="getStarted/index" />
      <Stack.Screen name="OTP/[email]/[id]" />
    </Stack>
  );
}
