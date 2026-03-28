import {
    ApiOrder,
    order,
    orderItem,
    orderItemStatus,
    orderStatus
} from '../types/order.types';

const mapStatus = (status: string): orderStatus => {
    const map: Record<string, orderStatus> = {
        processing: 'Processing',
        completed: 'Completed',
        pending: 'Pending',
        cancelled: 'Cancelled',
    };
    return map[status.toLowerCase()] ?? 'Pending';
};

const mapItemStatus = (status: string): orderItemStatus => {
    const map: Record<string, orderItemStatus> = {
        pending: 'Pending',
        preparing: 'Preparing',
        ready: 'Ready',
        served: 'Served',
        cancel: 'Cancel',
    };
    return map[status.toLowerCase()] ?? 'Pending';
};

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const mapApiOrder = (apiOrder: ApiOrder): order => {
    const tables = apiOrder.reservation.tables;

    // Build table label: "B:6" or "A:1, A:2" for multiple tables
    const tableLabel = tables
        .map((t) => `${t.table_type.name}:${t.name}`)
        .join(', ');

    //Map order items
    const orderItems: orderItem[] = apiOrder.order_details.map((detail) => ({
        id: detail.item.name,  // Using item name as ID
        name: detail.item.name,
        quantity: detail.quantity,
        unit: detail.item_unit.title,
        note: detail.note || '',
        status: mapItemStatus(detail.status),
        price: detail.price,
    }));
    
    // Sum total from order_details
    const total = apiOrder.order_details.reduce(
        (sum, detail) => sum + detail.price * detail.quantity,
        0
    );

    return {
        id: String(apiOrder.id),
        table: tableLabel,
        customer: apiOrder.reservation.customer.name,
        status: mapStatus(apiOrder.status),
        type: apiOrder.reservation.status,
        date: formatDate(apiOrder.created_at),
        items: apiOrder.order_details.length,
        peopleCount: apiOrder.reservation.party_size,
        total,
        paymentStatus: apiOrder.payment ? 'Paid' : 'Pending',
        orderItems,
    };
};