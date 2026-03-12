import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

const checkIsMobile = () => {
    // On iOS, use the definitive platform flag — covers iPad Mini, iPad Air, etc.
    if (Platform.OS === "ios") {
        return !Platform.isPad;
    }
    // On Android, 600dp is the standard tablet breakpoint (even small 7" tablets)
    const { width, height } = Dimensions.get("window");
    return Math.min(width, height) < 600;
};

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(checkIsMobile);

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", () => {
            setIsMobile(checkIsMobile());
        });
        return () => subscription.remove();
    }, []);

    return isMobile;
};