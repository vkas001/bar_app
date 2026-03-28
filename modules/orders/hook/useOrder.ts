import { getToken } from '@/shared/storage/secure';
import { useEffect, useState } from 'react';
import { ApiOrder, order } from '../types/order.types';
import { mapApiOrder } from '../utils/orderMapper';
import { PaymentFilter, StatusFilter } from '../types/orderFilter.types';

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
            const baseUrl = process.env.EXPO_PUBLIC_API_URL;
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/latest-orders`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });

            const text = await res.text();
            const json = JSON.parse(text);

            const mapped: order[] = (json.data || []).map((o: ApiOrder) =>
                mapApiOrder(o)
            );

            // console.log('Fetched orders:', mapped);

            setOrders(mapped);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    return { orders, loading, error, refetch: fetchOrders };
};