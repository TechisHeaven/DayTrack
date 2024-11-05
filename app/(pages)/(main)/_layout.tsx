import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";
import React from "react";
import "../../../global.css";
export default function Layout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home/index" />
      <Stack.Screen name="Note/[id]" />
      <Stack.Screen name="Notification/index" />
      <Stack.Screen name="Profile/index" />
    </Stack>
  );
}
