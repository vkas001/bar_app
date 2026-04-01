import { useCartStore } from '@/modules/menu/store/cartStore';
import { useCreateOrder } from '@/modules/orders/hook/useCreateOrder';
import { useOrderStore } from '@/modules/orders/store/createOrderStore';
import { useTables } from '@/modules/tables/hooks/useTable';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal, Pressable, ScrollView,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { CreateOrderRequest } from '@/modules/orders/types/order.types';

interface Props {
    visible: boolean;
    onClose: () => void;
    onOrderSuccess: () => void;
}

export default function CartModal({ visible, onClose, onOrderSuccess }: Props) {
    const [orderNote, setOrderNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Your cart store
    const { items, updateQuantity, removeItem, clearCart, getTotal, getTotalItems } = useCartStore();

    // Your order store
    const { pendingCustomerData, selectedTableIds, clearOrderData } = useOrderStore();

    // Create order hook
    const { createOrder } = useCreateOrder();

    const total = getTotal();
    const totalItems = getTotalItems();
    // Define tax and totalWithTax for order payload
    const tax = 0; // Set your tax calculation logic here if needed
    const totalWithTax = total + tax;

    // Get all tables
    const { tables } = useTables();

    // Helper for displaying tables in A:1 format
    const renderTables = () => {
        if (!selectedTableIds || selectedTableIds.length === 0) return <Text className="text-white text-base">No table selected</Text>;
        // Map selectedTableIds to table objects
        const selectedTables = tables.filter((t) => selectedTableIds.includes(Number(t.id)));
        const labelList = selectedTables.map((t) => `${t.table_type?.name || ''}:${t.name}`);
        return (
            <Text className="text-black text-lg font-medium">
                Table{labelList.length > 1 ? 's' : ''}: {labelList.join(', ')}
            </Text>
        );
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) {
            setError('Your cart is empty');
            return;
        }
        if (!pendingCustomerData) {
            setError('Customer details are missing');
            return;
        }
        if (!selectedTableIds || selectedTableIds.length === 0) {
            setError('No table selected');
            return;
        }

        setLoading(true);
        setError(null);
        // Map items to match backend's expected selectedUnit structure
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

        console.log('Payload:', JSON.stringify(payload, null, 2));

        const success = await createOrder(payload);
        setLoading(false);
        if (success) {
            console.log('Order placed successfully');
            clearCart();
            clearOrderData();
            setOrderNote('');
            onOrderSuccess();
        } else {
            console.log('Order placement failed');
        }
    };

    const handleClear = () => {
        clearCart();
        clearOrderData();
        setOrderNote('');
        setError(null);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 bg-black/60"
                onPress={onClose}
            >
                <Pressable onPress={(e) => e.stopPropagation()}
                    className='absolute left-0 right-0 top-0'
                >
                    <View
                        className="bg-[#1a1a1a] rounded-t-3xl px-8 py-5 pt-5 pb-8 border-t border-[#333]"
                    >

                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-2xl font-medium">
                                Cart
                            </Text>
                            <TouchableOpacity
                                onPress={onClose}
                                className="w-8 h-8 rounded-full bg-[#333] items-center justify-center"
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Customer + Table (robust) */}
                        <View className="mb-4 p-3 rounded-xl bg-[#222] border border-[#333]">
                            <Text className="text-white text-base font-semibold mb-1">Customer Details</Text>
                            <View className="flex-row flex-wrap items-center justify-between ">
                                <View className="mb-1">
                                    <Text className="text-white text-xl font-bold">
                                        {pendingCustomerData?.customer_name || '—'}
                                    </Text>
                                    <Text className="text-[#888] text-base">
                                        {pendingCustomerData?.customer_phone || '—'}
                                    </Text>
                                    <Text className="text-[#888] text-base">
                                        Guests: {pendingCustomerData?.guest_count ?? '—'}
                                    </Text>
                                </View>
                                <View className="bg-[#e5a100] rounded-xl px-4 py-2 items-center">
                                    {renderTables()}
                                </View>
                            </View>
                        </View>

                        {/* Error */}
                        {error && (
                            <View className="bg-red-900/40 border border-red-800 rounded-xl px-4 py-3 mb-4">
                                <Text className="text-red-400 text-sm">{error}</Text>
                            </View>
                        )}

                        {/* Order Details */}
                        <Text className="text-white text-xl font-medium mb-3">
                            Order Details
                        </Text>

                        <ScrollView>
                            {items.length === 0 ? (
                                <View className="items-center py-8">
                                    <Text className="text-[#888]">No items in cart</Text>
                                </View>
                            ) : (
                                items.map((cartItem) => (
                                    <View
                                        key={cartItem.id}
                                        className="bg-[#252525] rounded-xl px-4 py-3 mb-4"
                                    >
                                        {/* Name + Qty */}
                                        <View className="flex-row justify-between items-center mb-2">
                                            <Text
                                                className="text-white text-base font-medium flex-1 pr-2"
                                                numberOfLines={1}
                                            >
                                                {cartItem.name}
                                            </Text>
                                            <View className="flex-row items-center gap-4">
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                                    className="w-7 h-7 rounded-md bg-[#333] items-center justify-center"
                                                >
                                                    <Ionicons name="remove" size={24} color="#e5a100" />
                                                </TouchableOpacity>
                                                <Text className="text-white text-base font-medium w-6 text-center">
                                                    x{cartItem.quantity}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                                    className="w-7 h-7 rounded-md bg-[#333] items-center justify-center"
                                                >
                                                    <Ionicons name="add" size={24} color="#e5a100" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* Unit */}
                                        <Text className="text-[#888] text-base mb-2">
                                            {cartItem.selectedUnit.item_unit_title} ({cartItem.selectedUnit.item_unit_name})
                                        </Text>

                                        {/* Actions + Price */}
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row gap-2">
                                                <TouchableOpacity
                                                    onPress={() => removeItem(cartItem.id)}
                                                    className="w-8 h-8 rounded-lg bg-[#333] items-center justify-center"
                                                >
                                                    <Ionicons name="trash-outline" size={24} color="red" />
                                                </TouchableOpacity>
                                                <View className="w-8 h-8 rounded-lg bg-[#333] items-center justify-center">
                                                    <Ionicons name="document-text-outline" size={24} color="#e5a100" />
                                                </View>
                                            </View>
                                            <View className="items-end">
                                                <Text className="text-[#888] text-base">
                                                    Rs. {cartItem.pricePerQuantity.toFixed(2)} each
                                                </Text>
                                                <Text className="text-white text-lg font-medium">
                                                    Rs. {cartItem.price.toFixed(2)}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Item note */}
                                        {cartItem.note ? (
                                            <Text className="text-[#888] text-base mt-2 italic">
                                                Note: {cartItem.note}
                                            </Text>
                                        ) : null}
                                    </View>
                                ))
                            )}

                        </ScrollView>

                        {/* Order Note */}
                        <Text className="text-white text-base font-medium mb-2 mt-1">
                            Order Note
                        </Text>
                        <TextInput
                            value={orderNote}
                            onChangeText={(t) => setOrderNote(t.slice(0, 300))}
                            placeholder="Add special instructions for the entire order..."
                            placeholderTextColor="#555"
                            multiline
                            className="bg-[#252525] border border-[#333] rounded-xl px-4 py-3 text-white text-base mb-1"
                            style={{ height: 75, textAlignVertical: 'top' }}
                        />
                        <Text className="text-[#555] text-xs mb-4">
                            {orderNote.length}/300 characters
                        </Text>

                        {/* Bill Summary */}
                        <Text className="text-white text-base font-medium mb-3">
                            Bill Summary
                        </Text>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-[#888] text-sm">
                                Items ({totalItems}
                                )</Text>
                            <Text className="text-white text-sm font-medium">
                                Rs. {total.toFixed(2)}
                            </Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-[#888] text-sm">
                                Subtotal
                            </Text>
                            <Text className="text-white text-sm font-medium">
                                Rs. {total.toFixed(2)}
                            </Text>
                        </View>

                        <View className="h-px bg-[#333] my-3" />

                        <View className="flex-row justify-between mb-5">
                            <Text className="text-white text-base font-medium">
                                Grand Total
                            </Text>
                            <Text className="text-white text-base font-medium">
                                Rs. {total.toFixed(2)}
                            </Text>
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={handlePlaceOrder}
                                disabled={loading || items.length === 0}
                                className="flex-1 bg-[#e5a100] rounded-xl py-4 items-center"
                                style={{ opacity: loading || items.length === 0 ? 0.6 : 1 }}
                            >
                                <Text className="text-white text-sm font-medium">
                                    {loading ? 'Placing...' : `Place Order (Rs. ${total.toFixed(2)})`}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleClear}
                                className="bg-[#dc2626] rounded-xl px-5 py-4 items-center"
                            >
                                <Text className="text-white text-sm font-medium">
                                    Clear
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}