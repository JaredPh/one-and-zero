import { Platform } from "react-native";

export const getHostUrl = () =>
  Platform.OS === "web"
    ? process.env.VITE_WEB_HOST
    : process.env.VITE_NATIVE_HOST;
