import { getToken } from '@/shared/storage/secure';
import { getApiBaseUrl } from '@/shared/api/config';
import { useEffect, useState } from 'react';
import { order, orderItem, orderItemStatus, orderStatus } from '../types/order.types';
import { groupReservationOrders } from '../utils/orderMapper';

export const deriveOrderStatusFromItems = (items: orderItem[]): orderStatus => {
    if (items.length === 0) return 'Pending';

    const activeItems = items.filter((item) => item.status !== 'Cancelled');

    if (activeItems.length === 0) return 'Cancelled';
    if (activeItems.every((item) => item.status === 'Served')) return 'Completed';
    if (activeItems.every((item) => item.status === 'Pending')) return 'Pending';

    return 'Processing';
};

export const useOrders = () => {
    const [orders, setOrders] = useState<order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const baseUrl = await getApiBaseUrl();
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/latest-orders`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });

            const text = await res.text();
            const json = JSON.parse(text);

            const mapped = groupReservationOrders(json.data);

            // console.log('Fetched orders:', mapped);

            setOrders(mapped);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderItemStatusLocally = (
        orderId: string,
        itemId: string,
        newStatus: orderItemStatus
    ) => {
        setOrders((prevOrders) =>
            prevOrders.map((existingOrder) => {
                if (existingOrder.id !== orderId) return existingOrder;

                const updatedItems = existingOrder.orderItems.map((item) =>
                    item.id === itemId ? { ...item, status: newStatus } : item
                );

                return {
                    ...existingOrder,
                    orderItems: updatedItems,
                    status: deriveOrderStatusFromItems(updatedItems),
                };
            })
        );
    };

    return { orders, loading, error, refetch: fetchOrders, updateOrderItemStatusLocally };
};