import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "./Loading";

export default function SplashScreen() {
  return (
    <SafeAreaView>
      <Loading />
    </SafeAreaView>
  );
}
