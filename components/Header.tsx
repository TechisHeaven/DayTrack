import { getUser } from "@/service/auth.service";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header() {
  const { user } = useAuthStore();
  const username = useMemo(() => {
    return user.name;
  }, [user.name]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Image
            style={styles.image}
            source={require("../assets/images/avatar.jpeg")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          Welcome back{" "}
          <Text style={{ fontWeight: "800", color: "white" }}>{username}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/Notification")}
        style={styles.notification}
      >
        <Icon name="notifications-outline" style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingHorizontal: 12,
    padding: 12,
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
