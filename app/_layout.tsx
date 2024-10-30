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
import Getstarted from "./(pages)/getStarted";
import Login from "./(pages)/Login";
import Home from "./(pages)/Home";
import Explore from "./(pages)/Explore";
import React from "react";
import OTPpage from "./(pages)/OTP/[email]";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Right-swipe animation
        }}
      >
        {!isAuthenticated ? (
          // Screens for non-authenticated users
          <>
            <Stack.Screen
              name="(pages)/getStarted/index"
              component={Getstarted}
            />
            <Stack.Screen name="(pages)/Login/index" component={Login} />
            <Stack.Screen name="(pages)/OTP/[email]" component={OTPpage} />
          </>
        ) : (
          // Screens for authenticated users
          <>
            <Stack.Screen name="(pages)/Home/index" component={Home} />
            <Stack.Screen name="(pages)/Explore/index" component={Explore} />
            {/* Add other authenticated screens here */}
          </>
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}
