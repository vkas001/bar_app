export type orderStatus = 'Processing' | 'Completed' | 'Pending' | 'Cancelled';
export type orderItemStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served' | 'Cancelled';

//  Mapped/UI types

export interface order {
    id: string;
    table: string;
    customer: string;
    customerPhone?: string;
    status: orderStatus;
    type: string;
    date: string;
    items: number;
    peopleCount?: number;
    total: number;
    paymentStatus: string;
    orderItems: orderItem[];
}

export interface orderItem {
    id: string;
    name: string;
    unit: string;
    note: string;
    status: orderItemStatus;
    price: number;
    quantity: number;
}

//Raw API types

export interface ApiOrderDetail {
    id: number;
    item: { name: string };
    item_unit: { title: string };
    status: string;
    quantity: number;
    price: number;
    note: string;
}

export interface ApiOrder {
    id: number;
    reservation: {
        customer: {
            id: number;
            name: string;
            phone: string;
        };
        party_size: number;
        status: string;
        tables: {
            id: number;
            name: string;
            status: string;
            table_type: { id: number; name: string };
            capacity: number;
            is_available: boolean;
            is_active: boolean;
        }[];
        date_time: string;
    };
    status: string;
    note: string | null;
    order_details: ApiOrderDetail[];
    payment: null | object;
    created_at: string;
}

// Cart types 

export interface CartItemUnit {
    id: number;
    item_unit_id: number;
    item_unit_name: string;
    item_unit_title: string;
    item_unit_price: number;
}

export interface CartItem {
    id: number;
    item_id: number;
    name: string;
    quantity: number;
    price: number;
    pricePerQuantity: number;
    selectedUnit: CartItemUnit;
    note?: string;
}

// Create order types

export interface CreateOrderRequest {
    customerName: string;
    phone: string;
    tableIds: number[];
    guestCount: number;
    items: OrderPayloadItem[];
    subtotal: number;
    tax: number;
    total: number;
    orderNote: string;
    paymentMethod: string;
    reservationId: number | null;
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        reservation: any;
        status: string;
        created_at: string;
    };
}

export interface OrderPayloadUnit {
    id: number;
    value: string;
}

export interface OrderPayloadItem {
    id: number;
    item_id: number;
    name: string;
    quantity: number;
    price: number;
    pricePerQuantity: number;
    selectedUnit: OrderPayloadUnit;
    note?: string;
}