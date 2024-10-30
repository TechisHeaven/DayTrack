import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <Text style={styles.heading}>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Set a background color to verify safe area
    padding: 40,
  },
  heading: {
    color: "white",
    fontSize: 46,
    textAlign: "left",
    maxWidth: "80%",
    fontWeight: "800",
  },
});
