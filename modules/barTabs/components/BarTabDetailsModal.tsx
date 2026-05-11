import { PermissionGuard } from "@/modules/auth/guard";
import { useOrderStore } from "@/modules/orders/store/createOrderStore";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import {
    BAR_TAB_STATUS_OPTIONS,
    getItemStatusColor,
    getItemStatusIcon
} from "../../menu/types/itemStatus";
import { BarPaymentStatus, BarTab, BarTabStatus, barTabItemStatus } from "../types/barTab.types";

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
    const [tabItems, setTabItems] = useState(tab?.tabItems ?? []);
    const [openStatusMenuItemId, setOpenStatusMenuItemId] = useState<string | number | null>(null);

    const setBarTabCustomerData = useOrderStore(state => state.setBarTabCustomerData);
    const setBarTabPreviousItems = useOrderStore(state => state.setBarTabPreviousItems);
    const router = useRouter();

    useEffect(() => {
        setTabItems(tab?.tabItems ?? []);
    }, [tab]);

    const {
        isSmallPhone,
        textXs, textSm, textBase, textLg, textXl,
        text2xl, text3xl,
        iconXs, iconSm, iconMd,
        size,
    } = useResponsive();

    if (!tab) return null;

    const currentStatusColors = statusColors[tab.status];
    const currentPaymentColors = paymentColors[tab.paymentStatus];

    const tabItemCount = tabItems.length;

    const subtotal = Math.max(0, tab.total - tab.tax);
    const totalWithTax = subtotal + tab.tax;
    const balanceAmount = Math.max(0, totalWithTax - tab.paidAmount);

    const updateItemStatus = (itemId: string | number, newStatus: barTabItemStatus) => {
        setTabItems(prev =>
            prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item)
        );
        setOpenStatusMenuItemId(null);
    };

    const s = isSmallPhone ? {
        headerText: textXl,
        sectionTitle: textBase,
        bodyText: textSm,
        smallText: textXs,
        amountText: textBase,
        totalText: textLg,
        iconSize: iconXs,
        sectionIcon: iconSm,
        px: 'px-2',
        py: 'py-2',
        cardP: 'p-3',
        badgePx: 'px-2 py-0.5',
        itemPx: 'px-2 py-2',
        gap: size.padding.sm,
    } : {
        headerText: 'text-3xl',
        sectionTitle: 'text-xl',
        bodyText: 'text-lg',
        smallText: 'text-base',
        amountText: 'text-xl',
        totalText: 'text-2xl',
        iconSize: 20,
        sectionIcon: 20,
        px: 'px-4',
        py: 'py-4',
        cardP: 'p-4',
        badgePx: 'px-3 py-1',
        itemPx: 'px-4 py-4',
        gap: 8,
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View className="flex-1" pointerEvents="box-none">
                <Pressable className="absolute inset-x-0 top-0 bottom-16 bg-black/45" onPress={onClose} />

                <View className="absolute inset-x-0 top-0 bottom-16 flex-row">
                    <Pressable className="flex-1" onPress={onClose} />

                    <View className="rounded-l-2xl" style={{ width: '100%', backgroundColor: "#000000" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* Header */}
                            <View className={`flex-row items-center justify-between ${s.px} ${s.py}`}>
                                <Text className={`font-bold text-white ${s.headerText}`}>Bar Tab Details</Text>
                                <Pressable onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                    <Ionicons name="close" size={isSmallPhone ? 20 : 26} color="white" />
                                </Pressable>
                            </View>

                            <View className={s.px}>

                                {/* Summary */}
                                <View className={`rounded-xl bg-card ${s.cardP} mt-2`}>
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1 mr-2" style={{ gap: s.gap }}>
                                            <Ionicons name="person" size={s.sectionIcon} color="#facc15" />
                                            <Text className={`font-bold text-white flex-1 ${s.sectionTitle}`} numberOfLines={1}>
                                                Tab Summary
                                            </Text>
                                        </View>
                                        <View className={`rounded-full ${s.badgePx}`} style={{ backgroundColor: currentStatusColors.backgroundColor }}>
                                            <Text className={`font-semibold capitalize ${s.smallText}`} style={{ color: currentStatusColors.color }}>
                                                {tab.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="mt-2 flex-row flex-wrap items-center" style={{ gap: 4 }}>
                                        <Text className={`text-zinc-300 ${s.bodyText}`} numberOfLines={1}>#{tab.id}</Text>
                                        <Text className="text-zinc-500 mx-1">•</Text>
                                        <Text className={`text-zinc-300 ${s.bodyText}`} numberOfLines={1}>{tab.customerName}</Text>
                                        <Text className="text-zinc-500 mx-1">•</Text>
                                        <Text className={`text-zinc-300 ${s.bodyText}`} numberOfLines={1}>{tab.phone}</Text>
                                    </View>

                                    <Text className={`mt-1 text-zinc-400 ${s.smallText}`}>{tab.createdAt}</Text>

                                    <View className="mt-2 flex-row items-center" style={{ gap: s.gap }}>
                                        <Text className={`font-bold text-zinc-300 ${s.bodyText}`}>Payment:</Text>
                                        <View className={`rounded-full ${s.badgePx}`} style={{ backgroundColor: currentPaymentColors.backgroundColor }}>
                                            <Text className={`font-semibold capitalize ${s.smallText}`} style={{ color: currentPaymentColors.color }}>
                                                {tab.paymentStatus}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Items */}
                                <View className={`mt-4 rounded-xl bg-card ${s.cardP}`}>
                                    <View className="mb-3 flex-row items-center" style={{ gap: s.gap }}>
                                        <Ionicons name="wine" size={s.sectionIcon} color="#facc15" />
                                        <Text className={`font-semibold text-white ${s.sectionTitle}`}>
                                            Items ({tabItemCount})
                                        </Text>
                                    </View>

                                    {tabItemCount === 0 ? (
                                        <View className="rounded-lg bg-black px-4 py-6">
                                            <Text className={`text-center text-zinc-400 ${s.bodyText}`}>No tab bar items</Text>
                                        </View>
                                    ) : (
                                        tabItems.map((item) => (
                                            <View key={item.id} className="mb-3 rounded-lg border-b bg-black pb-3">

                                                {/* Name + Price */}
                                                <View className={`mb-1 flex-row items-center justify-between ${s.itemPx}`}>
                                                    <Text className={`font-semibold text-yellow flex-1 mr-2 ${s.bodyText}`} numberOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                    <Text className={`text-zinc-300 ${s.smallText}`}>
                                                        Rs. {item.price.toFixed(2)}
                                                    </Text>
                                                </View>

                                                {/* Qty / Unit */}
                                                <View className={`flex-row items-center ${s.px}`} style={{ gap: s.gap }}>
                                                    <Text className={`text-zinc-400 ${s.smallText}`}>Qty:</Text>
                                                    <Text className={`text-white ${s.smallText}`}>{item.quantity}</Text>
                                                    <Text className={`text-zinc-400 ${s.smallText}`}>unit: {item.unit}</Text>
                                                </View>

                                                {/* Note */}
                                                {item.note ? (
                                                    <View className={`mt-1 flex-row items-center ${s.px}`} style={{ gap: s.gap }}>
                                                        <Text className={`text-zinc-400 ${s.smallText}`}>Note:</Text>
                                                        <Text className={`italic text-zinc-300 flex-1 ${s.smallText}`} numberOfLines={2}>
                                                            {item.note}
                                                        </Text>
                                                    </View>
                                                ) : null}

                                                {/* Status + Change */}
                                                <View className={`mt-2 flex-row items-center justify-between ${s.px}`}>
                                                    <View
                                                        className={`rounded-full flex-row items-center ${s.badgePx}`}
                                                        style={{
                                                            backgroundColor: getItemStatusColor(item.status).backgroundColor,
                                                            gap: size.padding.sm,
                                                        }}
                                                    >
                                                        <MaterialIcons
                                                            name={getItemStatusIcon(item.status)}
                                                            size={s.iconSize}
                                                            color={getItemStatusColor(item.status).color}
                                                        />
                                                        <Text
                                                            className={`font-semibold ${s.smallText}`}
                                                            style={{ color: getItemStatusColor(item.status).color }}
                                                        >
                                                            {item.status}
                                                        </Text>
                                                    </View>

                                                    <View className="relative items-end">
                                                        <Pressable
                                                            className={`bg-zinc-700 rounded-full flex-row items-center ${isSmallPhone ? 'px-2 py-0.5' : 'px-3 py-1'}`}
                                                            style={{ gap: size.padding.sm }}
                                                            onPress={() =>
                                                                setOpenStatusMenuItemId(openStatusMenuItemId === item.id ? null : item.id)
                                                            }
                                                        >
                                                            <MaterialIcons name="edit" size={s.iconSize} color="#e4e4e7" />
                                                            {!isSmallPhone && (
                                                                <Text className={`text-zinc-200 font-semibold ${s.smallText}`}>
                                                                    Change Status
                                                                </Text>
                                                            )}
                                                            <MaterialIcons name="keyboard-arrow-down" size={isSmallPhone ? 14 : 18} color="#e4e4e7" />
                                                        </Pressable>

                                                        {openStatusMenuItemId === item.id && (
                                                            <View className="absolute top-8 right-0 bg-zinc-800 border border-zinc-700 rounded-xl py-1 min-w-[130px] z-20">
                                                                {BAR_TAB_STATUS_OPTIONS.map((statusOption) => {
                                                                    if (statusOption === 'Cancel') {
                                                                        return (
                                                                            <PermissionGuard
                                                                                key={statusOption}
                                                                                permissions={['pos.order_delete']}
                                                                                fallback={
                                                                                    <View className={`flex-row items-center opacity-40 ${isSmallPhone ? 'px-2 py-1.5' : 'px-3 py-2'}`}
                                                                        style={{ gap: size.padding.sm }}
                                                                                    >
                                                                        <MaterialIcons
                                                                            name={getItemStatusIcon(statusOption)}
                                                                            size={s.iconSize}
                                                                            color={getItemStatusColor(statusOption).color}
                                                                        />
                                                                        <Text
                                                                            className={`font-semibold ${s.smallText}`}
                                                                            style={{ color: getItemStatusColor(statusOption).color }}
                                                                        >
                                                                            {statusOption}
                                                                        </Text>
                                                                    </View>
                                                                    }
                                                                            >
                                                                    <Pressable
                                                                        className={`flex-row items-center ${isSmallPhone ? 'px-2 py-1.5' : 'px-3 py-2'}`}
                                                                        style={{ gap: size.padding.sm }}
                                                                        onPress={() => updateItemStatus(item.id, statusOption)}
                                                                    >
                                                                        <MaterialIcons
                                                                            name={getItemStatusIcon(statusOption)}
                                                                            size={s.iconSize}
                                                                            color={getItemStatusColor(statusOption).color}
                                                                        />
                                                                        <Text
                                                                            className={`font-semibold ${s.smallText}`}
                                                                            style={{ color: getItemStatusColor(statusOption).color }}
                                                                        >
                                                                            {statusOption}
                                                                        </Text>
                                                                    </Pressable>
                                                                            </PermissionGuard>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <Pressable
                                                                            key={statusOption}
                                                                            className={`flex-row items-center ${isSmallPhone ? 'px-2 py-1.5' : 'px-3 py-2'}`}
                                                                            style={{ gap: size.padding.sm }}
                                                                            onPress={() => updateItemStatus(item.id, statusOption)}
                                                                        >
                                                                            <MaterialIcons
                                                                                name={getItemStatusIcon(statusOption)}
                                                                                size={s.iconSize}
                                                                                color={getItemStatusColor(statusOption).color}
                                                                            />
                                                                            <Text
                                                                                className={`font-semibold ${s.smallText}`}
                                                                                style={{ color: getItemStatusColor(statusOption).color }}
                                                                            >
                                                                                {statusOption}
                                                                            </Text>
                                                                        </Pressable>
                                                                    );
                                                                })}
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>

                                            </View>
                                        ))
                                    )}
                                </View>

                                {/* Financial Summary */}
                                <View className={`mt-4 rounded-xl bg-card ${s.cardP} mb-4`}>
                                    <View className="flex-row items-center mb-2" style={{ gap: s.gap }}>
                                        <Ionicons name="cash" size={s.sectionIcon} color="#facc15" />
                                        <Text className={`font-bold text-white ${s.sectionTitle}`}>Financial Summary</Text>
                                    </View>

                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className={`text-zinc-300 ${s.bodyText}`}>SubTotal:</Text>
                                        <Text className={`text-zinc-300 ${s.amountText}`}>Rs. {subtotal.toFixed(2)}</Text>
                                    </View>
                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className={`text-zinc-300 ${s.smallText}`}>Tax:</Text>
                                        <Text className={`text-zinc-300 ${s.amountText}`}>Rs. {tab.tax.toFixed(2)}</Text>
                                    </View>

                                    <View className="mb-2" style={{ height: 1, backgroundColor: "#71717a" }} />

                                    <View className="flex-row justify-between pb-2">
                                        <Text className={`font-bold text-white ${s.bodyText}`}>Total:</Text>
                                        <Text className={`font-bold text-yellow ${s.totalText}`}>Rs. {totalWithTax.toFixed(2)}</Text>
                                    </View>
                                    <View className="mb-2 flex-row justify-between pb-2">
                                        <Text className={`text-zinc-300 ${s.smallText}`}>Paid Amount:</Text>
                                        <Text className={`font-semibold ${s.amountText}`} style={{ color: currentPaymentColors.color }}>
                                            Rs. {tab.paidAmount.toFixed(2)}
                                        </Text>
                                    </View>

                                    <View className="mt-2" style={{ height: 1, backgroundColor: "#71717a" }} />

                                    <View className="mt-2 flex-row justify-between">
                                        <Text className={`font-bold text-red-500 ${s.bodyText}`}>Balance:</Text>
                                        <Text className={`font-bold text-red-500 ${s.totalText}`}>Rs. {balanceAmount.toFixed(2)}</Text>
                                    </View>
                                </View>

                                {/* Notes */}
                                <View className={`bg-card rounded-lg ${s.cardP}`}>
                                    <View className="flex-row items-center" style={{ gap: s.gap }}>
                                        <Ionicons name="document-text" size={s.sectionIcon} color="#facc15" />
                                        <Text className={`font-bold text-white ${s.bodyText}`}>Notes</Text>
                                    </View>
                                    <Text className={`mt-3 text-zinc-300 ${s.smallText}`}>
                                        {tab.notes?.trim() ? tab.notes : "No notes added."}
                                    </Text>
                                </View>

                            </View>

                            {/* Actions */}
                            <View className={`mt-2 ${s.px} pb-4 pt-3`}>
                                <Pressable
                                    className={`rounded-lg bg-yellow mb-2 ${isSmallPhone ? 'py-2' : 'py-3'}`}
                                    onPress={() => {
                                        setBarTabCustomerData({
                                            id: tab.id,
                                            customerName: tab.customerName,
                                            customerPhone: tab.phone,
                                            notes: tab.notes ?? null,
                                        });
                                        setBarTabPreviousItems(tab.tabItems);
                                        onClose();
                                        router.push('/(tabs)/menu');
                                    }}
                                >
                                    <Text className={`text-center font-bold text-black ${s.sectionTitle}`}>
                                        Add Items
                                    </Text>
                                </Pressable>
                                <Pressable className={`rounded-lg bg-[#3a4455] ${isSmallPhone ? 'py-2' : 'py-3'}`}>
                                    <Text className={`text-center font-bold text-white ${s.sectionTitle}`}>Print Invoice</Text>
                                </Pressable>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}