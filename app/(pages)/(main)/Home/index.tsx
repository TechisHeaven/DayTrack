import Button from "@/components/Button";
import NoteCard from "@/components/NoteCard";
import TabList from "@/components/TabList";
import { NoteCardProps } from "@/types/main.type";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useAuthStore } from "@/store/authStore";
import DialogModal from "@/components/Dialog";
import NameUpdateForm from "@/components/UpdateName";
import { useNotes } from "@/context/notesContext";
import Loading from "@/components/Loading";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("grid");
  const { user } = useAuthStore();
  const { notes, loading } = useNotes();

  useEffect(() => {
    if (!user.name) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user]);

  function handleCloseModal() {
    setIsVisible(false);
  }
  function handleUpateSession() {
    setIsVisible(false);
  }
  const tabs = [
    "all",
    "personal",
    "work",
    ...Array.from(new Set(notes.flatMap((note) => note?.tags || []))),
  ];

  console.log(tabs);
  // const tabs = [
  //   "all",
  //   "personal",
  //   "work",
  //   "fitness",
  //   "skills",
  //   "normal expenses",
  // ];

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab); // Update selected tab in the parent component
  };

  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  // Calculate number of columns based on screen width
  const getColumnCount = () => {
    if (screenWidth < 600) return isGrid ? 2 : 1; // Mobile (2 columns for grid, 1 for row)
    if (screenWidth < 900) return isGrid ? 3 : 2; // Tablet (3 columns for grid, 2 for row)
    return isGrid ? 4 : 3; // Larger screens (4 columns for grid, 3 for row)
  };

  const toggleLayout = (layout: "grid" | "list") => {
    setIsGrid(layout === "grid"); // Toggle layout state
    setSelectedLayout(layout); // Set the selected layout
  };

  const columnCount = getColumnCount();

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      selectedTab === "all"
        ? true
        : selectedTab
        ? note.tags?.includes(selectedTab)
        : note.tags?.length === 0
    );
  }, [notes]);

  // Render item function
  const renderItem = ({ item }: { item: NoteCardProps }) => (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/(main)/Note/[id]",
          params: { id: item.$id! },
        })
      }
      key={item.$id}
      style={[styles.noteContainer, !isGrid && styles.noteContainerList]}
    >
      <NoteCard
        id={item.$id!}
        title={item.title}
        dateandtime={item.dateandtime}
        description={item.description}
        styles={!isGrid ? styles.noteCardContainer : {}}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={[styles.heading, { fontFamily: "AntonRegular" }]}>
          Your Notes
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/Note")}
          style={styles.create}
        >
          <Icon name="plus" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.layoutToggle}>
        <Button
          onPress={() => toggleLayout("grid")}
          style={[
            styles.toggleButton,
            selectedLayout === "grid" ? styles.selectedButton : {},
          ]}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedLayout === "grid" ? styles.selectedButtonText : {},
            ]}
          >
            <IoniconsIcon name="grid-outline" style={styles.LayoutIcon} />
          </Text>
        </Button>
        <Button
          onPress={() => toggleLayout("list")}
          style={[
            styles.toggleButton,
            selectedLayout === "list" ? styles.selectedButton : {},
          ]}
        >
          <Text
            style={[
              styles.toggleButtonText,
              selectedLayout === "list" ? styles.selectedButtonText : {},
            ]}
          >
            <FontAwesomeIcon name="bars" style={styles.LayoutIcon} />
          </Text>
        </Button>
      </View>
      <View style={{ paddingVertical: 20 }}>
        <TabList tabs={tabs} onTabSelect={handleTabSelect} />
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id as string}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={columnCount}
        key={!isGrid ? "row" : "grid"}
      />
      <DialogModal isVisible={isVisible} onClose={handleCloseModal}>
        <NameUpdateForm onUpdateSuccess={handleUpateSession} />
      </DialogModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 10,
    paddingHorizontal: 12,
  },
  noteCardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    transform: "translate(0)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    color: "white",
    fontSize: 46,
    textAlign: "left",
    maxWidth: "80%",
    fontWeight: "800",
  },
  create: {
    padding: 12,
    width: 50,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
  layoutToggle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "transparent", // Default background color
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: "center",
    marginLeft: 10, // Adds space between buttons
  },
  selectedButton: {
    color: "gray",
  },
  selectedButtonText: {
    color: "white",
  },
  LayoutIcon: {
    fontSize: 22,
  },
  toggleButtonText: {
    color: "gray",
    fontSize: 28,
  },
  listContainer: {
    paddingBottom: 20, // Adjusts scroll area padding without padding the main container
  },
  noteContainer: {
    flex: 1,
    margin: 10, // Adds spacing between items
    maxWidth: "48%", // Adjusts the width to fit two items per row
    backgroundColor: "black",
  },
  noteContainerList: {
    maxWidth: "100%", // Adjusts the width to fit two items per row
  },
});
