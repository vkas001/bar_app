import { initializeApiBaseUrl } from "@/shared/api/bootstrap";
import { ToastProvider } from '@/shared/ui/toast/toast.context';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useLoadFonts } from "../fonts";
import "./global.css";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    initializeApiBaseUrl();
  }, []);

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
