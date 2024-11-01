import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  // Refs for animated values
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Infinite rotation animation with axis change and scaling
    Animated.loop(
      Animated.parallel([
        // Rotation animation
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Scaling and axis-changing animation
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [rotateAnim, scaleAnim]);

  // Interpolated values for rotation
  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Styles for circles with rotation and scale animations applied
  const animatedStyle = {
    transform: [{ rotate: rotateInterpolation }, { scale: scaleAnim }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.circleContainer, animatedStyle]}>
        <View style={[styles.circle, { backgroundColor: "white" }]} />
        <View style={[styles.circle, { backgroundColor: "#cfff46" }]} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: 30,
    height: 30,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  circle: {
    borderRadius: 100,
    width: 20,
    height: 20,
  },
});
