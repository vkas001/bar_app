import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
    name?: string;
    role?: string;
}

export default function ProfileDialog({
    visible,
    onClose,
    name = "User",
    role = "Waiter",
}: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/70 justify-center px-4">
                <View className="bg-[#23232b] rounded-2xl p-6 w-full shadow-lg">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="self-end mb-2">
                        <Ionicons name="close" size={22} color="#bbb" />
                    </TouchableOpacity>

                    {/* Profile */}
                    <View className="flex-row items-center gap-4 mb-4">
                        <View className='bg-black rounded-full p-3 border border-[#444] mr-3'>
                            <FontAwesome5 name="user" size={28} color="#f5f5f5" />
                        </View>
                        <View>
                            <Text className="text-white text-xl font-bold mb-1">
                                {name}
                            </Text>
                            <Text className="text-gray-400 text-base">
                                {role}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}