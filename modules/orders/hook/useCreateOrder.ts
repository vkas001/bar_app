import { getToken } from '@/shared/storage/secure';
import { CreateOrderRequest, CreateOrderResponse } from '../types/order.types';

export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
        const baseUrl = process.env.EXPO_PUBLIC_API_URL;
        const token = await getToken();

        const response = await fetch(`${baseUrl}/pos/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(orderData),
        });

        const text = await response.text();
        console.log('API Response Status:', response.status);
        console.log('API Response Body:', text);
        const json = JSON.parse(text);

        if (!response.ok) {
            throw new Error(json.message || 'Failed to create order');
        }

        return json;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};