import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import style from "@/styles/style";
import Button from "@/components/Button";
export default function Getstarted() {
  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 100,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "start",
      }}
    >
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
        <Button onPress={() => null} icon={"chevron-right"} />
      </View>
    </SafeAreaView>
  );
}