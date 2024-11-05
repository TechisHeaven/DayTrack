import React, { useEffect, useRef } from "react";
import { SafeAreaView, Animated, Text, StyleSheet, Image } from "react-native";

export default function SplashScreenView() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence to fade in, then rotate
    Animated.sequence([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      // Rotate 180 degrees
      Animated.timing(rotateAnim, {
        toValue: 1, // 1 here will map to 180 degrees
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Animated.Image
          source={require("../assets/images/logo-main-dark.png")} // Replace with your logo path
          style={[
            styles.logo,
            { opacity: fadeAnim, transform: [{ rotate: rotate }] },
          ]}
        />
        <Text style={styles.text}>DayTrack</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 100, // Set the width of your logo
    height: 100, // Set the height of your logo
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
