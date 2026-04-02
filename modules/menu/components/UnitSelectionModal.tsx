import AppInput from '@/components/input';
import { useResponsive } from '@/shared/hooks/useResponsive';
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
        iconSm,
        iconMd,
        size,
    } = useResponsive()

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
        if (onSelect && item) onSelect(item, activeUnit, quantity, note);
        handleClose();
    };

    // Responsive tokens
    const containerPx = isSmallPhone ? 'px-3' : isTablet ? 'px-8' : 'px-5'
    const containerPt = isSmallPhone ? 'pt-3' : isTablet ? 'pt-8' : 'pt-5'
    const containerPb = isSmallPhone ? 'pb-4' : 'pb-8'

    const titleSize = isSmallPhone ? textLg : isTablet ? text2xl : 'text-2xl'
    const groupSize = isSmallPhone ? textSm : textLg
    const tagSize = isSmallPhone ? textXs : textLg
    const tagPx = isSmallPhone ? 'px-1.5 py-1' : 'px-2 py-2'
    const tagMb = isSmallPhone ? 'mb-4' : 'mb-8'

    const sectionLabelSize = isSmallPhone ? textSm : textLg
    const unitTitleSize = isSmallPhone ? textSm : textLg
    const unitSubSize = isSmallPhone ? textXs : textLg
    const unitPriceSize = isSmallPhone ? textBase : textXl
    const unitRowPx = isSmallPhone ? 'px-3 py-2.5' : 'px-4 py-4'
    const unitRowMb = isSmallPhone ? 'mb-2' : 'mb-4'

    const qtyBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8'
    const qtyIconSize = isSmallPhone ? iconSm : iconMd
    const qtyTextSize = isSmallPhone ? textSm : textBase
    const qtyRowMb = isSmallPhone ? 'mb-4' : 'mb-8'

    const noteHeight = isSmallPhone ? 60 : 80
    const noteLabelSize = isSmallPhone ? textSm : textXl
    const noteCharSize = isSmallPhone ? textXs : textBase

    const totalTextSize = isSmallPhone ? textXl : text2xl
    const totalMb = isSmallPhone ? 'mb-4' : 'mb-8'

    const btnPy = isSmallPhone ? 'py-2.5' : 'py-4'
    const btnTextSize = isSmallPhone ? textBase : textLg
    const btnMb = isSmallPhone ? 'mb-4' : 'mb-8'

    const closeBtnSize = isSmallPhone ? 'w-6 h-6' : 'w-7 h-7'
    const closeIconSize = isSmallPhone ? iconSm : iconMd

    const sectionMb = isSmallPhone ? 'mb-1' : 'mb-2'
    const dividerMb = isSmallPhone ? 'mb-4' : 'mb-8'

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <Pressable className="flex-1 bg-black/60" onPress={handleClose}>
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    className='absolute left-0 right-0 top-0'
                >
                    <View
                        className={`bg-[#1a1a1a] rounded-t-3xl border-t border-[#333] ${containerPx} ${containerPt} ${containerPb}`}
                    >
                        {/* Header */}
                        <View
                            className='flex-row justify-between items-center'
                            style={{ marginBottom: isSmallPhone ? 8 : 16 }}
                        >
                            <Text
                                className={`text-white font-medium flex-1 pr-3 ${titleSize}`}
                                numberOfLines={2}
                            >
                                {item.item_name}
                            </Text>
                            <TouchableOpacity
                                onPress={handleClose}
                                className={`${closeBtnSize} rounded-full bg-[#333] items-center justify-center`}
                            >
                                <Ionicons name="close" size={closeIconSize} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Group name */}
                        <Text
                            className={`text-white ${groupSize}`}
                            style={{ marginBottom: isSmallPhone ? 8 : 16 }}
                        >
                            {item.item_group.name}
                        </Text>

                        {/* Tags */}
                        <View
                            className={`flex-row ${tagMb}`}
                            style={{ gap: size.padding.sm }}
                        >
                            <View className={`bg-[#1166ef] rounded-lg ${tagPx}`}>
                                <Text className={`font-medium text-white ${tagSize}`}>
                                    {item.item_category.name}
                                </Text>
                            </View>
                            <View className={`bg-[#32e774] rounded-lg ${tagPx}`}>
                                <Text className={`font-medium text-white ${tagSize}`}>
                                    {item.item_group.name}
                                </Text>
                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* Unit Selection */}
                            <Text className={`text-white font-bold ${sectionLabelSize} ${sectionMb}`}>
                                Select Unit:
                            </Text>

                            {units.map((unit) => {
                                const isSelected = activeUnit?.item_unit_id === unit.item_unit_id;
                                return (
                                    <TouchableOpacity
                                        key={unit.item_unit_id}
                                        onPress={() => setSelectedUnit(unit)}
                                        className={`flex-row items-center bg-[#252525] rounded-xl ${unitRowPx} ${unitRowMb}`}
                                    >
                                        {/* Radio */}
                                        <View
                                            className='rounded-full items-center justify-center'
                                            style={{
                                                width: isSmallPhone ? 16 : 20,
                                                height: isSmallPhone ? 16 : 20,
                                                borderWidth: 2,
                                                borderColor: isSelected ? '#e5a100' : '#555',
                                                marginRight: isSmallPhone ? size.padding.md : 24,
                                            }}
                                        >
                                            {isSelected && (
                                                <View
                                                    className='rounded-full bg-[#e5a100]'
                                                    style={{ width: isSmallPhone ? 8 : 10, height: isSmallPhone ? 8 : 10 }}
                                                />
                                            )}
                                        </View>

                                        {/* Unit info */}
                                        <View className='flex-1'>
                                            <Text className={`text-white font-medium ${unitTitleSize}`}>
                                                {unit.item_unit_title}
                                            </Text>
                                            <Text className={`text-[#888] mt-0.5 ${unitSubSize}`}>
                                                {unit.item_unit_name}
                                            </Text>
                                        </View>

                                        {/* Price */}
                                        <Text className={`text-white font-medium ${unitPriceSize}`}>
                                            Rs. {unit.item_unit_price.toFixed(2)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}

                            {/* Quantity */}
                            <Text className={`text-white font-medium ${sectionLabelSize} ${sectionMb}`}>
                                Quantity:
                            </Text>
                            <View
                                className={`flex-row items-center justify-between bg-[#252525] rounded-xl px-4 ${qtyRowMb}`}
                                style={{ paddingVertical: isSmallPhone ? 8 : 12 }}
                            >
                                <TouchableOpacity
                                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={`${qtyBtnSize} rounded-lg bg-[#333] items-center justify-center`}
                                >
                                    <Ionicons name='remove' size={qtyIconSize} color="#e5a100" />
                                </TouchableOpacity>
                                <Text className={`text-white font-medium ${qtyTextSize}`}>
                                    {quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setQuantity(quantity + 1)}
                                    className={`${qtyBtnSize} rounded-lg bg-[#333] items-center justify-center`}
                                >
                                    <Ionicons name='add' size={qtyIconSize} color="#e5a100" />
                                </TouchableOpacity>
                            </View>

                            {/* Note */}
                            <AppInput
                                label='Note'
                                labelClassName={noteLabelSize}
                                value={note}
                                onChangeText={(t) => setNote(t.slice(0, 200))}
                                placeholder="Add any special instructions..."
                                placeholderTextColor="#555"
                                multiline
                                numberOfLines={isSmallPhone ? 2 : 3}
                                className="bg-[#252525] border border-[#333] rounded-xl px-4 py-3 text-white text-base"
                                style={{ height: noteHeight, textAlignVertical: 'top' }}
                            />
                            <Text
                                className={`text-[#555] mt-1 ${noteCharSize}`}
                                style={{ marginBottom: isSmallPhone ? 16 : 32 }}
                            >
                                {note.length}/200 characters
                            </Text>

                            {/* Divider */}
                            <View className={`h-px bg-[#333] ${dividerMb}`} />

                            {/* Total */}
                            <View className={`flex-row justify-between items-center ${totalMb}`}>
                                <Text className={`text-white font-medium ${totalTextSize}`}>Total:</Text>
                                <Text className={`text-white font-medium ${totalTextSize}`}>
                                    Rs. {total.toFixed(2)}
                                </Text>
                            </View>

                            {/* Buttons */}
                            <View
                                className={`flex-row ${btnMb}`}
                                style={{ gap: isSmallPhone ? size.padding.sm : 16 }}
                            >
                                <TouchableOpacity
                                    onPress={handleClose}
                                    className={`flex-1 bg-[#333] rounded-xl items-center ${btnPy}`}
                                >
                                    <Text className={`text-white font-medium ${btnTextSize}`}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleAddToCart}
                                    className={`flex-[1.5] bg-[#22c55e] rounded-xl items-center ${btnPy}`}
                                >
                                    <Text className={`text-white font-medium ${btnTextSize}`}>
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