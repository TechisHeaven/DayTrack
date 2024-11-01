import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/images/avatar.jpeg")}
        />

        <Text style={styles.title}>
          Welcome back{" "}
          <Text style={{ fontWeight: "800", color: "white" }}>Himanshu</Text>
        </Text>
      </View>
      <View style={styles.notification}>
        <Icon name="notifications-outline" style={styles.notificationIcon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 12,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
  },
  notification: {},
  notificationIcon: {
    color: "white",
    fontSize: 20,
  },
});
