import { getToken } from '@/shared/storage/secure';
import { CreateOrderRequest } from '../types/order.types';

export const useCreateOrder = () => {
    const createOrder = async (payload: CreateOrderRequest): Promise<boolean> => {
        try {
            // Log the table ID(s) being sent in the payload
            if (payload.tableIds) {
              //  console.log('Table IDs in payload:', payload.tableIds);
            } else {
              //  console.log('No table IDs found in payload:', payload);
            }

            const baseUrl = process.env.EXPO_PUBLIC_API_URL;
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            const json = JSON.parse(text);
            // console.log('Order API response:', json);

            if (!res.ok) {
                // console.log('Order API error:', json);
                return false;
            }

            return true;
        } catch (err) {
            console.error('Order error:', err);
            return false;
        }
    };

    return { createOrder };
};