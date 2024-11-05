import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import "../../../../global.css";
import { NoteCardProps } from "@/types/main.type";
import { notes, placeholders } from "@/constants/Notes";
import NoteView from "@/components/NoteView";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <NoteView
        noteItem={noteItem!}
        setNoteItem={setNoteItem}
        randomPlaceholder={randomPlaceholder}
      />
    </SafeAreaView>
  );
}
