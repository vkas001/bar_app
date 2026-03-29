import CategoryCard from '@/modules/menu/components/CategoryCard';
import ItemCard from '@/modules/menu/components/ItemCard';
import { useMenu } from '@/modules/menu/hook/useMenu';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuCategoryWithItems, MenuItemMerged } from './types/menu.types';

const CARD_HEIGHT = 90;
const GAP = 8;
const VISIBLE_ROWS = 3;

export default function MenuScreen() {
    const { categories, selectedCategory, setSelectedCategory, loading, error } = useMenu();

    if (loading) return (
        <View className="flex-1 bg-[#111] justify-center items-center">
            <ActivityIndicator color="#e5a100" />
        </View>
    );

    if (error) return (
        <View className="flex-1 bg-[#111] justify-center items-center">
            <Text className="text-red-400">{error}</Text>
        </View>
    );

    // Chunk categories into rows of 2
    const categoryRows: MenuCategoryWithItems[][] = [];
    for (let i = 0; i < categories.length; i += 2) {
        categoryRows.push(categories.slice(i, i + 2));
    }

    // Chunk selected items into rows of 2
    const items = selectedCategory?.items ?? [];
    const itemRows: MenuItemMerged[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        itemRows.push(items.slice(i, i + 2));
    }

    const handleSelectItem = (item: MenuItemMerged) => {
        console.log('Selected item:', item);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#111]">

            {/* Category section — fixed height, scrollable */}
            <View style={{ height: CARD_HEIGHT * VISIBLE_ROWS + GAP * (VISIBLE_ROWS - 1) }}>
                <ScrollView
                    nestedScrollEnabled= {true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: GAP, paddingHorizontal: 16 }}
                >
                    {categoryRows.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row', gap: GAP }}>
                            {row.map((item, colIndex) => {
                                const index = rowIndex * 2 + colIndex;
                                return (
                                    <CategoryCard
                                        key={`${item.id}_${index}`}
                                        category={item}
                                        index={index}
                                        isSelected={selectedCategory?.id === item.id}
                                        onPress={() => setSelectedCategory(item)}
                                    />
                                );
                            })}
                            {row.length < 2 &&
                                Array(2 - row.length).fill(null).map((_, i) => (
                                    <View key={`empty_${i}`} className="flex-1" />
                                ))
                            }
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Divider */}
            <View className="h-px bg-[#333] mx-4 my-3" />

            {/* Selected category label */}
            <Text className="text-white/50 text-base px-4 mb-3 uppercase tracking-widest">
                {selectedCategory?.name} · {items.length} items
            </Text>

            {/* Items section — fills remaining space, scrollable */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 16, paddingBottom: 20 }}
            >
                {itemRows.length === 0 ? (
                    <View className="items-center py-10">
                        <Text className="text-[#888]">No items in this category</Text>
                    </View>
                ) : (
                    itemRows.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row', gap: 10 }}>
                            {row.map((item, colIndex) => (
                                <ItemCard
                                    key={`${item.item_id}_${colIndex}`}
                                    item={item}
                                    onSelect={handleSelectItem}
                                />
                            ))}
                            {row.length < 2 && <View className="flex-1" />}
                        </View>
                    ))
                )}
            </ScrollView>

        </SafeAreaView>
    );
}