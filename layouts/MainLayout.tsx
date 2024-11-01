import Getstarted from "@/app/(pages)/getStarted";
import Login from "@/app/(pages)/Login";
import Explore from "@/app/(pages)/(main)/Explore";
import Home from "@/app/(pages)/(main)/Home";
import OTPPage from "@/app/(pages)/OTP/[email]";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import MainViewLayout from "./MainViewLayout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function MainLayout() {
  const Stack = createStackNavigator();

  return (
    <MainViewLayout>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="(pages)/main/Home/index" component={Home} />
        <Stack.Screen name="(pages)/main/Explore/index" component={Explore} />
      </Stack.Navigator>
    </MainViewLayout>
  );
}
