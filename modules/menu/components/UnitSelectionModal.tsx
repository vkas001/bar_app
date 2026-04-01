import AppInput from '@/components/input';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal, Pressable, ScrollView,
    Text, TouchableOpacity, View
} from 'react-native';
import { MenuItemMerged, MenuItemUnit } from '../types/menu.types';

interface Props {
    item: MenuItemMerged | null;
    visible: boolean;
    onClose: () => void;
    onSelect?: (item: MenuItemMerged, unit: MenuItemUnit, quantity: number, note: string) => void;
}

export default function UnitSelectionModal({ item, visible, onClose, onSelect }: Props) {
    const [selectedUnit, setSelectedUnit] = useState<MenuItemUnit | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    if (!item) return null;

    const units = item.units ?? [];
    const activeUnit = selectedUnit ?? units[0];
    const total = (activeUnit?.item_unit_price ?? 0) * quantity;

    const handleClose = () => {
        setSelectedUnit(null);
        setQuantity(1);
        setNote('');
        onClose();
    };

    const handleAddToCart = () => {
        if (!activeUnit) return;
        if (onSelect && item) {
            onSelect(item, activeUnit, quantity, note);
        }
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <Pressable
                className="flex-1 bg-black/60"
                onPress={handleClose}
            >
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    className='absolute left-0 right-0 top-0'
                >
                    <View className="bg-[#1a1a1a] rounded-t-3xl px-5 pt-5 pb-8 border-t border-[#333]">

                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-2xl font-medium">
                                {item.item_name}
                            </Text>
                            <TouchableOpacity
                                onPress={handleClose}
                                className="w-7 h-7 rounded-full bg-[#333] items-center justify-center"
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Group name */}
                        <Text className="text-white text-lg mb-4">
                            {item.item_group.name}
                        </Text>

                        {/* Tags */}
                        <View className="flex-row gap-2 mb-8">
                            <View className="bg-[#1166ef] rounded-lg px-2 py-2"
                            >
                                <Text className="text-lg font-medium text-white"

                                >
                                    {item.item_category.name}
                                </Text>
                            </View>
                            <View className="bg-[#32e774] rounded-lg px-2 py-2"

                            >
                                <Text className="text-lg text-white font-medium"

                                >
                                    {item.item_group.name}
                                </Text>
                            </View>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}

                        >

                            {/* Unit selection */}
                            <Text className="text-white text-lg font-bold mb-2">
                                Select Unit:
                            </Text>
                            {units.map((unit) => {
                                const isSelected = activeUnit?.item_unit_id === unit.item_unit_id;
                                return (
                                    <TouchableOpacity
                                        key={unit.item_unit_id}
                                        onPress={() => setSelectedUnit(unit)}
                                        className="flex-row items-center bg-[#252525] rounded-xl px-4 py-4 mb-4"
                                    >
                                        {/* Radio */}
                                        <View
                                            className="w-5 h-5 rounded-full mr-6 items-center justify-center"
                                            style={{
                                                borderWidth: 2,
                                                borderColor: isSelected ? '#e5a100' : '#555',
                                            }}
                                        >
                                            {isSelected && (
                                                <View className="w-2.5 h-2.5 rounded-full bg-[#e5a100]" />
                                            )}
                                        </View>

                                        {/* Unit info */}
                                        <View className="flex-1">
                                            <Text className="text-white text-lg font-medium">
                                                {unit.item_unit_title}
                                            </Text>
                                            <Text className="text-[#888] text-lg mt-1">
                                                {unit.item_unit_name}
                                            </Text>
                                        </View>

                                        {/* Price */}
                                        <Text className="text-white text-xl font-medium">
                                            Rs. {unit.item_unit_price.toFixed(2)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}

                            {/* Quantity */}
                            <Text className="text-white text-sm font-medium mt-3 mb-2">
                                Quantity:
                            </Text>
                            <View className="flex-row items-center justify-between bg-[#252525] rounded-xl px-4 py-3 mb-8">
                                <TouchableOpacity
                                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 rounded-lg bg-[#333] items-center justify-center"
                                >
                                    <Ionicons name='remove' size={24} color="#e5a100" />
                                </TouchableOpacity>
                                <Text className="text-white text-base font-medium">{quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 rounded-lg bg-[#333] items-center justify-center"
                                >
                                    <Ionicons name='add' size={24} color="#e5a100" />
                                </TouchableOpacity>
                            </View>

                            {/* Note */}
                            <AppInput
                                label='Note'
                                labelClassName='text-xl'
                                value={note}
                                onChangeText={(t) => setNote(t.slice(0, 200))}
                                placeholder="Add any special instructions..."
                                placeholderClassName=''
                                placeholderTextColor="#555"
                                multiline
                                numberOfLines={3}
                                className="bg-[#252525] border border-[#333] rounded-xl px-4 py-3 text-white text-base"
                                style={{ height: 80, textAlignVertical: 'top' }}
                            />
                            <Text className="text-[#555] text-base mt-1 mb-8">
                                {note.length}/200 characters
                            </Text>

                            {/* Divider */}
                            <View className="h-px bg-[#333] mb-8" />

                            {/* Total */}
                            <View className="flex-row justify-between items-center mb-8">
                                <Text className="text-white text-2xl font-medium">Total:</Text>
                                <Text className="text-white text-2xl font-medium">
                                    Rs. {total.toFixed(2)}
                                </Text>
                            </View>

                            {/* Buttons */}
                            <View className="flex-row gap-4 mb-8">
                                <TouchableOpacity
                                    onPress={handleClose}
                                    className="flex-1 bg-[#333] rounded-xl py-4 items-center"
                                >
                                    <Text className="text-white text-lg font-medium">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleAddToCart}
                                    className="flex-[1.5] bg-[#22c55e] rounded-xl py-4 items-center"
                                >
                                    <Text className="text-white text-lg font-medium">
                                        Add to Cart
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}