import style from "@/styles/style";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function Notification() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => router.back()}
          name="chevron-back"
          style={styles.icon}
        />
        <Text style={styles.text}>Notification</Text>
      </View>
      <ScrollView
        style={{
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Today</Text>
          <Text style={{ color: "red" }}>Mark all read</Text>
        </View>
        {Array.from({ length: 20 }, (_, index) => {
          return (
            <TouchableOpacity
              key={index + 1}
              onPress={() => router.replace(`/Note/${index + 1}`)}
              style={styles.notificationContainer}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/images/avatar.jpeg")}
              />
              <View>
                <Text style={styles.title}>Todo Reminder Please Check</Text>
                <Text style={styles.description}>4th Jan 2025 -</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  title: { fontSize: 18, color: "white" },
  text: {
    color: "white",
    fontSize: 18,
  },
  icon: {
    color: "white",
    fontSize: 18,
    padding: 12,
  },
  header: {
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexDirection: "row",
    elevation: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
  },
});
