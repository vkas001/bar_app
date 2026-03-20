import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableStatusFilterProps {
    hideOccupied?: boolean;
    setHideOccupied: (value: boolean) => void;
}

export default function TableStatusFilter({ hideOccupied, setHideOccupied }: TableStatusFilterProps) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => setHideOccupied(!hideOccupied)}
                className={`px-4 py-4 rounded-lg whitespace-nowrap ${hideOccupied ? '' : 'bg-zinc-700'}`}
                style={hideOccupied ? { backgroundColor: '#f2b9b9' } : undefined}
            >
                <Text className={`font-bold text-lg ${hideOccupied ? 'text-white' : 'text-white'}`}>
                    {hideOccupied ? 'Show Occupied' : 'Hide Occupied'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}