import { log, logError, installGlobalErrorHandlers } from "@/shared/debug/startupLog";
import { Stack } from "expo-router";
import { useLoadFonts } from "../fonts";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from '@/shared/ui/toast/toast.context'

log("module load: app/_layout.tsx");

installGlobalErrorHandlers();

const nativeProbes = {
  "expo-font": () => { try { require("expo-font"); return "ok"; } catch (e: any) { return e?.message; } },
  "expo-secure-store": () => { try { require("expo-secure-store"); return "ok"; } catch (e: any) { return e?.message; } },
  "expo-blur": () => { try { require("expo-blur"); return "ok"; } catch (e: any) { return e?.message; } },
  "expo-splash-screen": () => { try { require("expo-splash-screen"); return "ok"; } catch (e: any) { return e?.message; } },
  "@react-native-async-storage/async-storage": () => { try { require("@react-native-async-storage/async-storage"); return "ok"; } catch (e: any) { return e?.message; } },
  "react-native-reanimated": () => { try { require("react-native-reanimated"); return "ok"; } catch (e: any) { return e?.message; } },
  "react-native-gesture-handler": () => { try { require("react-native-gesture-handler"); return "ok"; } catch (e: any) { return e?.message; } },
  "react-native-screens": () => { try { require("react-native-screens"); return "ok"; } catch (e: any) { return e?.message; } },
};

export default function RootLayout() {
  log("RootLayout render start");

  for (const [name, probe] of Object.entries(nativeProbes)) {
    try {
      log(`native probe: ${name} -> ${probe()}`);
    } catch (e: any) {
      logError(`native probe failed: ${name}`, e?.message);
    }
  }

  const fontsLoaded = useLoadFonts();
  log("fontsLoaded =", fontsLoaded);

  if (!fontsLoaded) {
    return null;
  }

  log("RootLayout rendering ToastProvider + Stack");
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
