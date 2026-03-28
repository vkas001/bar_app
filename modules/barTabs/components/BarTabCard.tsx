import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { BarPaymentStatus, BarTab, BarTabStatus } from "../types/barTab.types";

interface Props {
    tab: BarTab;
    onPress?: (tab: BarTab) => void;
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

export default function BarTabCard({ tab, onPress }: Props) {
    const currentStatusColors = statusColors[tab.status];
    const currentPaymentColors = paymentColors[tab.paymentStatus];
    const balanceAmount = Math.max(0, tab.total - tab.paidAmount);

    return (
        <TouchableOpacity className="mb-4 w-[90%] self-center" onPress={() => onPress?.(tab)}>
            <View className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">

                {/* Header */}
                <View className="flex-row items-center justify-between gap-2">
                    <Text numberOfLines={1} className="flex-1 text-2xl font-bold text-white">
                        {tab.customerName}
                    </Text>

                    <View
                        className="flex-row items-center gap-2 rounded-full px-4 py-2"
                        style={{ backgroundColor: currentStatusColors.backgroundColor }}
                    >
                        <Ionicons name="time" size={18} color={currentStatusColors.color} />
                        <Text
                            className="text-base font-bold capitalize"
                            style={{ color: currentStatusColors.color }}
                        >
                            {tab.status}
                        </Text>
                    </View>
                </View>

                {/* Phone */}
                <View className="mt-2 flex-row items-center gap-1.5">
                    <Ionicons name="call" size={16} color="rgba(255,255,255,0.45)" />
                    <Text className="text-base text-neutral-400">
                        {tab.phone}
                    </Text>
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-neutral-800 my-3" />

                {/* Info Row */}
                <View className="flex-row items-center">
                    <View className="flex-1 flex-row items-center gap-2">
                        <Ionicons name="wine" size={24} color="rgba(255,255,255,0.45)" />

                        <Text className="text-lg text-neutral-400">
                            {tab.items} items
                        </Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-center gap-2">
                        <Ionicons name="time-outline" size={24} color="rgba(255,255,255,0.45)" />

                        <Text className="text-lg text-neutral-400">
                            {tab.createdAt}
                        </Text>
                    </View>
                    <View className="flex-1" />
                </View>

                {/* Footer */}
                <View className="mt-4 flex-row items-center justify-between">
                    <View>
                        <Text className="text-base uppercase tracking-wide text-neutral-400">
                            Total
                        </Text>
                        <Text className="mt-0.5 text-base font-bold text-white">
                            Rs. {tab.total.toFixed(2)}
                        </Text>
                    </View>

                    <View className="items-end">
                        <Text className="text-base uppercase tracking-wide text-red-500">
                            Balance
                        </Text>
                        <Text className="mt-0.5 text-base font-bold text-red-500">
                            Rs. {balanceAmount.toFixed(2)}
                        </Text>
                    </View>
                    <View
                        className="flex-row items-center gap-2 rounded-full px-4 py-2"
                        style={{ backgroundColor: currentPaymentColors.backgroundColor }}
                    >
                        <Ionicons name="cash" size={16} color={currentPaymentColors.color} />
                        <Text
                            className="text-base font-bold capitalize"
                            style={{ color: currentPaymentColors.color }}
                        >
                            {tab.status}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}