import { Client, Account, Databases } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID;
const PLATFORM_NAME = process.env.EXPO_PUBLIC_PLATFORM_NAME;
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID!)
  .setPlatform(PLATFORM_NAME!);

export const account = new Account(client);
export const databases = new Databases(client);
