import { adToBs } from "@sbmdkl/nepali-date-converter";
import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";

const useResponsive = () => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const isLargeTablet = width >= 1024;
    const isLandscape = width > height;

    return { width, isTablet, isLargeTablet, isLandscape };
};

const Greetings = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const { isTablet, isLargeTablet } = useResponsive();

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) =>
        `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const formatDateToYYYYMMDD = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getCurrentDateInBS = () => {
        const currentDateAD = formatDateToYYYYMMDD(dateTime);
        return adToBs(currentDateAD);
    };

    const getGreeting = () => {
        const hour = dateTime.getHours();
        if (hour < 12) return "Good Morning";
        else if (hour < 17) return "Good Afternoon";
        else return "Good Evening";
    };

    return (
        <View
            className={`
                flex-row justify-between items-center
                mt-3 pb-3
                ${isLargeTablet ? "px-12" : isTablet ? "px-8" : "px-4"}
            `}
        >
            {/* ── Left: Greeting + subtitle ── */}
            <View className="flex-1 mr-3">
                <Text
                    className={`
                        text-[#f5f5f5] font-semibold tracking-wide
                        ${isLargeTablet ? "text-3xl" : isTablet ? "text-2xl" : "text-lg"}
                    `}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {getGreeting()}, {"Vintage Lounge & Bar"}!
                </Text>
                <Text
                    className={`
                        text-[#ababab] mt-1
                        ${isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-sm"}
                    `}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    Give your best services for customers 😀
                </Text>
            </View>

            {/* ── Right: Clock + BS date ── */}
            <View className="items-end">
                <Text
                    className={`
                        text-[#f5f5f5] font-bold tracking-wide text-right
                        ${isLargeTablet ? "text-5xl w-48" : isTablet ? "text-4xl w-40" : "text-xl w-29"}
                    `}
                >
                    {formatTime(dateTime)}
                </Text>
                <Text
                    className={`
                        text-[#ababab] mt-1
                        ${isLargeTablet ? "text-base" : isTablet ? "text-sm" : "text-xs"}
                    `}
                >
                    {getCurrentDateInBS()}
                </Text>
            </View>
        </View>
    );
};

export default Greetings;