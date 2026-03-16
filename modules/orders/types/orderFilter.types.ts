// order filter types

import { orderStatus } from "./order.types"

export type FilterKey = 'status' | 'payment' | 'table'

export type StatusFilter = orderStatus | 'All'

export type PaymentFilter = 'Pending' | 'Paid' | 'All'

export interface OrderFilterProps {
    statusValue: StatusFilter;
    paymentValue: PaymentFilter;
    tableValue: string;
    statusOptions: StatusFilter[];
    paymentOptions: PaymentFilter[];
    tableOptions: string[];
    onStatusChange: (value: StatusFilter) => void;
    onPaymentChange: (value: PaymentFilter) => void;
    onTableChange: (value: string) => void;
}