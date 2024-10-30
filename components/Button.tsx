import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
  GestureResponderEvent,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

type ButtonProps = {
  onPress?: (value: GestureResponderEvent | null) => void;
  icon?: string;
  style?: object;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const { onPress, children, icon, style, disabled = false } = props;

  // Set up the animation scale value
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Press in and press out animations
  const animateIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <Pressable
      disabled={disabled}
      onPressIn={animateIn}
      onPressOut={animateOut}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.button, { transform: [{ scale: scaleValue }] }, style]}
      >
        <Text style={styles.text}>
          {children}
          {icon && <Icon name={icon} size={20} />}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "black",
    display: "flex",
  },
});
