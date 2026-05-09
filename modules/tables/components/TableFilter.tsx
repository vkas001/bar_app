import { useResponsive } from '@/shared/hooks/useResponsive';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TableType } from '../types/table.types';

interface TableFilterProps {
    selectedType: TableType;
    setSelectedType: (type: TableType) => void;
    tableTypes: string[];
}

export default function TableFilter({
    selectedType,
    setSelectedType,
    tableTypes,
}: TableFilterProps) {
    const { isSmallPhone, isTablet, isLargeTablet, textSm, textBase, textLg, size } = useResponsive()

    const btnPx = isLargeTablet ? 'px-6' : isTablet ? 'px-5' : isSmallPhone ? 'px-2' : 'px-1.5'
    const btnPy = isLargeTablet ? 'py-4' : isTablet ? 'py-3.5' : isSmallPhone ? 'py-2' : 'py-1'
    const labelSize = isLargeTablet ? textLg : isTablet ? textBase : isSmallPhone ? textSm : textSm

    return (

        <View
            className='flex-row py-1'
            style={{ gap: isSmallPhone ? size.padding.sm : size.padding.md }}
        >
            {tableTypes.map((type) => (
                <TouchableOpacity
                    key={type}
                    onPress={() => setSelectedType(type)}
                    className={`rounded-lg ${btnPx} ${btnPy} ${selectedType === type ? 'bg-yellow' : 'bg-gray-500'}`}
                >
                    <Text className={`font-bold text-white ${labelSize}`}>
                        {type}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}