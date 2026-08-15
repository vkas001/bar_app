import "@/shared/reanimated/disableReducedMotion";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useLoadFonts } from "../fonts";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from '@/shared/ui/toast/toast.context'
import { SplashScreen } from '@/modules/splash/SplashScreen'

const MIN_SPLASH_DURATION = 2400;

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || !minTimeElapsed) {
    return <SplashScreen />;
  }

  return (
    <ToastProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ToastProvider>
  );
}