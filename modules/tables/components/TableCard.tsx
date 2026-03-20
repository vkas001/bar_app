import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Table } from '../types/table.types';
import { Badge } from './Badge';

type Props = {
    table: Table;
    selected: boolean;
    onPress: () => void;
}

export const TableCard = ({
    table, selected, onPress
}: Props) => {
    return (
        <Pressable
            onPress={onPress}
            className={`w-full h-80 p-10 rounded-lg bg-['#262626'] border ${selected ? "border-yellow" : "border-neutral-700"
                }`}
        >
            {/* Top Row */}
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-yellow font-bold text-2xl">
                    {table.label}
                </Text>

                <Badge label={table.status} />
            </View>

            {/* Center Circle */}
            <View className="flex-1 justify-center items-center">
                <View className="w-24 h-24 rounded-full bg-black items-center justify-center">
                    <Text className="text-white font-bold text-3xl">
                        N/A
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <Text className="text-zinc-300 text-center text-xl mt-2">
                Seats: {table.seats}
            </Text>
        </Pressable>
    );
};