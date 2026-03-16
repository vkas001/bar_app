import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Chevron icon

interface ScreenHeaderProps {
    title: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row items-cente mb-2">
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={28} color="white" />
            </TouchableOpacity>

            {/* Screen Title */}
            <Text className="text-white text-2xl font-bold ml-4">{title}</Text>
        </View>
    );
};

export default ScreenHeader;