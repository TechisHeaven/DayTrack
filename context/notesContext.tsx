// contexts/NotesContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { databases } from "@/service/config.service";
import { NoteCardProps } from "@/types/main.type";
import { useAuthStore } from "@/store/authStore";
import { Query } from "react-native-appwrite";

interface NotesContextProps {
  notes: NoteCardProps[];
  fetchNotesData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthStore();
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNotesData() {
    setLoading(true);
    setError(null);
    try {
      const result = await databases.listDocuments(
        "672a448300359977d5dc", // Database ID
        "672a4494002282b6181f", // Collection ID
        [
          Query.equal("userId", user.$id),
          Query.select([
            "$id",
            "title",
            "description",
            "tags",
            "dateandtime",
            "$updatedAt",
          ]),
        ]
      );
      setNotes(result.documents as any);
    } catch (err) {
      setError("Failed to fetch notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.$id) {
      fetchNotesData();
    }
  }, [user]);

  return (
    <NotesContext.Provider value={{ notes, fetchNotesData, loading, error }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextProps => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
