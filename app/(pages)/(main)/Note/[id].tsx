import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import "../../../../global.css";
import { NoteCardProps } from "@/types/main.type";
import { placeholders } from "@/constants/Notes";
import NoteView from "@/components/NoteView";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { databases } from "@/service/config.service";
import Loading from "@/components/Loading";

export default function Note() {
  let { id }: { id: string } = useLocalSearchParams();

  const [noteItem, setNoteItem] = useState<NoteCardProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getNote() {
      setIsLoading(true);
      try {
        const result = await databases.getDocument(
          "672a448300359977d5dc",
          "672a4494002282b6181f",
          id
        );
        setNoteItem(result as any);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    getNote();
  }, []);

  // useMemo to Memorize the placeholder value on every render of Component
  const randomPlaceholder = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <NoteView
          noteItem={noteItem!}
          setNoteItem={setNoteItem}
          randomPlaceholder={randomPlaceholder}
        />
      )}
    </SafeAreaView>
  );
}
