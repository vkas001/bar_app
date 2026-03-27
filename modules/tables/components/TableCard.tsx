import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Table } from '../types/table.types';
import { Badge } from './Badge';

type Props = {
    table: Table;
    selected: boolean;
    onPress: () => void;
}

export const TableCard = ({ table, selected, onPress }: Props) => {
    const isUnavailable = !table.is_available || !table.is_active;

    const fullText = `${table.table_type.name}:${table.name}`;
    const isLong = fullText.length > 9;

    return (
        <Pressable
            onPress={isUnavailable ? undefined : onPress}
            className={`
                w-full h-80 p-4 rounded-lg
                ${isUnavailable
                    ? 'opacity-50 bg-red-900/20 border-2 border-red-500/30'
                    : selected
                        ? 'bg-[#262626] border-2 border-yellow'
                        : 'bg-[#262626] border-2 border-transparent'
                }
            `}
        >
            {/* Top Row: group:name + status badge */}
            <View className="flex-row justify-between items-center mb-2">
                <View className="bg-[#23272f] px-3 py-1.5 rounded-full">
                    <Text
                        className={`text-yellow font-bold ${isLong ? "text-xl" : "text-3xl"
                            }`}
                        numberOfLines={1}
                    >
                        {fullText}
                    </Text>
                </View>

                <View className={`px-4 py-1 rounded-lg border ${isUnavailable
                    ? 'bg-red-900/30 border-red-400/30'
                    : table.status === 'Booked'
                        ? 'bg-green-900/30 border-green-400/30'
                        : 'bg-green-900/30 border-yellow'
                    }`}>
                    <Text className={`text-lg font-medium ${isUnavailable
                        ? 'text-red-400'
                        : table.status === 'Booked'
                            ? 'text-green-400'
                            : 'text-yellow'
                        }`}>
                        {isUnavailable ? 'Occupied' : (table.status ?? 'Available')}
                    </Text>
                </View>
            </View>

            {/* Center: initials avatar */}
            <View className="flex-1 justify-center items-center">
                <View className={`w-24 h-24 rounded-full items-center justify-center ${table.is_available ? "bg-green-800" : "bg-red-900"
                    }`}>
                    <Text className="text-white font-bold text-lg text-center">
                        {table.is_available ? 'Free' : 'Busy'}
                    </Text>
                </View>
            </View>

            {/* Footer: seats */}
            <Text className="text-[#ababab] text-center text-lg mt-2">
                Seats: <Text className="text-white font-medium">
                    {table.capacity}
                </Text>
            </Text>
        </Pressable>
    );
};