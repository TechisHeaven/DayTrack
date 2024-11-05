import { logoutPageQuotes } from "@/constants/Quotes";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import IconOcticons from "react-native-vector-icons/Octicons";
import CheckBox from "expo-checkbox";
import { useAuthStore } from "@/store/authStore";
import { account } from "@/service/config.service";

export default function Profile() {
  const [isChecked, setIsChecked] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { logout, user } = useAuthStore();

  // Change logout button text based on checkbox status
  const logoutButtonText = isChecked
    ? "Log out and pretend everything is done!"
    : "Log out";

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * logoutPageQuotes.length);
    setQuoteIndex(randomIndex);
  }, []);

  async function handleLogout() {
    account.deleteSession("current");
    logout();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => router.back()}
          name="chevron-back"
          style={styles.icon}
        />
        <Text style={styles.text}>Profile</Text>
      </View>
      <Image
        source={require("@/assets/images/logout-illustration.png")}
        width={200}
        height={200}
        style={styles.heroImage}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} />
        <Text style={styles.quote}>{logoutPageQuotes[quoteIndex]}</Text>
      </View>

      <TouchableOpacity
        disabled={!isChecked}
        style={[styles.logoutButton, !isChecked && styles.logoutButtonDisable]}
        onPress={handleLogout}
      >
        <Text>
          <IconOcticons
            name="sign-out"
            style={{ fontSize: 24, color: isChecked ? "white" : "gray" }}
          />{" "}
        </Text>
        <Text
          style={[
            styles.logoutButtonText,
            !isChecked && styles.logoutButtonDisabled,
          ]}
        >
          {logoutButtonText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 50,
    objectFit: "contain",
    overflow: "hidden",
  },
  quote: {
    fontSize: 18,
    color: "#f2f2f2",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    color: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 12,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonDisable: {
    backgroundColor: "#444",
  },
  logoutButtonText: {
    color: "#f2f2f2",
    fontSize: 14,
    fontWeight: "bold",
  },
  logoutButtonDisabled: {
    color: "gray",
  },
});
