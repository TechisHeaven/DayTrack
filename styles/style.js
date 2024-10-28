import { StyleSheet } from "react-native";
import "../global.css";
export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  gradientBackground: {
    backgroundColor: "linear-gradient(to right, #000, #fff)",
  },
  heading: {
    color: "white",
    fontSize: 50,
    textAlign: "left",
    maxWidth: "80%",
    fontWeight: "800",
  },
});
