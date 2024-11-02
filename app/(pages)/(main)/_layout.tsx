import { useAuthStore } from "@/store/authStore";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import "../../../global.css";

export default function Layout() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/(auth)/Login");
    }
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home/index" />
      <Stack.Screen name="Explore/index" />
      <Stack.Screen name="Note/[id]" />
    </Stack>
  );
}
