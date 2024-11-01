import { useAuthStore } from "@/store/authStore";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

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
    </Stack>
  );
}
