import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TYPES, TableType } from '../types/table.types';

interface TableFilterProps {
    selectedType: TableType;
    setSelectedType: (type: TableType) => void;
}

export default function TableFilter({ selectedType, setSelectedType }: TableFilterProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-1'>
            <View className="flex-row gap-2 py-1">
                {TYPES.map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => setSelectedType(type)}
                        className={`px-4 py-3 rounded-lg whitespace-nowrap ${selectedType === type ? "bg-yellow" : "bg-gray-500"
                            }`}
                    >
                        <Text
                            className={`font-bold text-lg ${selectedType === type ? "text-white" : "text-white"}`}
                        >
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}