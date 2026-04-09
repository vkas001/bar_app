import { getToken } from '@/shared/storage/secure';

export const useCancelReservation = () => {
  const cancelReservation = async (reservationId: number) => {
    try {
      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      const token = await getToken();

      const res = await fetch(`${baseUrl}/pos/reservation/${reservationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          status: 'cancelled',
        }),
      });

      const json = await res.json();
      console.log('Cancel reservation response:', json);
      return res.ok;
    } catch (err) {
      console.error('Cancel reservation error:', err);
      return false;
    }
  };

  return { cancelReservation };
};