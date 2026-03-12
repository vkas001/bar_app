import { Stack } from "expo-router";
import { useLoadFonts } from "../fonts";
import "./global.css";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
