import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface TablistProps {
  tabs: string[];
  onTabSelect: (tab: string) => void;
}
const TabList = ({ tabs, onTabSelect }: TablistProps) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0]);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    onTabSelect(tab); // Notify parent component of the selected tab
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.tab, selectedTab === item ? styles.selectedTab : null]}
      onPress={() => handleTabPress(item)}
    >
      <Text
        style={selectedTab === item ? styles.selectedTabText : styles.tabText}
      >
        #{item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tabs}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContainer}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 10,
  },
  tab: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: "#cfff46",
  },
  tabText: {
    color: "white",
  },
  selectedTabText: {
    color: "#000",
    fontWeight: "600",
  },
});

export default TabList;
