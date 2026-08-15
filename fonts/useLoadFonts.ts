import { useFonts } from "expo-font";
import { log, logError } from "@/shared/debug/startupLog";

import {
    Poppins_600SemiBold,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
} from "@expo-google-fonts/inter";

export function useLoadFonts() {
    log("useLoadFonts: calling useFonts");
    const [loaded, error] = useFonts({
        Poppins_600SemiBold,
        Poppins_700Bold,

        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    });

    if (error) {
        logError("useFonts ERROR", error?.message, error?.stack);
    }
    log("useFonts returned loaded =", loaded);

    return loaded;
}