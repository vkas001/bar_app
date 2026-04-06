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
    label?: string; // Optional label for UI display
}

export interface CreateOrderRequest {
    customer_name: string;
    customer_phone: string;
    guests: number;
    table_ids: number[];  // Add table IDs to the order request 
    reservation_id?: number; // Optional reservation ID if this order is linked to a reservation
}

// API response for a single table
export interface TableApiResponse {
    data: Table;
    [key: string]: any; // for any additional fields
}