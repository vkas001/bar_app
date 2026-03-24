import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableStatusFilterProps {
    hideOccupied?: boolean;
    setHideOccupied: (value: boolean) => void;
}

export default function TableStatusFilter({
    hideOccupied,
    setHideOccupied
}: TableStatusFilterProps) {
    return (
       <View className="flex-row gap-2">
            {/* All Tables */}
            <TouchableOpacity
                onPress={() => setHideOccupied(false)}
                className={`px-4 py-4 rounded-lg border ${
                    !hideOccupied
                        ? 'bg-yellow border-yellow'
                        : 'bg-transparent border-neutral-600'
                }`}
            >
                <Text className={`font-bold text-base ${
                    !hideOccupied ? 'text-black' : 'text-neutral-400'
                }`}>
                    All
                </Text>
            </TouchableOpacity>

            {/* Available Only */}
            <TouchableOpacity
                onPress={() => setHideOccupied(true)}
                className={`px-4 py-4 rounded-lg border ${
                    hideOccupied
                        ? 'bg-green-800 border-green-700'
                        : 'bg-transparent border-neutral-600'
                }`}
            >
                <Text className={`font-bold text-base ${
                    hideOccupied ? 'text-white' : 'text-neutral-400'
                }`}>
                    Available
                </Text>
            </TouchableOpacity>
        </View>
    )
}