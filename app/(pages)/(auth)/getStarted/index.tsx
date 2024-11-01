import React from "react";
import { Text, View } from "react-native";
import style from "@/styles/style";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Getstarted() {
  const { login } = useAuthStore();
  function handleGetStarted() {
    router.push("/(pages)/Login");
  }

  return (
    <SafeAreaView
      style={{
        padding: 20,

        flex: 1,
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 100,
              width: 20,
              height: 20,
              backgroundColor: "white",
            }}
          />
          <View
            style={{
              borderRadius: 100,
              width: 20,
              height: 20,
              backgroundColor: "#cfff46",
            }}
          />
        </View>
        <Text style={style.text}>DayTrack</Text>
      </View>
      <Text style={style.heading}>
        You suck at taking notes brother, you need me :)
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            elevation: 10,
            zIndex: 10,
            width: 200,
            height: 240,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 40,
            transform: "translate(20px), rotate(-10deg)",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Create a plan for world domination (or just a snack).
          </Text>
          <Text style={{ fontSize: 14, color: "lightGray", fontWeight: "600" }}>
            4th Jan 2050
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              fontWeight: "600",
              marginTop: 40,
            }}
          >
            Plan your world takeover—and don’t forget to grab a snack!
          </Text>
        </View>

        <View
          style={{
            width: 200,
            height: 240,
            backgroundColor: "#cfff46",
            padding: 20,
            borderRadius: 40,
            zIndex: 20,
            elevation: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            transform: [{ translateX: -30 }, { rotate: "-10deg" }],
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: "lightGray" }}>
            Is coffee a meal? Sip and decide if it counts!
          </Text>
          <Text style={{ fontSize: 14, color: "lightGray", fontWeight: "600" }}>
            4th Jan 2050
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              fontWeight: "600",
              marginTop: 40,
            }}
          >
            Is coffee a meal? Sip and decide if it counts!
          </Text>
        </View>
      </View>

      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <Button onPress={handleGetStarted} icon={"chevron-right"} />
      </View>
    </SafeAreaView>
  );
}
