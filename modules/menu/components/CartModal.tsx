import { useResponsive } from '@/shared/hooks/useResponsive';
import { useCartStore } from '@/modules/menu/store/cartStore';
import { useCreateOrder } from '@/modules/orders/hook/useCreateOrder';
import { useOrderStore } from '@/modules/orders/store/createOrderStore';
import { CreateOrderRequest } from '@/modules/orders/types/order.types';
import { useTables } from '@/modules/tables/hooks/useTable';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal, Pressable, ScrollView,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onOrderSuccess: () => void;
}

export default function CartModal({ visible, onClose, onOrderSuccess }: Props) {
    const [orderNote, setOrderNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { items, updateQuantity, removeItem, clearCart, getTotal, getTotalItems } = useCartStore();
    const { pendingCustomerData, selectedTableIds, clearOrderData } = useOrderStore();
    const { createOrder } = useCreateOrder();
    const { tables } = useTables();

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

    const total = getTotal();
    const totalItems = getTotalItems();
    const tax = 0;
    const totalWithTax = total + tax;

    const renderTables = () => {
        if (!selectedTableIds || selectedTableIds.length === 0)
            return <Text className={`text-white ${textBase}`}>No table selected</Text>;
        const selectedTables = tables.filter((t) => selectedTableIds.includes(Number(t.id)));
        const labelList = selectedTables.map((t) => `${t.table_type?.name || ''}:${t.name}`);
        return (
            <Text className={`text-black font-medium ${isSmallPhone ? textSm : textLg}`} numberOfLines={2}>
                Table{labelList.length > 1 ? 's' : ''}: {labelList.join(', ')}
            </Text>
        );
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) { setError('Your cart is empty'); return; }
        if (!pendingCustomerData) { setError('Customer details are missing'); return; }
        if (!selectedTableIds || selectedTableIds.length === 0) { setError('No table selected'); return; }

        setLoading(true);
        setError(null);

        const payload: CreateOrderRequest = {
            customerName: pendingCustomerData.customer_name,
            phone: pendingCustomerData.customer_phone,
            tableIds: selectedTableIds,
            guestCount: pendingCustomerData.guest_count,
            items: items.map((item) => ({
                ...item,
                selectedUnit: {
                    id: item.selectedUnit.item_unit_id,
                    value: String(item.selectedUnit.item_unit_price),
                },
            })),
            subtotal: total,
            tax: 0,
            total,
            orderNote,
            paymentMethod: 'Cash',
            reservationId: null,
        };

        const success = await createOrder(payload);
        setLoading(false);
        if (success) {
            clearCart(); clearOrderData(); setOrderNote(''); onOrderSuccess();
        }
    };

    const handleClear = () => {
        clearCart(); clearOrderData(); setOrderNote(''); setError(null); onClose();
    };

    // Responsive tokens
    const containerPx = isSmallPhone ? 'px-3' : isTablet ? 'px-10' : 'px-8'
    const containerPy = isSmallPhone ? 'py-3' : 'py-5'
    const containerPb = isSmallPhone ? 'pb-4' : 'pb-8'

    const headerTitleSize = isSmallPhone ? textXl : text2xl
    const closeBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8'
    const closeIconSize = isSmallPhone ? iconSm : iconMd

    const sectionTitleSize = isSmallPhone ? textBase : textXl
    const customerNameSize = isSmallPhone ? textBase : textXl
    const customerMetaSize = isSmallPhone ? textXs : textBase
    const cardP = isSmallPhone ? 'p-2' : 'p-3'
    const cardMb = isSmallPhone ? 'mb-2' : 'mb-4'

    const itemNameSize = isSmallPhone ? textSm : textBase
    const itemMetaSize = isSmallPhone ? textXs : textBase
    const itemPriceSize = isSmallPhone ? textSm : textLg
    const itemEachSize = isSmallPhone ? textXs : textBase
    const itemCardPx = isSmallPhone ? 'px-2 py-2' : 'px-4 py-3'

    const qtyBtnSize = isSmallPhone ? 'w-6 h-6' : 'w-7 h-7'
    const qtyIconSize = isSmallPhone ? 16 : iconMd
    const actionBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8'
    const actionIconSize = isSmallPhone ? iconSm : iconMd

    const billLabelSize = isSmallPhone ? textSm : textBase
    const billAmountSize = isSmallPhone ? textBase : textXl
    const grandTotalSize = isSmallPhone ? textBase : textXl

    const noteHeight = isSmallPhone ? 55 : 75
    const noteTextSize = isSmallPhone ? textSm : textBase
    const noteLabelSize = isSmallPhone ? textSm : textBase
    const charCountSize = isSmallPhone ? textXs : 'text-xs'

    const btnPy = isSmallPhone ? 'py-2.5' : 'py-4'
    const btnTextSize = isSmallPhone ? textBase : textXl
    const btnMb = isSmallPhone ? 'mb-3' : 'mb-8'
    const scrollMaxHeight = isSmallPhone ? 260 : 420

    const dividerMy = isSmallPhone ? 'my-2' : 'my-3'
    const sectionMb = isSmallPhone ? 'mb-2' : 'mb-4'

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable className="flex-1 bg-black/60" onPress={onClose}>
                <Pressable onPress={(e) => e.stopPropagation()} className='absolute left-0 right-0 top-0'>
                    <View className={`bg-[#1a1a1a] rounded-t-3xl border-t border-[#333] ${containerPx} ${containerPy} ${containerPb}`}>

                        {/* Header */}
                        <View className={`flex-row justify-between items-center ${cardMb}`}>
                            <Text className={`text-white font-medium ${headerTitleSize}`}>Cart</Text>
                            <TouchableOpacity
                                onPress={onClose}
                                className={`${closeBtnSize} rounded-full bg-[#333] items-center justify-center`}
                            >
                                <Ionicons name="close" size={closeIconSize} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Customer + Table */}
                        <View className={`${cardMb} ${cardP} rounded-xl bg-[#222] border border-[#333]`}>
                            <Text className={`text-white font-semibold mb-1 ${isSmallPhone ? textSm : textBase}`}>
                                Customer Details
                            </Text>
                            <View className="flex-row flex-wrap items-center justify-between">
                                <View className="mb-1 flex-1 mr-2">
                                    <Text className={`text-white font-bold ${customerNameSize}`} numberOfLines={1}>
                                        {pendingCustomerData?.customer_name || '—'}
                                    </Text>
                                    <Text className={`text-[#888] ${customerMetaSize}`}>
                                        {pendingCustomerData?.customer_phone || '—'}
                                    </Text>
                                    <Text className={`text-[#888] ${customerMetaSize}`}>
                                        Guests: {pendingCustomerData?.guest_count ?? '—'}
                                    </Text>
                                </View>
                                <View className={`bg-[#e5a100] rounded-xl items-center ${isSmallPhone ? 'px-2 py-1' : 'px-4 py-2'}`}>
                                    {renderTables()}
                                </View>
                            </View>
                        </View>

                        {/* Error */}
                        {error && (
                            <View className={`bg-red-900/40 border border-red-800 rounded-xl px-4 py-3 ${cardMb}`}>
                                <Text className={`text-red-400 ${textSm}`}>{error}</Text>
                            </View>
                        )}

                        {/* Order Details */}
                        <Text className={`text-white font-medium ${sectionTitleSize} ${sectionMb}`}>
                            Order Details
                        </Text>

                        <ScrollView
                            style={{ maxHeight: scrollMaxHeight }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        >
                            {items.length === 0 ? (
                                <View className="items-center py-8">
                                    <Text className={`text-[#888] ${textBase}`}>No items in cart</Text>
                                </View>
                            ) : (
                                items.map((cartItem) => (
                                    <View
                                        key={cartItem.id}
                                        className={`bg-[#252525] rounded-xl ${itemCardPx} ${cardMb}`}
                                    >
                                        {/* Name + Qty controls */}
                                        <View
                                            className='flex-row justify-between items-center'
                                            style={{ marginBottom: isSmallPhone ? 4 : 8 }}
                                        >
                                            <Text
                                                className={`text-white font-medium flex-1 pr-2 ${itemNameSize}`}
                                                numberOfLines={1}
                                            >
                                                {cartItem.name}
                                            </Text>
                                            <View className="flex-row items-center" style={{ gap: isSmallPhone ? size.padding.sm : 16 }}>
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                                    className={`${qtyBtnSize} rounded-md bg-[#333] items-center justify-center`}
                                                >
                                                    <Ionicons name="remove" size={qtyIconSize} color="#e5a100" />
                                                </TouchableOpacity>
                                                <Text className={`text-white font-medium text-center ${itemNameSize}`}
                                                    style={{ minWidth: isSmallPhone ? 20 : 24 }}
                                                >
                                                    x{cartItem.quantity}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                                    className={`${qtyBtnSize} rounded-md bg-[#333] items-center justify-center`}
                                                >
                                                    <Ionicons name="add" size={qtyIconSize} color="#e5a100" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* Unit */}
                                        <Text
                                            className={`text-[#888] ${itemMetaSize}`}
                                            style={{ marginBottom: isSmallPhone ? 4 : 8 }}
                                        >
                                            {cartItem.selectedUnit.item_unit_title} ({cartItem.selectedUnit.item_unit_name})
                                        </Text>

                                        {/* Actions + Price */}
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row" style={{ gap: size.padding.sm }}>
                                                <TouchableOpacity
                                                    onPress={() => removeItem(cartItem.id)}
                                                    className={`${actionBtnSize} rounded-lg bg-[#333] items-center justify-center`}
                                                >
                                                    <Ionicons name="trash-outline" size={actionIconSize} color="red" />
                                                </TouchableOpacity>
                                                <View className={`${actionBtnSize} rounded-lg bg-[#333] items-center justify-center`}>
                                                    <Ionicons name="document-text-outline" size={actionIconSize} color="#e5a100" />
                                                </View>
                                            </View>
                                            <View className="items-end">
                                                <Text className={`text-[#888] ${itemEachSize}`}>
                                                    Rs. {cartItem.pricePerQuantity.toFixed(2)} each
                                                </Text>
                                                <Text className={`text-white font-medium ${itemPriceSize}`}>
                                                    Rs. {cartItem.price.toFixed(2)}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Item note */}
                                        {cartItem.note && (
                                            <Text className={`text-[#888] mt-1 italic ${itemMetaSize}`}>
                                                Note: {cartItem.note}
                                            </Text>
                                        )}
                                    </View>
                                ))
                            )}
                        </ScrollView>

                        {/* Order Note */}
                        <Text className={`text-white font-medium mt-3 mb-1 ${noteLabelSize}`}>
                            Order Note
                        </Text>
                        <TextInput
                            value={orderNote}
                            onChangeText={(t) => setOrderNote(t.slice(0, 300))}
                            placeholder="Add special instructions for the entire order..."
                            placeholderTextColor="#555"
                            multiline
                            className={`bg-[#252525] border border-[#333] rounded-xl px-4 py-3 text-white mb-1 ${noteTextSize}`}
                            style={{ height: noteHeight, textAlignVertical: 'top' }}
                        />
                        <Text
                            className={`text-[#555] ${charCountSize}`}
                            style={{ marginBottom: isSmallPhone ? 8 : 16 }}
                        >
                            {orderNote.length}/300 characters
                        </Text>

                        {/* Bill Summary */}
                        <Text className={`text-white font-medium ${sectionTitleSize} ${sectionMb}`}>
                            Bill Summary
                        </Text>
                        <View className="flex-row justify-between mb-2">
                            <Text className={`text-[#888] ${billLabelSize}`}>Items ({totalItems})</Text>
                            <Text className={`text-white font-medium ${billAmountSize}`}>Rs. {total.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className={`text-[#888] ${billLabelSize}`}>Subtotal</Text>
                            <Text className={`text-white font-medium ${billAmountSize}`}>Rs. {total.toFixed(2)}</Text>
                        </View>

                        <View className={`h-px bg-[#333] ${dividerMy}`} />

                        <View className={`flex-row justify-between ${isSmallPhone ? 'mb-3' : 'mb-8'}`}>
                            <Text className={`text-white font-medium ${grandTotalSize}`}>Grand Total</Text>
                            <Text className={`text-white font-medium ${grandTotalSize}`}>Rs. {total.toFixed(2)}</Text>
                        </View>

                        {/* Buttons */}
                        <View className={`flex-row ${btnMb}`}
                            style={{ gap: isSmallPhone ? size.padding.sm : 12 }}
                        >
                            <TouchableOpacity
                                onPress={handlePlaceOrder}
                                disabled={loading || items.length === 0}
                                className={`flex-1 bg-yellow rounded-xl items-center ${btnPy}`}
                                style={{ opacity: loading || items.length === 0 ? 0.6 : 1 }}
                            >
                                <Text className={`text-white font-medium ${btnTextSize}`} numberOfLines={1}>
                                    {loading ? 'Placing...' : `Place Order (Rs. ${total.toFixed(2)})`}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleClear}
                                className={`bg-[#dc2626] rounded-xl px-4 items-center ${btnPy}`}
                            >
                                <Text className={`text-white font-medium ${btnTextSize}`}>Clear</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}