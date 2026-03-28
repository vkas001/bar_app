import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
    visible: boolean;
    imageSource: any;
    onClose: () => void;
}

export default function QrDialog({
    visible,
    imageSource,
    onClose,
}: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black justify-center items-center">

                {/* Card */}
                <View
                    className="bg-[#1c1c1e] rounded-2xl p-8"
                    style={{ width: '80%' }}
                >

                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-8">
                        <Text className="text-white font-bold text-lg">
                            Payment QR Code - Vintage Lounge & Bar
                        </Text>

                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={20} color="#aaa" />
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View className="h-[1px] bg-[#2a2a2a] mb-8" />

                    {/* Description */}
                    <Text className="text-gray-300 text-center text-lg mb-5">
                        Scan this QR code to make payment for your bar tab at Vintage Lounge & Bar.
                    </Text>

                    {/* QR */}
                    <View className="bg-white p-6 rounded-2xl self-center mb-7">
                        <Image
                            source={imageSource}
                            className="h-64 w-64"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Payment Methods */}
                    <Text className="text-gray-400 text-center text-lg mb-3">
                        Supported Payment Methods:
                    </Text>

                    <View className="flex-row justify-center gap-2 mb-4 flex-wrap">
                        {["eSewa", "Khalti", "IME Pay", "UPI"].map((item) => (
                            <View
                                key={item}
                                className="bg-[#2a2a2a] px-3 py-1 rounded-full"
                            >
                                <Text className="text-gray-200 text-base">{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Footer */}
                    <Text className="text-gray-400 text-center text-lg">
                        Use your preferred payment app to scan and pay.
                    </Text>
                </View>
            </View>
        </Modal>
    );
}