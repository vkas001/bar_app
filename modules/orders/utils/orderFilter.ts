import { order } from '../types/order.types';
import { PaymentFilter, StatusFilter } from '../types/orderFilter.types';

export const filterOrders = (
    orders: order[],
    statusFilter: StatusFilter,
    paymentFilter: PaymentFilter,
    tableFilter: string
): order[] => {
    return orders.filter((order) => {
        // Status filter
        const statusMatch =
            statusFilter === 'All' || order.status === statusFilter;

        // Payment filter
        const paymentMatch =
            paymentFilter === 'All' || order.paymentStatus === paymentFilter;

        // Table filter - check if any of the order's tables match
        const tableMatch =
            tableFilter === 'All' ||
            order.table.split(',').some((t) => {
                const trimmed = t.trim();
                return trimmed === tableFilter || trimmed.startsWith(tableFilter);
            });

        return statusMatch && paymentMatch && tableMatch;
    });
};

// Extract unique table options from orders
export const getTableOptions = (orders: order[]): string[] => {
    const tablesSet = new Set<string>(['All']);

    orders.forEach((order) => {
        order.table.split(',').forEach((t) => {
            const trimmed = t.trim();
            if (trimmed) {
                tablesSet.add(trimmed);
            }
        });
    });

    return Array.from(tablesSet).sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return a.localeCompare(b);
    });
};