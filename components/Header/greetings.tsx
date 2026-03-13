import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { adToBs } from "@sbmdkl/nepali-date-converter";

const Greetings = () => {
    const [dateTime, setDateTime] = useState(new Date());

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
        <View className="flex-row justify-between items-center px-8 mt-5 pb-3">
            <View>
                <Text className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
                    {getGreeting()}, {"Vintage Lounge & Bar"}!
                </Text>
                <Text className="text-[#ababab] text-sm">
                    Give your best services for customers 😀
                </Text>
            </View>

            <View>
                <Text className="text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]">
                    {formatTime(dateTime)}
                </Text>
                <Text className="text-[#ababab] text-sm">{getCurrentDateInBS()}</Text>
            </View>
        </View>
    );
};

export default Greetings;