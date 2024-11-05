import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import { router } from "expo-router";
import { account } from "@/service/config.service";

interface CheckYourEmailProps {
  onClose: () => void;
  email: string;
  userId: string;
}
export default function CheckYourEmail(props: CheckYourEmailProps) {
  const { onClose, email, userId } = props;
  async function handlePress() {
    onClose();
    router.navigate(`/(pages)/OTP/${email.toString()}/${userId.toString()}`);
  }
  return (
    <View style={styles.bottomSheetContent}>
      <View style={styles.iconBox}>
        <Icon name="message-badge" style={styles.icon} />
      </View>
      <View style={styles.mainBox}>
        <Text style={styles.heading}>OTP Incoming, Buddy!</Text>
        <Text style={styles.description}>
          Your email is about to get more action than your to-do list! Check it
          for your OTP!
        </Text>
        <Button style={styles.button} onPress={handlePress}>
          <Text style={{ color: "white" }}>Done</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 0,
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
  mainBox: {
    padding: 10,
    paddingTop: 40,
    display: "flex",
    gap: 22,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
  },
  description: {
    textAlign: "center",
  },
  bottomSheetContent: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  bottomSheetText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -40,
  },
  icon: {
    fontSize: 30,
    padding: 20,
    borderColor: "#fff",
    borderWidth: 0.4,
    backgroundColor: "#000",
    color: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: 10,
    width: "auto",
  },
});
