import { Feather } from '@expo/vector-icons'; // Chevron icon
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ScreenHeaderProps {
    title: string;
    extraContent?: ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, extraContent }) => {
    const navigation = useNavigation();

    return (
        <View className="mb-2">
            <View className="flex-row items-center">
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={28} color="white" />
                </TouchableOpacity>

                {/* Screen Title */}
                <Text className="ml-4 text-2xl font-bold text-white">
                    {title}
                </Text>

                {extraContent ? <View className="ml-auto pr-4">
                    {extraContent}
                </View> : null}
            </View>
        </View>
    );
};

export default ScreenHeader;