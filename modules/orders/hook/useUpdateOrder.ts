import { getToken } from '@/shared/storage/secure';
import { getApiBaseUrl } from '@/shared/api/config';

export const useUpdateOrderItemStatus = () => {
  const updateOrderItemStatus = async (itemId: string, status: string) => { 
    try {
      const baseUrl = await getApiBaseUrl();
      const token = await getToken();

    //  console.log('URL:', `${baseUrl}/pos/order-details/${itemId}/status`);
    //  console.log('Payload:', JSON.stringify({ status }));

      const res = await fetch(`${baseUrl}/pos/order-details/${itemId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',   
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ status }),
      });

      const json = await res.json();
     // console.log('Update order item status response:', json);
      return res.ok;
    } catch (err) {
      console.error('Update order item status error:', err);
      return false;
    }
  };

  return { updateOrderItemStatus };
};