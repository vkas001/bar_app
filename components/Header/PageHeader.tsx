import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function PageHeader() {
    return (

        <View className="bg-black sticky top-0 z-50">

            {/* Main Header */}
            <View className='flex-row justify-between  items-center py-4 px-4 md:px-8'>
                {/* Logo */}
                <View className="flex-row items-center gap-4 flex-shrink-0">
                    <Image
                        source={require("../../assets/images/logo.png")}
                        className="h-10 w-20"
                    />
                    <Text className="text-white text-xl font-bold">
                        Vintage Bar
                    </Text>
                </View>

                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="Notifications"
                        className="bg-[#1f1f1f] rounded-[12px] p-3"
                    >
                        <FontAwesome name="bell" size={18} color="#f5f5f5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="QR"
                        className="bg-[#1f1f1f] rounded-[12px] p-3"
                    >
                        <FontAwesome name="qrcode" size={18} color="#f5f5f5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="User"
                        className="bg-[#1f1f1f] rounded-[12px] p-3"
                    >
                        <FontAwesome name="user" size={18} color="#f5f5f5" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="More menu"
                        className="bg-[#1f1f1f] rounded-[12px] p-3"
                    >
                        <FontAwesome name="bars" size={18} color="#f5f5f5" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}