import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SharedElement } from "react-native-shared-element";
import { NoteCardProps, TodoRouteParams } from "@/types/main.type";
import { RouteProp } from "@react-navigation/native";

interface TodoProps {
  route: RouteProp<{ params: TodoRouteParams }, "params">;
  item: any;
}

const Todo: React.FC<TodoProps> = (props) => {
  // const { item } = route.params;
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <SharedElement id={item.id}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>📋</Text>
        </View>
      </SharedElement>
      {/* <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.dateAndTime}>{item.dateandtime}</Text>
      <Text style={styles.description}>{item.description}</Text> */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mark as Done</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define the sharedElements property
(Todo as any).sharedElements = (route: any) => {
  const { item } = route.params;
  return [{ id: `item.${item.id}.icon` }];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  iconText: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateAndTime: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Todo;
