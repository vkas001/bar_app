import { Stack } from "expo-router";
import { useLoadFonts } from "../fonts";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from '@/shared/ui/toast/toast.context'

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <StatusBar
        style="light"
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ToastProvider>
  );
}
