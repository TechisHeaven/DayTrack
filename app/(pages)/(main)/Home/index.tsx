import Button from "@/components/Button";
import NoteCard from "@/components/NoteCard";
import TabList from "@/components/TabList";
import { notes } from "@/constants/Notes";
import { NoteCardProps } from "@/types/main.type";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import { router } from "expo-router";
import { FlatList } from "react-native";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("grid");

  const tabs = [
    "all",
    "personal",
    "work",
    "fitness",
    "skills",
    "normal expenses",
  ];

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

  // Render item function
  const renderItem = ({ item }: { item: NoteCardProps }) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.noteContainer, !isGrid && styles.noteContainerList]}
    >
      <NoteCard
        id={item.id}
        title={item.title}
        dateandtime={item.dateandtime}
        description={item.description}
        styles={!isGrid ? styles.noteCardContainer : {}}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.heading, { fontFamily: "AntonRegular" }]}>
          Your Notes
        </Text>
        <View style={styles.create}>
          <Icon name="plus" style={styles.icon} />
        </View>
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
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id as string}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={columnCount}
        key={isGrid ? "grid" : "row"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    gap: 10,
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
  },
  noteContainerList: {
    maxWidth: "100%", // Adjusts the width to fit two items per row
  },
});
