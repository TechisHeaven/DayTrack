import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/authStore";
import "../global.css";
import React from "react";
import Header from "@/components/Header";
import { Slot, Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    AntonRegular: require("../assets/fonts/Anton-Regular.ttf"),
  });
  const { isAuthenticated } = useAuthStore();

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
      {isAuthenticated && <Header />}
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Right-swipe animation
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(pages)" />
      </Stack.Navigator> */}
      <Stack
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="(pages)/(auth)" />
        ) : (
          <Stack.Screen name="(pages)/(main)" />
        )}
      </Stack>
    </ThemeProvider>
  );
}
