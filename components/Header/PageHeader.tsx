import { logout } from '@/modules/auth/services/auth.service';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import ConfirmDialog from '../confirmDialog';
import { router } from 'expo-router';

const useResponsive = () => {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const isLargeTablet = width >= 1024;
    const isLandscape = width > height;
    return { width, isTablet, isLargeTablet, isLandscape };
};

export default function PageHeader() {
    const [showDialog, setShowDialog] = useState(false);
    const { isTablet, isLargeTablet } = useResponsive();

    const handleLogout = async () => {
        await logout();
        setShowDialog(false);
        router.replace("/auth");
    };

    // Icon size scales per device tier
    const iconSize = isLargeTablet ? 24 : isTablet ? 22 : 18;

    return (
        <View className="bg-black sticky top-0 z-50">

            {/* Main Header */}
            <View
                className={`
                    flex-row justify-between items-center
                    py-4
                    ${isLargeTablet ? "px-12" : isTablet ? "px-8" : "px-4"}
                `}
            >
                {/* Logo + Brand Name */}
                <View
                    className={`
                        flex-row items-center flex-shrink-0
                        ${isLargeTablet ? "gap-5" : isTablet ? "gap-4" : "gap-3"}
                    `}
                >
                    <Image
                        source={require("../../assets/images/logo.png")}
                        className={`
                            ${isLargeTablet ? "h-14 w-28" : isTablet ? "h-12 w-24" : "h-10 w-20"}
                        `}
                        resizeMode="contain"
                    />
                    <Text
                        className={`
                            text-white font-bold
                            ${isLargeTablet ? "text-2xl" : isTablet ? "text-xl" : "text-base"}
                        `}
                    >
                        Vintage Bar
                    </Text>
                </View>

                {/* Action Buttons */}
                <View
                    className={`
                        flex-row items-center
                        ${isLargeTablet ? "gap-3" : isTablet ? "gap-2" : "gap-2"}
                    `}
                >
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="Notifications"
                        className={`
                            bg-[#1f1f1f] rounded-xl
                            ${isLargeTablet ? "p-4" : isTablet ? "p-3" : "p-3"}
                        `}
                    >
                        <FontAwesome name="bell" size={iconSize} color="#f5f5f5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="QR"
                        className={`
                            bg-[#1f1f1f] rounded-xl
                            ${isLargeTablet ? "p-4" : isTablet ? "p-3" : "p-3"}
                        `}
                    >
                        <FontAwesome name="qrcode" size={iconSize} color="#f5f5f5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="User"
                        className={`
                            bg-[#1f1f1f] rounded-xl
                            ${isLargeTablet ? "p-4" : isTablet ? "p-3" : "p-3"}
                        `}
                    >
                        <FontAwesome name="user" size={iconSize} color="#f5f5f5" />
                    </TouchableOpacity>

                    {/* Logout — ConfirmDialog moved outside TouchableOpacity */}
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="Logout"
                        className={`
                            bg-[#1f1f1f] rounded-xl
                            ${isLargeTablet ? "p-4" : isTablet ? "p-3" : "p-3"}
                        `}
                        onPress={() => setShowDialog(true)}
                    >
                        <Ionicons name="log-out" size={iconSize} color="#f5f5f5" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ConfirmDialog rendered outside the button to avoid event bubbling */}
            <ConfirmDialog
                visible={showDialog}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onConfirm={handleLogout}
                onCancel={() => setShowDialog(false)}
            />

        </View>
    );
}