import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import BottomSheetPopover from "@/components/BottomSheet";
import CheckYourEmail from "@/components/CheckYourEmail";

export default function Login() {
  const [formState, setFormState] = useState<{ email: string; error: string }>({
    email: "",
    error: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const handleContinue = () => {
    if (!validate(formState.email)) return;

    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      // Call handleLogin only when modal is about to open
      handleLogin();
    } else {
      handleClose();
    }
  };

  function validate(email: string) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(email)) {
      setFormState({ email, error: "Please enter a valid email address." });
      return false;
    }
    setFormState({ email, error: "" });
    return true;
  }

  function handleChangeInput(text: string) {
    setFormState({ email: text, error: "" });
    validate(text); // Revalidate on input change
  }

  function handleLogin() {
    if (!validate(formState.email)) return;
    console.log("Yayyy you logged in");
    // Show bottom sheet on successful login
    setModalVisible(true); // This opens the modal
  }

  const handleOpen = () => {
    console.log("Bottom sheet opened");
  };

  const handleClose = () => {
    console.log("Bottom sheet closed");
    setModalVisible(false); // Close the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.smallHeading}>Welcome</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          Sign in or create an{" "}
          <Text style={styles.highlightedText}>account</Text>
        </Text>
        <View>
          <Text style={styles.smallDescription}>
            Your everyday task manager is here!
          </Text>
          <Text style={styles.smallDescription}>
            Please enter your email to start
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleChangeInput}
          value={formState.email}
          placeholder="Email Address"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          style={[styles.input, formState.error ? styles.inputError : null]}
        />
        {formState.error ? (
          <Text style={styles.errorText}>{formState.error}</Text>
        ) : null}
        <Button style={styles.button} onPress={handleContinue}>
          Continue
        </Button>
        <BottomSheetPopover
          toggleModal={handleContinue}
          isOpened={isModalVisible}
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <CheckYourEmail email={formState.email} onClose={handleClose} />
        </BottomSheetPopover>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    borderRadius: 20,
  },
  heading: {
    color: "white",
    fontSize: 46,
    textAlign: "left",
    fontWeight: "800",
  },
  smallHeading: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  smallDescription: {
    color: "gray",
    fontSize: 18,
  },
  highlightedText: {
    color: "#cfff46",
  },
  headerContainer: {
    paddingVertical: 20,
    flexDirection: "column",
    gap: 12,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    borderColor: "gray",
    fontSize: 18,
    color: "white",
    borderWidth: 0.4,
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
