import { BarTab, BarTabItem } from "../types/barTab.types";

export const barTabs: BarTab[] = [
    {
        id: "1",
        customerName: "Bikash Limbu",
        phone: "9800000000",
        notes: "Customer prefers less ice and quick service.",
        items: 2,
        tax: 180,
        total: 27180,
        paidAmount: 0,
        balance: 27180,
        status: "active",
        paymentStatus: "active",
        createdAt: "1 hour ago",
    },
    {
        id: "2",
        customerName: "Cristiano Ronaldo",
        phone: "9800000000",
        notes: "No special notes.",
        items: 0,
        tax: 0,
        total: 0,
        paidAmount: 0,
        balance: 0,
        status: "active",
        paymentStatus: "unpaid",
        createdAt: "1 day ago",
    },
];

export const barTabItemsByTabId: Record<string, BarTabItem[]> = {
    "1": [
        { id: "BTI-001", name: "Whiskey", qty: 2, unit: "Glass", note: "Less ice" },
        { id: "BTI-002", name: "Beer", qty: 3, unit: "Bottle" },
        { id: "BTI-003", name: "Peanuts", qty: 1, unit: "Plate" },
    ],
    "2": [
        { id: "BTI-004", name: "Soda", qty: 2, unit: "Can" },
        { id: "BTI-005", name: "Fries", qty: 1, unit: "Plate", note: "Extra salt" },
    ],
};