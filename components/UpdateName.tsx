import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { account } from "@/service/config.service"; // Ensure this points to your config file

interface NameUpdateFormProps {
  onUpdateSuccess: () => void; // Callback for when the update is successful
}

const NameUpdateForm: React.FC<NameUpdateFormProps> = ({ onUpdateSuccess }) => {
  const [name, setName] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await account.updateName(name);
      console.log("User name updated successfully:", response);
      Alert.alert("Success", "Your name has been updated successfully!");
      onUpdateSuccess(); // Call the success callback
    } catch (error) {
      console.error("Error updating user name:", error);
      Alert.alert(
        "Error",
        "There was an issue updating your name. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Update Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your new name"
      />
      <Button title="Update Name" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default NameUpdateForm;
