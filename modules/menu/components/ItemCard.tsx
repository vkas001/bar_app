import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { MenuItemMerged } from '../types/menu.types';

interface Props {
    item: MenuItemMerged;
    onSelect: (item: MenuItemMerged) => void;
}

export default function ItemCard({ item, onSelect }: Props) {
    const isVeg = item.item_category.name.toLowerCase().includes('veg');
    const tagBg = isVeg ? '#14381f' : '#166df0';
    const tagColor = isVeg ? '#15d15a' : '#60a5fa';
    const units = Array.isArray(item.units) ? item.units : [];
    const hasMultipleUnits = units.length > 1;

    return (
        <View className="flex-1 bg-[#1e1e1e] rounded-xl p-4 border border-[#333] mb-4">
            {/* Top row */}
            <View className="flex-row justify-between items-start mb-2">
                <Text
                    className="text-white text-base font-medium flex-1 pr-2"
                    numberOfLines={2}
                >
                    {item.item_name}
                </Text>
                <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1a5c3a] justify-center items-center">
                    <Ionicons name="cart" size={22} color="#4ade80" />
                </TouchableOpacity>
            </View>

            {/* Group */}
            <Text className="text-[#888] text-base mb-2">
                {item.item_group.name}
            </Text>

            {/* Tags */}
            <View className="flex-row flex-wrap gap-2 mb-3">
                <View className="bg-[#166df0] rounded-lg px-1.5 py-0.5"
                >
                    <Text className="text-base font-medium text-white"
                    >
                        {item.item_category.name}
                    </Text>
                </View>
                <View className="bg-[#15d15a] rounded-lg px-1.5 py-0.5"
                >
                    <Text className="text-base font-medium text-white"
                    >
                        {item.item_group.name}
                    </Text>
                </View>
            </View>

            {/* Price */}
            <Text className="text-white text-base font-medium mb-2">
                Rs. {item.item_unit_price}
                {hasMultipleUnits && (
                    <Text className="text-white text-base"> +</Text>
                )}
            </Text>

            {hasMultipleUnits && (
                <Text className="text-white text-base mb-3">
                    {units.length} options available
                </Text>
            )}

            {/* Select button */}
            <TouchableOpacity
                className="bg-[#e5a100] rounded-lg py-2 items-center mt-1"
                onPress={() => onSelect(item)}
            >
                <Text className="text-black text-xl font-bold">Select</Text>
            </TouchableOpacity>
        </View>
    );
}