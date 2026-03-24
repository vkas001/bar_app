//export const TYPES = ['AllTypes', 'A', 'B', 'C'] as const;
//export type TableType = typeof TYPES[number];

export type TableType = string;

export interface TableTypeObject {
    id: number;
    name: string;
    description: string | null;
}

export interface Table {
    id: string;
    name: string;
    status: string | null;
    group: string;
    initials?: string;
    seats: number;
    table_type: TableTypeObject;
    capacity: number;
    is_available: boolean;
    is_active: boolean;
}