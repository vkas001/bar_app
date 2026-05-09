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
        cancelled: 'Cancelled',
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
    // console.log('[mapApiOrder] full reservation:', JSON.stringify(apiOrder.reservation, null, 2));
   // console.log('order_details:', JSON.stringify(apiOrder.order_details, null, 2));
    const tables = apiOrder.reservation.tables;

    const rawCustomer = apiOrder.reservation.customer;

    // Build table label: "B:6" or "A:1, A:2" for multiple tables
    const tableLabel = tables
        .map((t) => `${t.table_type.name}:${t.name}`)
        .join(', ');

    //Map order items
    const orderItems: orderItem[] = apiOrder.order_details.map((detail) => ({
        id: detail.item.name,
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
        reservationId: String(apiOrder.reservation.id),
        tableIds: tables.map((t) => t.id),
        customer: rawCustomer.name || 'Walk-in',
        customerPhone: rawCustomer.phone || '',
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

export const groupReservationOrders = (apiOrders: ApiOrder[]): order[] => {
    // Group by reservation ID
    const groups = new Map<number, ApiOrder[]>()

    for (const apiOrder of apiOrders) {
        const resId = apiOrder.reservation.id
        if (!groups.has(resId)) groups.set(resId, [])
        groups.get(resId)!.push(apiOrder)
    }

    // For each reservation group, merge into one order
    return Array.from(groups.values()).map((group) => {
        // Sort so oldest order is the "base"
        const sorted = group.sort((a, b) => a.id - b.id)
        const base = sorted[0]
        const tables = base.reservation.tables

        const tableLabel = tables.map((t) => `${t.table_type.name}:${t.name}`).join(', ')
        const rawCustomer = base.reservation.customer

        // Merge ALL order_details from ALL orders in this reservation
        const allDetails = sorted.flatMap((o) => o.order_details)

        const orderItems: orderItem[] = allDetails.map((detail) => ({
            id: String(detail.id),
            name: detail.item.name,
            quantity: detail.quantity,
            unit: detail.item_unit.title,
            note: detail.note || '',
            status: mapItemStatus(detail.status),
            price: detail.price,
        }))

        const total = allDetails.reduce(
            (sum, detail) => sum + detail.price * detail.quantity,
            0
        )

        // Check payment — paid only if ALL orders are paid
        const anyUnpaid = sorted.some((o) => !o.payment)

        return {
            id: String(base.id),
            reservationId: String(base.reservation.id),
            tableIds: tables.map((t) => t.id),
            table: tableLabel,
            customer: rawCustomer.name || 'Walk-in',
            customerPhone: rawCustomer.phone || '',
            status: mapStatus(base.status),
            type: base.reservation.status,
            date: formatDate(base.created_at),
            items: allDetails.length,
            peopleCount: base.reservation.party_size,
            total,
            paymentStatus: anyUnpaid ? 'Pending' : 'Paid',
            orderItems,
        }
    })
}