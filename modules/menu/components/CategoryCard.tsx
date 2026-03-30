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

export default function CategoryCard({ category, index, isSelected, onPress }: Props) {
    const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

    // Conditional icon: 'apps' for 'All Items', 'list' for others
    const isAllItems = category.name.toLowerCase().includes('all');
    const iconName = isAllItems ? 'apps' : 'cafe';

    return (
        <TouchableOpacity
            onPress={onPress}
            className="m-2 rounded-2xl p-6"
            style={{
                backgroundColor: color,
                borderWidth: isSelected ? 2 : 0,
                borderColor: '#fff',
                minHeight: 120,
                justifyContent: 'center',
                width: '48%',
            }}
        >
            <View className="flex-row mb-4 items-center">
                <View className="w-10 h-10 rounded-lg bg-white/25 justify-center items-center mr-2">
                    <Ionicons name={iconName} size={22} color="#fff" />
                </View>
                <Text className="text-white text-2xl font-bold mb-0.5 flex-1" numberOfLines={1}>
                    {category.name}
                </Text>
                {isSelected && (
                    <View className="w-5 h-5 rounded-full border-2 border-white justify-center items-center ml-2">
                        <View className="w-3 h-3 rounded-full bg-white" />
                    </View>
                )}
            </View>

            <Text className="text-white/80 text-base mt-2">
                {category.items.length} Items
            </Text>
        </TouchableOpacity>
    );
}