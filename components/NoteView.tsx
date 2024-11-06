import { NoteCardProps } from "@/types/main.type";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import Button from "./Button";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { databases } from "@/service/config.service";
import { ID } from "react-native-appwrite";
import { useAuthStore } from "@/store/authStore";
import Toast from "react-native-toast-message";
import { formatDate } from "@/utils/handleDate";
import { useNotes } from "@/context/notesContext";

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
  const { fetchNotesData } = useNotes();
  const [newTags, setNewTags] = useState<string>(
    noteItem?.tags?.map((tag) => `#${tag}`).join(" ") || ""
  );
  const { user } = useAuthStore();
  async function createNote() {
    try {
      let tags = newTags
        .split("#")
        .map((t) => t.trim())
        .filter((t) => t !== "");
      if (noteItem?.$id) {
        await databases.updateDocument(
          "672a448300359977d5dc",
          "672a4494002282b6181f",
          noteItem.$id!,
          {
            title: noteItem?.title,
            description: noteItem?.description,
            tags: tags,
            dateandtime: new Date(),
            userId: user.$id,
          }
        );
        alert("Updated Note");
      } else {
        await databases.createDocument(
          "672a448300359977d5dc",
          "672a4494002282b6181f",
          ID.unique(),
          {
            title: noteItem?.title,
            description: noteItem?.description,
            tags: tags,
            dateandtime: new Date(),
            userId: user.$id,
          }
        );
        alert("Successfully created");
      }
      fetchNotesData();
      // showSuccessToast();
    } catch (error) {
      console.log(error);
    }
  }

  function showSuccessToast() {
    Toast.show({
      type: "success",
      text1: "Congratulations",
      text2: "Note Created Successfully!",
    });
  }

  const formatDateString = useMemo(() => {
    return noteItem
      ? formatDate(noteItem?.$updatedAt! as any)
      : formatDate(Date.now() as any);
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
          <Text style={style.description}>{formatDateString} - </Text>
          <TextInput
            onChangeText={(text) => setNewTags(text)}
            value={newTags || noteItem?.tags?.map((tag) => `#${tag}`).join(" ")}
            style={style.description}
            placeholder="#example #work"
          />
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
        <Button style={[style.button, style.buttonMain]} onPress={createNote}>
          Continue
        </Button>
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
