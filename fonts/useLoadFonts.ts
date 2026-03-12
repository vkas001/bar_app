import { useFonts } from "expo-font";

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
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_700Bold,

        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    });

    return loaded;
}