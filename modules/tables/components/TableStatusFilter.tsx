import { useResponsive } from '@/shared/hooks/useResponsive';
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
    const { isPhone, isSmallPhone, textSm, textBase, size } = useResponsive()

    const btnPx = isSmallPhone ? 'px-2' : 'px-1.5'
    const btnPy = isSmallPhone ? 'py-2' : 'py-1'
    const labelSize = isSmallPhone ? textSm : textSm

    //  Phone: single toggle button 
    if (isPhone) {
        return (
            <TouchableOpacity
                onPress={() => setHideOccupied(!hideOccupied)}
                className={`rounded-lg border ${btnPx} ${btnPy} ${
                    hideOccupied
                        ? 'bg-green-800 border-green-700'
                        : 'bg-yellow border-yellow'
                }`}
            >
                <Text className={`font-bold ${labelSize} ${hideOccupied ? 'text-white' : 'text-black'}`}>
                    {hideOccupied ? 'Available' : 'All'}
                </Text>
            </TouchableOpacity>
        )
    }

    // Tablet: two buttons
    return (
        <View className="flex-row" style={{ gap: size.padding.sm }}>
            <TouchableOpacity
                onPress={() => setHideOccupied(false)}
                className={`${btnPx} ${btnPy} rounded-lg border ${
                    !hideOccupied ? 'bg-yellow border-yellow' : 'bg-transparent border-neutral-600'
                }`}
            >
                <Text className={`font-bold ${labelSize} ${!hideOccupied ? 'text-black' : 'text-neutral-400'}`}>
                    All
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setHideOccupied(true)}
                className={`${btnPx} ${btnPy} rounded-lg border ${
                    hideOccupied ? 'bg-green-800 border-green-700' : 'bg-transparent border-neutral-600'
                }`}
            >
                <Text className={`font-bold ${labelSize} ${hideOccupied ? 'text-white' : 'text-neutral-400'}`}>
                    Available
                </Text>
            </TouchableOpacity>
        </View>
    )
}