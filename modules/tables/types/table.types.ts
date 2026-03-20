export const TYPES = [
    "AllTypes", "A", "B", "C", "D", "VIP1", "VIP2"
] as const;

export type TableType = (typeof TYPES)[number];

export type Table = {
    id: string;
    label: string;
    seats: number;
    status: "empty" | "occupied";
};

