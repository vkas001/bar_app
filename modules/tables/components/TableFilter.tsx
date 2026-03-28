import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TableType } from '../types/table.types';  // remove TYPES import

interface TableFilterProps {
    selectedType: TableType;
    setSelectedType: (type: TableType) => void;
    tableTypes: string[];   // ← add this
}

export default function TableFilter({
    selectedType,
    setSelectedType,
    tableTypes,             // ← add this
}: TableFilterProps) {
    return (
        <ScrollView
            horizontal showsHorizontalScrollIndicator={false}
            className='flex-1'>
            <View className="flex-row gap-2 py-1">
                {tableTypes.map((type) => (   // ← use prop instead of TYPES
                    <TouchableOpacity
                        key={type}
                        onPress={() => setSelectedType(type)}
                        className={`px-4 py-3 rounded-lg whitespace-nowrap ${
                            selectedType === type ? "bg-yellow" : "bg-gray-500"
                        }`}
                    >
                        <Text className="text-white font-bold text-lg">
                            {type === 'AllTypes' ? 'AllTypes' : `${type}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}