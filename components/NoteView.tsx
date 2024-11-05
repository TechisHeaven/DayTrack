import { NoteCardProps } from "@/types/main.type";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import Button from "./Button";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

interface NoteViewProps {
  noteItem?: NoteCardProps | null;
  setNoteItem?: React.Dispatch<React.SetStateAction<NoteCardProps | null>>;
  randomPlaceholder: {
    title: string;
    description: string;
  };
}
export default function NoteView(props: NoteViewProps) {
  const { noteItem, setNoteItem, randomPlaceholder } = props;
  return (
    <View style={style.screen}>
      <View style={style.container}>
        <TextInput
          value={noteItem?.title}
          placeholder={randomPlaceholder.title}
          style={style.title}
          autoFocus
          onChangeText={(text: string) =>
            setNoteItem && setNoteItem((prev) => ({ ...prev!, title: text }))
          }
        />

        <View
          style={{
            display: "flex",
            gap: 6,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={style.description}>4th Jan 2025 -</Text>
          {noteItem?.tags?.map((tag, index) => {
            return (
              <Text key={index} style={style.description}>
                #{tag}
              </Text>
            );
          })}
        </View>
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <TextInput
            placeholder={randomPlaceholder.description}
            value={noteItem?.description}
            onChangeText={(text: string) =>
              setNoteItem &&
              setNoteItem((prev) => ({
                ...prev!,
                description: text,
              }))
            }
            style={style.noteInput}
            multiline
            scrollEnabled
          />
        </ScrollView>
      </View>
      <View style={style.buttonContainer}>
        <Button
          style={[style.button, style.buttonCancel]}
          onPress={() => router.back()}
        >
          Cancel
        </Button>
        <Button style={[style.button, style.buttonMain]}>Continue</Button>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 12,
    margin: 12,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    marginHorizontal: 5,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonMain: {
    backgroundColor: "#cfff46",
  },
  buttonCancel: {
    backgroundColor: "#f0f0f0",
  },
});
