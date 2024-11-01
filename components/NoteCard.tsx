import { NoteCardProps } from "@/types/main.type";
import React from "react";
import { Text, View } from "react-native";

type NoteCardStyleProps = {
  styles: object;
};
interface NotePrps extends NoteCardStyleProps, NoteCardProps {}

export default function NoteCard(props: NotePrps) {
  const { title, description, dateandtime, styles } = props;
  return (
    <View
      style={[
        {
          elevation: 10,
          zIndex: 10,
          width: 200,
          height: 240,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 30,
          transform: "translate(20px), rotate(-10deg)",
        },
        styles,
      ]}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>
      <Text style={{ fontSize: 14, color: "gray", fontWeight: "600" }}>
        {dateandtime}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "gray",
          fontWeight: "600",
          marginTop: 40,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
