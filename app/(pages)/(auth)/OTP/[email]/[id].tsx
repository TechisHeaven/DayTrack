import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button"; // Assuming you have a Button component
import { router, useGlobalSearchParams } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { setToken } from "@/utils/handleToken";
import { sleep } from "@/utils/handleSleep";
import { account } from "@/service/config.service";

export default function OTPPage() {
  const { email, id } = useGlobalSearchParams();
  const { login, setIsLoading } = useAuthStore();
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Adjust length as needed
  const inputRefs = useRef<(TextInput | null)[]>([]); // Store refs for TextInputs
  const [error, setError] = useState<string>("");
  const handleInputChange = (text: string, index: number) => {
    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = text;

    // Set updated OTP
    setOtp(newOtp);

    // Focus on next input if a digit is entered
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (otp.length < 4) return;
      const session = await account.createSession(id.toString(), otp.join(""));
      login();
      setIsLoading(false);
      router.push("/(main)/Home");
    } catch (error: any) {
      setError("Wrong OTP");
    }
    //verify here the code for now we will navigate to screen
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.description}>Code has been send to {email}</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => {
          const isFilled = digit.length > 0; // Check if the current input has value
          return (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.input, isFilled && styles.filledInput]} // Apply filledInput style if input is filled
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
            />
          );
        })}
      </View>
      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        style={[
          styles.button,
          !otp.every((d) => d.length > 0) && styles.buttonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!otp.every((d) => d.length > 0)}
      >
        <Text>Verify OTP</Text>
      </Button>
      <View style={{ display: "flex", padding: 10 }}>
        <Text style={styles.line}>Didn't get OTP Code?</Text>
        <Text style={[styles.line, { color: "#cfff46" }]}>Resend Code</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
  },
  line: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  filledInput: {
    backgroundColor: "#cfff46", // Change the background color to green when all fields are filled
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    backgroundColor: "#3c4043",
  },
  button: {
    borderRadius: 10,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
});
