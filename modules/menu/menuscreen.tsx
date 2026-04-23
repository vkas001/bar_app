import CategoryCard from '@/modules/menu/components/CategoryCard';
import ItemCard from '@/modules/menu/components/ItemCard';
import { useMenu } from '@/modules/menu/hook/useMenu';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderStore } from '../orders/store/createOrderStore';
import UnitSelectionModal from './components/UnitSelectionModal';
import { useCartStore } from './store/cartStore';
import { MenuCategoryWithItems, MenuItemMerged } from './types/menu.types';

export default function MenuScreen() {
    const addItem = useCartStore((state) => state.addItem);
    const { categories, selectedCategory, setSelectedCategory, loading, error } = useMenu();
    const { pendingCustomerData, selectedTableIds } = useOrderStore();

    const [selectedItem, setSelectedItem] = useState<MenuItemMerged | null>(null);
    const itemListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (pendingCustomerData && selectedTableIds.length > 0) {
            console.log('Pending Order Data:', {
                customer: pendingCustomerData,
                tables: selectedTableIds,
            });
        }
    }, []);

    // Scroll items to top when category changes
    useEffect(() => {
        if (itemListRef.current) {
            itemListRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    }, [selectedCategory?.id]);

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

    const items = selectedCategory?.items ?? [];

    // Pair items into rows of 2 for the items FlatList
    const itemRows: MenuItemMerged[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        itemRows.push(items.slice(i, i + 2));
    }

    const handleSelectItem = (item: MenuItemMerged) => {
        setSelectedItem(item);
    };

    const renderCategoryItem = ({ item, index }: { item: MenuCategoryWithItems; index: number }) => (
        <CategoryCard
            category={item}
            index={index}
            isSelected={selectedCategory?.id === item.id}
            onPress={() => setSelectedCategory(item)}
        />
    );

    const renderItemRow = ({ item: row }: { item: MenuItemMerged[] }) => (
        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16 }}>
            {row.map((item, colIndex) => (
                <ItemCard
                    key={`${item.item_id}_${colIndex}`}
                    item={item}
                    onSelect={handleSelectItem}
                />
            ))}
            {row.length < 2 && <View className="flex-1" />}
        </View>
    );

    const ListHeaderComponent = (
        <>
            {/* Divider */}
            <View className="h-px bg-[#333] mx-4 my-3" />
            {/* Selected category label */}
            <Text className="text-white/50 text-base px-4 mb-3 uppercase tracking-widest">
                {selectedCategory?.name} · {items.length} items
            </Text>
        </>
    );

    const ListEmptyComponent = (
        <View className="items-center py-10">
            <Text className="text-[#888]">No items in this category</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#111]">

            {/* Category section — horizontal FlatList */}
            <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderCategoryItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 4, paddingBottom: 8 }}
            />

            {/* Items section — vertical FlatList with header */}
            <FlatList
                ref={itemListRef}
                data={itemRows}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderItemRow}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
            />

            <UnitSelectionModal
                item={selectedItem}
                visible={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
                onSelect={(item, unit, quantity, note) => {
                    addItem(item, unit, quantity, note);
                    setSelectedItem(null);
                }}
            />
        </SafeAreaView>
    );
}