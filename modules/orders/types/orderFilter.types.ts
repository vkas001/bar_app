import { orderStatus } from "./order.types";

export type StatusFilter = 'All' | orderStatus;
export type PaymentFilter = 'All' | 'Pending' | 'Paid';
export type FilterKey = 'status' | 'payment' | 'table';

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