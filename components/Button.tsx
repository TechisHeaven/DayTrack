import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

type ButtonProps = {
  onPress: (value: GestureResponderEvent | null) => void;
  title?: string;
  icon?: string;
};
export default function Button(props: ButtonProps) {
  const { onPress, title, icon } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {title}
        <Icon name={icon || ""} size={20} />
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    display: "flex",
  },
});
