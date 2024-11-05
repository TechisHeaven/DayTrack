import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../../global.css";
import { NoteCardProps } from "@/types/main.type";
import { notes, placeholders } from "@/constants/Notes";
import Button from "@/components/Button";
import NoteView from "@/components/NoteView";
import Header from "@/components/Header";

export default function Note() {
  const [noteItem, setNoteItem] = useState<NoteCardProps | null>(null);
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
