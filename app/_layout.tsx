import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/authStore";
import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { account } from "@/service/config.service";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    AntonRegular: require("../assets/fonts/Anton-Regular.ttf"),
  });
  const { isAuthenticated, setUser, login } = useAuthStore();

  useEffect(() => {
    async function getSession() {
      try {
        const session = await account.getSession("current");
        const user = await account.get();
        setUser(user);
        if (session) login();
      } catch (error) {
        console.log("Failed to get Session", error);
      }
    }
    getSession();
  }, [isAuthenticated]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen name="(pages)/(main)" />
        <Stack.Screen name="(pages)/(auth)" />
      </Stack>
    </ThemeProvider>
  );
}
