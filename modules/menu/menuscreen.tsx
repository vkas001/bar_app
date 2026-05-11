import AppInput from '@/components/input';
import CategoryCard from '@/modules/menu/components/CategoryCard';
import ItemCard from '@/modules/menu/components/ItemCard';
import { useMenu } from '@/modules/menu/hook/useMenu';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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
    const [searchQuery, setSearchQuery] = useState('');

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

    // Filter items based on search query
    const filteredItems = searchQuery.trim() === '' 
        ? items 
        : items.filter(item => 
            item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    // Pair items into rows of 2 for the items FlatList
    const itemRows: MenuItemMerged[][] = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
        itemRows.push(filteredItems.slice(i, i + 2));
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

    const ListEmptyComponent = (
        <View className="items-center py-10">
            <Text className="text-[#888]">
                {searchQuery.trim() !== '' ? 'No items match your search' : 'No items in this category'}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#111]">

            {/* Category section — horizontal FlatList */}
            <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderCategoryItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    flexGrow: 0,
                    flexShrink: 0,
                }}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 8,
                }}
            />

            {/* Divider */}
            <View className="h-px bg-[#333] mx-4 mt-2 mb-2" />
            
            {/* Selected category label and menu search */}
            <View className='flex-row items-center mb-2'>
                <Text className="text-white/50 text-base px-4 mb-3 uppercase tracking-widest">
                    {selectedCategory?.name} · {filteredItems.length} items
                </Text>
                <AppInput
                    containerClassName='flex-1 mr-4'
                    placeholder="Search menu items..."
                    inputClassName="h-12"
                    inputTextClassName="text-base"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    leftIcon={<Ionicons name="search" size={20} color="rgba(255,255,255,0.45)" />}
                />
            </View>

            {/* Items section — vertical FlatList with header */}
            <FlatList
                ref={itemListRef}
                data={itemRows}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderItemRow}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingVertical: 8 }}
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
        </View>
    );
}