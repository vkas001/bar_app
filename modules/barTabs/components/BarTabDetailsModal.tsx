import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { BarPaymentStatus, BarTab, BarTabStatus } from "../types/barTab.types";

interface Props {
    visible: boolean;
    tab: BarTab | null;
    onClose: () => void;
}

const statusColors: Record<BarTabStatus, { backgroundColor: string; color: string }> = {
    active: { backgroundColor: "#16351f", color: "#86efac" },
    closed: { backgroundColor: "#2d2d2d", color: "#d4d4d8" },
    suspended: { backgroundColor: "#3b2f4f", color: "#c4b5fd" },
};

const paymentColors: Record<BarPaymentStatus, { backgroundColor: string; color: string }> = {
    active: { backgroundColor: "#16351f", color: "#86efac" },
    partial: { backgroundColor: "#4c3a12", color: "#facc15" },
    unpaid: { backgroundColor: "#4c1d1d", color: "#fca5a5" },
};

export default function BarTabDetailsModal({ visible, tab, onClose }: Props) {
    if (!tab) return null;

    const currentStatusColors = statusColors[tab.status];
    const currentPaymentColors = paymentColors[tab.paymentStatus];

    // ✅ straight from mapped data, no static lookup
    const tabItems = tab.tabItems;
    const tabItemCount = tabItems.length;

    const subtotal = Math.max(0, tab.total - tab.tax);
    const totalWithTax = subtotal + tab.tax;
    const balanceAmount = Math.max(0, totalWithTax - tab.paidAmount);

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View className="flex-1" pointerEvents="box-none">
                <Pressable className="absolute inset-x-0 top-0 bottom-16 bg-black/45" onPress={onClose} />

                <View className="absolute inset-x-0 top-0 bottom-16 flex-row">
                    <Pressable className="flex-1" onPress={onClose} />

                    <View className="w-[80%] rounded-l-2xl px-4 py-4" style={{ backgroundColor: "#000000" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View className="flex-row items-center justify-between px-4 py-4">
                                <Text className="text-3xl font-bold text-white">Bar Tab Details</Text>
                                <Pressable onPress={onClose}>
                                    <Ionicons name="close" size={26} color="white" />
                                </Pressable>
                            </View>

                            <ScrollView className="px-4" showsVerticalScrollIndicator={false}>

                                {/* Summary */}
                                <View className="mt-4 rounded-xl bg-card p-4">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <Ionicons name="person" size={20} color="#facc15" />
                                            <Text className="text-xl font-bold text-white">Tab Bar Summary</Text>
                                        </View>
                                        <View className="rounded-full px-3 py-1" style={{ backgroundColor: currentStatusColors.backgroundColor }}>
                                            <Text className="text-base font-semibold capitalize" style={{ color: currentStatusColors.color }}>
                                                {tab.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="mt-2 flex-row flex-wrap items-center">
                                        <Text className="text-lg text-zinc-300">#{tab.id}</Text>
                                        <Text className="mx-2 text-zinc-500">•</Text>
                                        <Text className="text-lg text-zinc-300">{tab.customerName}</Text>
                                        <Text className="mx-2 text-zinc-500">•</Text>
                                        <Text className="text-lg text-zinc-300">{tab.phone}</Text>
                                    </View>

                                    <Text className="mt-1 text-lg text-zinc-400">{tab.createdAt}</Text>

                                    <View className="mt-2 flex-row items-center gap-2">
                                        <Text className="text-lg font-bold text-zinc-300">Payment:</Text>
                                        <View className="rounded-full px-3 py-1" style={{ backgroundColor: currentPaymentColors.backgroundColor }}>
                                            <Text className="text-base font-semibold capitalize" style={{ color: currentPaymentColors.color }}>
                                                {tab.paymentStatus}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Items */}
                                <View className="mt-4 rounded-xl bg-card p-4">
                                    <View className="mb-4 flex-row items-center">
                                        <Ionicons name="wine" size={20} color="#facc15" />
                                        <Text className="ml-2 text-xl font-semibold text-white">
                                            Tab Bar Items ({tabItemCount})
                                        </Text>
                                    </View>

                                    {tabItemCount === 0 ? (
                                        <View className="rounded-lg bg-black px-4 py-6">
                                            <Text className="text-center text-lg text-zinc-400">No tab bar items</Text>
                                        </View>
                                    ) : (
                                        tabItems.map((item) => (
                                            <View key={item.id} className="mb-3 rounded-lg border-b bg-black pb-3">
                                                <View className="mb-2 flex-row items-center justify-between px-4 py-4">
                                                    <Text className="text-lg font-semibold text-yellow">{item.name}</Text>
                                                    <Text className="text-lg text-zinc-300">Rs. {item.price.toFixed(2)}</Text>
                                                </View>

                                                <View className="mb-1 flex-row items-center gap-2 px-4">
                                                    <Text className="text-xl text-zinc-400">Qty:</Text>
                                                    <Text className="text-xl text-white">{item.quantity}</Text>
                                                    <Text className="text-xl text-zinc-400">unit: {item.unit}</Text>
                                                </View>

                                                {item.note ? (
                                                    <View className="mt-1 flex-row items-center gap-2 px-4">
                                                        <Text className="text-xl text-zinc-400">Note:</Text>
                                                        <Text className="text-xl italic text-zinc-300">{item.note}</Text>
                                                    </View>
                                                ) : null}
                                            </View>
                                        ))
                                    )}
                                </View>

                                {/* Financial Summary */}
                                <View className="mt-4 rounded-xl bg-card p-4 mb-4">
                                    <View className="flex-row gap-4 items-center">
                                        <Ionicons name="cash" size={20} color="#facc15" />
                                        <Text className="mb-2 text-xl font-bold text-white">Financial Summary</Text>
                                    </View>

                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className="text-xl text-zinc-300">SubTotal:</Text>
                                        <Text className="text-xl text-zinc-300">Rs. {subtotal.toFixed(2)}</Text>
                                    </View>
                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className="text-base text-zinc-300">Tax:</Text>
                                        <Text className="text-xl text-zinc-300">Rs. {tab.tax.toFixed(2)}</Text>
                                    </View>

                                    <View className="mb-2" style={{ height: 1, backgroundColor: "#71717a" }} />

                                    <View className="flex-row justify-between pb-2">
                                        <Text className="text-xl font-bold text-white">Total:</Text>
                                        <Text className="text-2xl font-bold text-yellow">Rs. {totalWithTax.toFixed(2)}</Text>
                                    </View>
                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className="text-base text-zinc-300">Paid Amount:</Text>
                                        <Text className="text-xl font-semibold" style={{ color: currentPaymentColors.color }}>
                                            Rs. {tab.paidAmount.toFixed(2)}
                                        </Text>
                                    </View>

                                    <View className="mt-2" style={{ height: 1, backgroundColor: "#71717a" }} />

                                    <View className="mt-2 flex-row justify-between">
                                        <Text className="text-xl font-bold text-zinc-400">Balance:</Text>
                                        <Text className="text-2xl font-bold text-red">Rs. {balanceAmount.toFixed(2)}</Text>
                                    </View>
                                </View>

                                {/* Notes */}
                                <View className="bg-card px-4 py-4 rounded-lg">
                                    <View className="flex-row gap-2">
                                        <Ionicons name="document-text" size={20} color="#facc15" />
                                        <Text className="text-lg font-bold text-white">Notes</Text>
                                    </View>
                                    <Text className="mt-3 text-base text-zinc-300">
                                        {tab.notes?.trim() ? tab.notes : "No notes added."}
                                    </Text>
                                </View>

                            </ScrollView>

                            {/* Actions */}
                            <View className="mt-2 px-4 pb-4 pt-3">
                                <Pressable className="rounded-lg bg-yellow py-3 mb-2">
                                    <Text className="text-center text-xl font-bold text-black">Add Items</Text>
                                </Pressable>
                                <Pressable className="rounded-lg bg-[#3a4455] py-3">
                                    <Text className="text-center text-xl font-bold text-white">Print Invoice</Text>
                                </Pressable>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}