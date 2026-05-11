import { getApiBaseUrl } from '@/shared/api/baseUrl';
import { getToken } from '@/shared/storage/secure';

export const useChangeTable = () => {
  const changeTable = async (reservationId: number, tableIds: number[]) => {
    try {
      const baseUrl = getApiBaseUrl();
      const token = await getToken();

      const res = await fetch(`${baseUrl}/pos/reservation/${reservationId}/change-table`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          table_ids: tableIds,
        }),
      });

      const json = await res.json();
     // console.log('Change table response:', json);
      return res.ok;
    } catch (err) {
    //  console.error('Change table error:', err);
      return false;
    }
  };

  return { changeTable };
};