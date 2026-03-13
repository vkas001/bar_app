import { Stack } from "expo-router";
import { useLoadFonts } from "../fonts";
import "./global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        style="light"
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
