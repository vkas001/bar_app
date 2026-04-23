import { useResponsive } from '@/shared/hooks/useResponsive';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { MenuCategoryWithItems } from '../types/menu.types';

const CATEGORY_COLORS = [
    '#6c63d4', '#10b98a', '#f59e0b', '#6366f1',
    '#ef4444', '#3b82f6', '#ec4899', '#14b8a6',
];

interface Props {
    category: MenuCategoryWithItems;
    index: number;
    isSelected: boolean;
    onPress: () => void;
}

export default function CategoryCard({
    category,
    index,
    isSelected,
    onPress
}: Props) {
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
        iconXs,
        iconSm,
        iconMd,
        rsc,
        size,
    } = useResponsive()

    const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
    const isAllItems = category.name.toLowerCase().includes('all');
    const iconName = isAllItems ? 'apps' : 'cafe';

    const cardPadding = isLargeTablet ? 24 : isTablet ? 20 : isSmallPhone ? 8 : 8
    const cardMinHeight = isLargeTablet ? 140 : isTablet ? 130 : isSmallPhone ? 60 : 90
    const cardMargin = isSmallPhone ? 4 : 2

    const iconContainerSize = isSmallPhone ? 'w-8 h-8' : isTablet ? 'w-12 h-12' : 'w-10 h-10'
    const iconSize = isSmallPhone ? iconXs : iconMd
    const iconRadius = isSmallPhone ? 'rounded-md' : 'rounded-lg'

    const nameSize = isSmallPhone ? textBase : isTablet ? text2xl : textSm
    const itemCountSize = isSmallPhone ? textSm : textBase

    const selectedDotOuter = isSmallPhone ? 'w-4 h-4' : 'w-5 h-5'
    const selectedDotInner = isSmallPhone ? 'w-2 h-2' : 'w-3 h-3'

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color,
                borderWidth: isSelected ? 1 : 0,
                borderColor: '#fff',
                minHeight: cardMinHeight,
                justifyContent: 'center',
                width: 200,
                borderRadius: isSmallPhone ? 14 : 16,
                padding: cardPadding,
                margin: cardMargin,
            }}
        >
            {/* Top row: icon + name + selected indicator */}
            <View
                className='flex-row items-center'
                style={{ marginBottom: isSmallPhone ? 8 : 16 }}
            >
                <View
                    className={`${iconContainerSize} ${iconRadius} 
                    bg-white/25 justify-center items-center`}
                    style={{ marginRight: size.padding.sm }}
                >
                    <Ionicons name={iconName} size={iconSize} color="#fff" />
                </View>

                <Text
                    className={`text-white flex-1 ${nameSize}`}
                    numberOfLines={1}
                >
                    {category.name}
                </Text>

                {isSelected && (
                    <View
                        className={`${selectedDotOuter} 
                        rounded-full border-2 border-white justify-center items-center`}
                        style={{ marginLeft: size.padding.sm }}
                    >
                        <View className={`${selectedDotInner} 
                        rounded-full bg-white`} />
                    </View>
                )}
            </View>

            {/* Item count */}
            <Text className={`text-white/80 ${itemCountSize}`}>
                {category.items.length} Items
            </Text>
        </TouchableOpacity>
    );
}