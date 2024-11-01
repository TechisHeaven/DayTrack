import Header from "@/components/Header";
import { Slot, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function MainViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View>
      <Header />
      {children}
    </View>
  );
}
