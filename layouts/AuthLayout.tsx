import Getstarted from "@/app/(pages)/getStarted";
import Login from "@/app/(pages)/Login";
import OTPPage from "@/app/(pages)/OTP/[email]";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function AuthLayout() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="(pages)/getStarted/index" component={Getstarted} />
      <Stack.Screen name="(pages)/Login/index" component={Login} />
      <Stack.Screen name="(pages)/OTP/[email]" component={OTPPage} />
    </Stack.Navigator>
  );
}
