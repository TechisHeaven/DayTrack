import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../../global.css";
import { NoteCardProps } from "@/types/main.type";
import { notes, placeholders } from "@/constants/Notes";
import Button from "@/components/Button";

export default function Note() {
  let { id }: { id: string } = useLocalSearchParams();
  const defaultNotes = notes.find((note) => note.id === id);

  const [noteItem, setNoteItem] = useState<NoteCardProps | null>(
    defaultNotes || null
  );
  // useMemo to Memorize the placeholder value on every render of Component
  const randomPlaceholder = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  }, []);

  return (
    <View style={style.screen}>
      <View style={style.container}>
        <TextInput
          value={noteItem?.title}
          placeholder={randomPlaceholder.title}
          style={style.title}
          autoFocus
          onChangeText={(text: string) =>
            setNoteItem((prev) => ({ ...prev!, title: text }))
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
          {noteItem?.tags?.map((tag) => {
            return <Text style={style.description}>#{tag}</Text>;
          })}
        </View>
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <TextInput
            placeholder={randomPlaceholder.description}
            value={noteItem?.description}
            onChangeText={(text: string) =>
              setNoteItem((prev) => ({ ...prev!, description: text }))
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
