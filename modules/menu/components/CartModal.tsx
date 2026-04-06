import { useBarTabs } from '@/modules/barTabs/hook/useBarTabs';
import { useCartStore } from '@/modules/menu/store/cartStore';
import { useCreateOrder } from '@/modules/orders/hook/useCreateOrder';
import { useOrderStore } from '@/modules/orders/store/createOrderStore';
import { CreateOrderRequest } from '@/modules/orders/types/order.types';
import { useTables } from '@/modules/tables/hooks/useTable';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal, Pressable, ScrollView,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onOrderSuccess: (type: 'bar_tab' | 'order') => void;
}

export default function CartModal({
    visible,
    onClose,
    onOrderSuccess
}: Props) {
    const [orderNote, setOrderNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { items, updateQuantity, removeItem, clearCart, getTotal, getTotalItems } = useCartStore();
    const { pendingCustomerData, selectedTableIds, barTabCustomerData, clearOrderData } = useOrderStore();
    const { createOrder } = useCreateOrder();
    const { addItemsToBarTab } = useBarTabs();
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
    } = useResponsive();

    const total = getTotal();
    const totalItems = getTotalItems();
    const tax = 0;

    const renderTables = () => {
        if (!selectedTableIds || selectedTableIds.length === 0)
            return <Text className={`text-black font-medium ${textBase}`}>
                Table:
            </Text>;
        const selectedTables = tables.filter((t) => selectedTableIds.includes(Number(t.id)));
        const labelList = selectedTables.map((t) => `${t.table_type?.name || ''}:${t.name}`);
        return (
            <Text className={`text-black font-medium ${isSmallPhone ? textSm : textLg}`} numberOfLines={2}>
                Table: {labelList.length > 1 ? 's' : ''}: {labelList.join(', ')}
            </Text>
        );
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) { setError('Your cart is empty'); return; }

        setLoading(true);
        setError(null);

        // BAR TAB ORDER
        if (barTabCustomerData) {
            console.log('selectedUnit:', JSON.stringify(items[0]?.selectedUnit));
            if (!barTabCustomerData.id) {
                setError('Bar tab ID is missing');
                setLoading(false);
                return;
            }

            const success = await addItemsToBarTab(barTabCustomerData.id, {
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
            });

            setLoading(false);

            if (success) {
                clearCart();
                clearOrderData();
                setOrderNote('');
                onOrderSuccess('bar_tab');

            } else {
                setError('Failed to add items to bar tab');

            }
            return;
        }

        if (!pendingCustomerData) { setError('Customer details are missing'); setLoading(false); return; }
        if (!selectedTableIds || selectedTableIds.length === 0) { setError('No table selected'); setLoading(false); return; }

        const payload: CreateOrderRequest = {
            customerName: pendingCustomerData.customerName,
            phone: pendingCustomerData.customerPhone,
            tableIds: selectedTableIds,
            guestCount: pendingCustomerData.guestCount,
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
            clearCart();
            clearOrderData();
            setOrderNote('');
            onOrderSuccess('order');

        } else {
            setError('Failed to place order');
        }
        return;
    };

    const handleClear = () => {
        clearCart(); clearOrderData(); setOrderNote(''); setError(null); onClose();
    };

    // Responsive tokens
    const containerPx = isSmallPhone ? 16 : isTablet ? 40 : 32;
    const containerPy = isSmallPhone ? 12 : 20;

    const headerTitleSize = isSmallPhone ? textXl : text2xl;
    const closeBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8';
    const closeIconSize = isSmallPhone ? iconSm : iconMd;

    const sectionTitleSize = isSmallPhone ? textBase : textXl;
    const customerNameSize = isSmallPhone ? textXs : textSm;
    const customerMetaSize = isSmallPhone ? textXs : textSm;
    const cardP = isSmallPhone ? 'p-2' : 'p-3';
    const cardMb = isSmallPhone ? 'mb-2' : 'mb-4';

    const itemNameSize = isSmallPhone ? textSm : textBase;
    const itemMetaSize = isSmallPhone ? textXs : textBase;
    const itemPriceSize = isSmallPhone ? textSm : textLg;
    const itemEachSize = isSmallPhone ? textXs : textBase;
    const itemCardPx = isSmallPhone ? 'px-2 py-2' : 'px-4 py-3';

    const qtyBtnSize = isSmallPhone ? 'w-6 h-6' : 'w-7 h-7';
    const qtyIconSize = isSmallPhone ? 16 : iconMd;
    const actionBtnSize = isSmallPhone ? 'w-7 h-7' : 'w-8 h-8';
    const actionIconSize = isSmallPhone ? iconSm : iconMd;

    const billLabelSize = isSmallPhone ? textSm : textBase;
    const billAmountSize = isSmallPhone ? textBase : textXl;
    const grandTotalSize = isSmallPhone ? textBase : textXl;

    const noteHeight = isSmallPhone ? 55 : 75;
    const noteTextSize = isSmallPhone ? textSm : textBase;
    const noteLabelSize = isSmallPhone ? textSm : textBase;
    const charCountSize = isSmallPhone ? textXs : 'text-xs';

    const btnPy = isSmallPhone ? 'py-2.5' : 'py-4';
    const btnTextSize = isSmallPhone ? textBase : textXl;
    const btnMb = isSmallPhone ? 'mb-3' : 'mb-8';

    const dividerMy = isSmallPhone ? 'my-2' : 'my-3';
    const sectionMb = isSmallPhone ? 'mb-2' : 'mb-4';

    const itemsMaxHeight = isSmallPhone ? 200 : isTablet ? 400 : 280;

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>

            <View className="flex-1" pointerEvents="box-none">


                <Pressable className="absolute inset-0 bg-black/60" onPress={onClose} />


                <View
                    className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl border-t border-[#333]"
                    style={{ maxHeight: '100%' }}
                >

                    <View
                        className="flex-row justify-between items-center"
                        style={{ paddingHorizontal: containerPx, paddingTop: containerPy, paddingBottom: 8 }}
                    >
                        <Text className={`text-white font-medium ${headerTitleSize}`}>Cart</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className={`${closeBtnSize} rounded-full bg-[#333] items-center justify-center`}
                        >
                            <Ionicons name="close" size={closeIconSize} color="white" />
                        </TouchableOpacity>
                    </View>


                    <ScrollView
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            paddingHorizontal: containerPx,
                            paddingBottom: containerPy,
                        }}
                    >
                        {/* Customer + Table */}
                        <View className={`${cardMb} ${cardP} rounded-xl bg-[#222] border border-[#333]`}>
                            <Text className={`text-white font-semibold mb-1 ${isSmallPhone ? textSm : textBase}`}>
                                Customer Details
                            </Text>
                            <View className="flex-row flex-wrap items-center justify-between">
                                <View className="mb-1 flex-1 mr-2">
                                    <Text className={`text-white ${customerNameSize}`} numberOfLines={1}>
                                        Name: {barTabCustomerData?.customerName ?? pendingCustomerData?.customerName ?? ''}
                                    </Text>
                                    <Text className={`text-[#888] ${customerMetaSize}`}>
                                        Phone: {barTabCustomerData?.customerPhone ?? pendingCustomerData?.customerPhone ?? ''}
                                    </Text>
                                    <Text className={`text-[#888] ${customerMetaSize}`}>
                                     {barTabCustomerData ? 'Bar Tab' : `Guests: ${pendingCustomerData?.guestCount ?? ''}`}
                                    </Text>
                                </View>
                                {!barTabCustomerData && (
                                    <View className={`bg-[#e5a100] rounded-xl items-center ${isSmallPhone ? 'px-2 py-1' : 'px-4 py-4'}`}>
                                        {renderTables()}
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Error */}
                        {error && (
                            <View className={`bg-red-900/40 border border-red-800 rounded-xl px-4 py-3 ${cardMb}`}>
                                <Text className={`text-red-400 ${textSm}`}>{error}</Text>
                            </View>
                        )}

                        {/* Order Details label */}
                        <Text className={`text-white font-medium ${sectionTitleSize} ${sectionMb}`}>
                            Order Details
                        </Text>

                        {/* Inner ScrollView — scrolls only the items list */}
                        {items.length === 0 ? (
                            <View className="items-center py-8">
                                <Text className={`text-[#888] ${textBase}`}>No items in cart</Text>
                            </View>
                        ) : (
                            <ScrollView
                                nestedScrollEnabled
                                showsVerticalScrollIndicator
                                style={{ maxHeight: itemsMaxHeight }}
                            >
                                {items.map((cartItem) => (
                                    <View
                                        key={cartItem.id}
                                        className={`bg-[#252525] rounded-xl ${itemCardPx} ${cardMb}`}
                                    >
                                        {/* Name + Qty controls */}
                                        <View
                                            className="flex-row justify-between items-center"
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
                                                <Text
                                                    className={`text-white font-medium text-center ${itemNameSize}`}
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
                                ))}
                            </ScrollView>
                        )}

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

                        <View className={`flex-row justify-between ${isSmallPhone ? 'mb-3' : 'mb-6'}`}>
                            <Text className={`text-white font-medium ${grandTotalSize}`}>Grand Total</Text>
                            <Text className={`text-white font-medium ${grandTotalSize}`}>Rs. {total.toFixed(2)}</Text>
                        </View>

                        {/* Buttons */}
                        <View
                            className={`flex-row ${btnMb}`}
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
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}