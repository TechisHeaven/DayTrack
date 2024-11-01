import * as SecureStore from "expo-secure-store";
export async function setToken() {
  await SecureStore.setItemAsync("secure_token", "sahdkfjaskdflas$%^&");
  const token = await SecureStore.getItemAsync("secure_token");
  return token;
}
