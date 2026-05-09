import { useResponsive } from '@/shared/hooks/useResponsive';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Table } from '../types/table.types';

type Props = {
    table: Table;
    selected: boolean;
    onPress: (id: string) => void;
    selectable?: boolean;
}

const TableCardComponent = ({
    table,
    selected,
    onPress,
    selectable = true
}: Props) => {
    const {
        isSmallPhone,
        isTablet,
        isLargeTablet,
        textXs,
        textSm,
        textBase,
        textLg,
        textXl,
        text2xl,
        text3xl,
        rsc,
        size,
    } = useResponsive()

    const isUnavailable = !selectable && (!table.is_available || !table.is_active);
    const fullText = `${table.table_type.name}:${table.name}`;
    const isLong = fullText.length > 9;

    // Card height scales with screen
    const cardHeight = isLargeTablet ? 320 : isTablet ? 280 : isSmallPhone ? 180 : 220

    // Avatar circle size
    const avatarSize = isLargeTablet ? 96 : isTablet ? 88 : isSmallPhone ? 52 : 68

    // Table name text size (smaller on phone)
    const tableNameSize = isSmallPhone
        ? textXs
        : isTablet
            ? (isLong ? textBase : text2xl)
            : (isLong ? textBase : textXl)

    // Status text size (smaller on phone)
    const statusTextSize = isSmallPhone ? textXs : !isTablet ? textXs : textLg
    const badgePx = isSmallPhone ? 'px-2 py-0.5' : 'px-4 py-1'
    const namePx = isSmallPhone ? 'px-2 py-1' : 'px-3 py-2'
    const seatsTextSize = isSmallPhone ? textBase : textLg
    const avatarLabelSize = isSmallPhone ? textSm : textBase

    return (
        <Pressable
            onPress={isUnavailable ? undefined : () => onPress(table.id)}
            className={`w-full p-4 rounded-lg ${isUnavailable
                ? 'opacity-50 bg-red-900/20 border-2 border-red-500/30'
                : selected
                    ? 'bg-[#262626] border-2 border-yellow'
                    : 'bg-[#262626] border-2 border-transparent'
                }`}
            style={{ height: cardHeight }}
        >
            {/* Top Row: name + status badge */}
            <View className="flex-row justify-between items-center mb-2">
                <View className={`bg-[#23272f] rounded-full flex-shrink ${namePx}`}>
                    <Text
                        className={`text-yellow font-bold ${tableNameSize}`}
                        numberOfLines={1}
                    >
                        {fullText}
                    </Text>
                </View>

                <View
                    className={`rounded-lg border flex-shrink-0 ${badgePx} ${isUnavailable
                        ? 'bg-red-900/30 border-red-400/30'
                        : table.status === 'Booked'
                            ? 'bg-green-900/30 border-green-400/30'
                            : 'bg-green-900/30 border-yellow'
                        }`}
                >
                    <Text
                        className={`font-medium ${statusTextSize} ${isUnavailable
                            ? 'text-red-400'
                            : table.status === 'Booked'
                                ? 'text-green-400'
                                : 'text-yellow'
                            }`}
                    >
                        {isUnavailable ? 'Occupied' : (table.status ?? 'Available')}
                    </Text>
                </View>
            </View>

            {/* Center: Free/Busy avatar */}
            <View className="flex-1 justify-center items-center">
                <View
                    className={`rounded-full items-center justify-center ${table.is_available ? 'bg-green-800' : 'bg-red-900'
                        }`}
                    style={{ width: avatarSize, height: avatarSize }}
                >
                    <Text className={`text-white font-bold text-center ${avatarLabelSize}`}>
                        {table.is_available ? 'Free' : 'Busy'}
                    </Text>
                </View>
            </View>

            {/* Footer: seats */}
            <Text className={`text-[#ababab] text-center mt-2 ${seatsTextSize}`}>
                Seats:{' '}
                <Text className={`text-white font-medium ${seatsTextSize}`}>
                    {table.capacity}
                </Text>
            </Text>
        </Pressable>
    );
};

export const TableCard = React.memo(TableCardComponent, (prev, next) => {
    return (
        prev.selected === next.selected &&
        prev.selectable === next.selectable &&
        prev.table.id === next.table.id &&
        prev.table.name === next.table.name &&
        prev.table.capacity === next.table.capacity &&
        prev.table.status === next.table.status &&
        prev.table.is_available === next.table.is_available &&
        prev.table.is_active === next.table.is_active &&
        prev.table.table_type.name === next.table.table_type.name
    );
});