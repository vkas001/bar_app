import { MaterialIcons } from '@expo/vector-icons';
import { orderItemStatus } from '@/modules/orders/types/order.types';
import { barTabItemStatus } from '@/modules/barTabs/types/barTab.types';

export const ORDER_STATUS_OPTIONS: orderItemStatus[] = [
    "Pending",
    "Preparing",
    "Ready",
    "Served",
    "Cancelled"

];

export const BAR_TAB_STATUS_OPTIONS: barTabItemStatus[] = [...ORDER_STATUS_OPTIONS, "Cancel"];


export const ITEM_STATUS_COLORS: Record<barTabItemStatus, { backgroundColor: string; color: string }> = {
    Pending: { backgroundColor: "#172554", color: "#60a5fa" },
    Preparing: { backgroundColor: "#4c3a12", color: "#facc15" },
    Ready: { backgroundColor: "#16351f", color: "#86efac" },
    Served: { backgroundColor: "#3f3f46", color: "#f4f4f5" },
    Cancelled: { backgroundColor: "#450a0a", color: "#fca5a5" },
    Cancel: { backgroundColor: "#3f3f46", color: "#f4f4f5" },
};

export const getItemStatusColor = (status: string) =>
    ITEM_STATUS_COLORS[status as barTabItemStatus]
    ?? { backgroundColor: "#3f3f46", color: "#f4f4f5" }

export const getItemStatusIcon = (status: string) =>
    ITEM_STATUS_ICONS[status as barTabItemStatus] ?? "help-outline";

export const ITEM_STATUS_ICONS: Record<barTabItemStatus, keyof typeof MaterialIcons.glyphMap> = {
    Pending: "schedule",
    Preparing: "local-fire-department",
    Ready: "check-circle",
    Served: "done-all",
    Cancelled: "cancel",
    Cancel: "cancel",
};