import { account } from "./config.service";

export default class AuthService {
  async createEmailLoginService(id: string, email: string) {
    try {
      const sessionToken = await account.createEmailToken(id, email, true);
      const userId = sessionToken.userId;
      return userId;
    } catch (error) {
      console.log(error);
    }
  }
}
export async function updateUserName(name: string) {
  try {
    const response = await account.updateName(name);
    console.log("User name updated successfully:", response);
  } catch (error) {
    console.error("Error updating user name:", error);
  }
}
export async function getUser(): Promise<string | any> {
  try {
    const response = await account.get();
    return response.name;
  } catch (error) {
    console.error("Error updating user name:", error);
    return error;
  }
}
