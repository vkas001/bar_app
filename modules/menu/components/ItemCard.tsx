import { useResponsive } from '@/shared/hooks/useResponsive';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { MenuItemMerged } from '../types/menu.types';

interface Props {
    item: MenuItemMerged;
    onSelect: (item: MenuItemMerged) => void;
}

export default function ItemCard({ item, onSelect }: Props) {
    const {
        isSmallPhone,
        isTablet,
        isLargeTablet,
        textXs,
        textSm,
        textBase,
        textLg,
        textXl,
        iconSm,
        iconMd,
        size,
    } = useResponsive()

    const isVeg = item.item_category.name.toLowerCase().includes('veg');
    const units = Array.isArray(item.units) ? item.units : [];
    const hasMultipleUnits = units.length > 1;

    const cardPadding = isSmallPhone ? 10 : isTablet ? 20 : 14
    const cardRadius = isSmallPhone ? 10 : 12
    const cardMb = isSmallPhone ? 'mb-2' : 'mb-4'

    const nameSize = isSmallPhone ? textSm : textBase
    const metaSize = isSmallPhone ? textXs : textBase
    const tagSize = isSmallPhone ? textXs : textBase
    const priceSize = isSmallPhone ? textSm : textBase
    const btnTextSize = isSmallPhone ? textBase : textXl
    const btnPy = isSmallPhone ? 'py-1.5' : 'py-2'

    const cartBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8'
    const cartIconSize = isSmallPhone ? iconSm : iconMd

    const tagPx = isSmallPhone ? 'px-1 py-0.5' : 'px-1.5 py-0.5'
    const tagGap = isSmallPhone ? size.padding.sm : size.padding.md

    return (
        <View
            className={`flex-1 bg-[#1e1e1e] border border-[#333] ${cardMb}`}
            style={{ borderRadius: cardRadius, padding: cardPadding }}
        >
            {/* Top row: name + cart button */}
            <View
                className='flex-row justify-between items-start'
                style={{ marginBottom: isSmallPhone ? 4 : 8 }}
            >
                <Text
                    className={`text-white font-medium flex-1 pr-2 ${nameSize}`}
                    numberOfLines={2}
                >
                    {item.item_name}
                </Text>
                <TouchableOpacity
                    className={`${cartBtnSize} rounded-lg bg-[#1a5c3a] justify-center items-center`}
                >
                    <Ionicons name="cart" size={cartIconSize} color="#4ade80" />
                </TouchableOpacity>
            </View>

            {/* Group */}
            <Text
                className={`text-[#888] ${metaSize}`}
                style={{ marginBottom: isSmallPhone ? 4 : 8 }}
            >
                {item.item_group.name}
            </Text>

            {/* Tags */}
            <View
                className='flex-row flex-wrap'
                style={{ gap: tagGap, marginBottom: isSmallPhone ? 8 : 12 }}
            >
                <View className={`bg-[#166df0] rounded-lg ${tagPx}`}>
                    <Text className={`font-medium text-white ${tagSize}`}>
                        {item.item_category.name}
                    </Text>
                </View>
                <View className={`bg-[#15d15a] rounded-lg ${tagPx}`}>
                    <Text className={`font-medium text-white ${tagSize}`}>
                        {item.item_group.name}
                    </Text>
                </View>
            </View>

            {/* Price */}
            <Text
                className={`text-white font-medium ${priceSize}`}
                style={{ marginBottom: isSmallPhone ? 4 : 8 }}
            >
                Rs. {item.item_unit_price}
                {hasMultipleUnits && (
                    <Text className={`text-white ${priceSize}`}> +</Text>
                )}
            </Text>

            {hasMultipleUnits && (
                <Text
                    className={`text-white ${metaSize}`}
                    style={{ marginBottom: isSmallPhone ? 8 : 12 }}
                >
                    {units.length} options available
                </Text>
            )}

            {/* Select button */}
            <TouchableOpacity
                className={`bg-[#e5a100] rounded-lg items-center mt-1 ${btnPy}`}
                onPress={() => onSelect(item)}
            >
                <Text className={`text-black font-bold ${btnTextSize}`}>Select</Text>
            </TouchableOpacity>
        </View>
    );
}