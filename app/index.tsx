import { useAuthStore } from "@/store/authStore";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "@/components/SplashScreen";
export default function index() {
  const { isAuthenticated } = useAuthStore();
  const [appReady, setAppReady] = useState(false);
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 5000);
  }, []);
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here
    // Example: 'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  });

  // Once fonts are loaded, mark app as ready
  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  // Only navigate if the app is ready
  useEffect(() => {
    if (appReady && !isAuthenticated) {
      !isSplashScreen && router.replace("/getStarted");
    }
    if (appReady && isAuthenticated) {
      !isSplashScreen && router.replace("/Home");
    }
  }, [appReady, isAuthenticated, isSplashScreen]);

  // Show a splash screen while loading

  return <SplashScreen />;
}
