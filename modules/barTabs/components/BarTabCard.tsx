import { useResponsive } from "@/shared/hooks/useResponsive";
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
    const {
        isTablet,
        isLargeTablet,
        isSmallPhone,
        textXs,
        textSm,
        textBase,
        textLg,
        text2xl,
        iconSm,
        iconMd,
        cardPadding,
        roundedCard,
        gap,
        size,
    } = useResponsive();

    const currentStatusColors = statusColors[tab.status];
    const currentPaymentColors = paymentColors[tab.paymentStatus];
    const balanceAmount = Math.max(0, tab.total - tab.paidAmount);

    // Static fallback for badge padding classes (choose most common or default)
    // If you want to keep responsive, use style prop below
    const badgePx = undefined;
    const badgePy = undefined;

    return (
        <TouchableOpacity
            className="mb-3 w-[92%] self-center"
            activeOpacity={0.75}
            onPress={() => onPress?.(tab)}
        >
            <View
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
            >
                {/* Header */}
                <View className="flex-row items-center justify-between gap-2">
                    <Text numberOfLines={1} className="flex-1 font-bold text-white text-2xl">
                        {tab.customerName}
                    </Text>

                    <View
                        className="flex-row items-center rounded-full px-3 py-1.5"
                        style={{ backgroundColor: currentStatusColors.backgroundColor, gap: size.padding.sm }}
                    >
                        <Ionicons name="time" size={iconSm} color={currentStatusColors.color} />
                        {!isSmallPhone && (
                            <Text className="font-bold capitalize text-sm" style={{ color: currentStatusColors.color }}>
                                {tab.status}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Phone */}
                <View className="mt-1.5 flex-row items-center" style={{ gap: size.padding.sm }}>
                    <Ionicons name="call" size={iconSm} color="rgba(255,255,255,0.45)" />
                    <Text className="text-neutral-400 text-base">{tab.phone}</Text>
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-neutral-800 my-3" />

                {/* Info Row */}
                <View className="flex-row items-center">
                    <View className="flex-1 flex-row items-center" style={{ gap: size.padding.sm }}>
                        <Ionicons name="wine" size={iconMd} color="rgba(255,255,255,0.45)" />
                        <Text className="text-neutral-400 text-base">
                            {tab.items}{isSmallPhone ? '' : ' items'}
                        </Text>
                    </View>

                    <View className="flex-1 flex-row items-center justify-center" style={{ gap: size.padding.sm }}>
                        <Ionicons name="time-outline" size={iconMd} color="rgba(255,255,255,0.45)" />
                        <Text className="text-neutral-400 text-base" numberOfLines={1}>
                            {tab.createdAt}
                        </Text>
                    </View>

                    <View className="flex-1" />
                </View>

                {/* Footer */}
                <View className="mt-4 flex-row items-center justify-between">
                    <View>
                        <Text className="uppercase tracking-wide text-neutral-400 text-xs">Total</Text>
                        <Text className="mt-0.5 font-bold text-white text-sm">Rs. {tab.total.toFixed(2)}</Text>
                    </View>

                    <View className="items-end">
                        <Text className="uppercase tracking-wide text-red-500 text-xs">Balance</Text>
                        <Text className="mt-0.5 font-bold text-red-500 text-sm">Rs. {balanceAmount.toFixed(2)}</Text>
                    </View>

                    <View
                        className="flex-row items-center rounded-full px-3 py-1.5"
                        style={{ backgroundColor: currentPaymentColors.backgroundColor, gap: size.padding.sm }}
                    >
                        <Ionicons name="cash" size={iconSm} color={currentPaymentColors.color} />
                        {!isSmallPhone && (
                            <Text className="font-bold capitalize text-sm" style={{ color: currentPaymentColors.color }}>
                                {tab.paymentStatus}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}