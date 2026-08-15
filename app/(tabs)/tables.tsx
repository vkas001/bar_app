import ScreenHeader from '@/components/Header/ScreenHeader'
import { useScreenRefresh } from '@/components/refresh/refresh'
import LoadingScreen from '@/components/refresh/LoadingScreen'
import { useOrderStore } from '@/modules/orders/store/createOrderStore'
import TableScreen from '@/modules/tables/tableScreen'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTables } from '@/modules/tables/hooks/useTable'
import { useChangeTable } from '@/modules/tables/hooks/useChangeTable'
import { useRouter } from 'expo-router'
import { useToast } from '@/shared/ui/toast/toast.context'

export default function tables() {
  const { refetch: refetchTable, tables } = useTables();
  const { changeTable } = useChangeTable();
  const { showToast } = useToast();
  const router = useRouter();

  const { refreshing, onRefresh } = useScreenRefresh(async () => {
    await Promise.all([
      refetchTable?.(),
    ]);
     showToast('Tables refreshed successfully', 'success');
  });

  const pendingCustomerData = useOrderStore(s => s.pendingCustomerData)
  const changeTableMode = useOrderStore(s => s.changeTableMode)
  const reservation = useOrderStore(s => s.reservation)
  const setReservation = useOrderStore(s => s.setReservation)
  const setChangeTableMode = useOrderStore(s => s.setChangeTableMode)
  const setSelectedTableIds = useOrderStore(s => s.setSelectedTableIds)

  const handleChangeTableConfirm = async (newTableIds: number[]) => {
    if (!reservation?.originalOrder.reservationId) return;

    const success = await changeTable(
      Number(reservation.originalOrder.reservationId),
      newTableIds
    );

    if (success) {
      // update reservation in store with new table ids
      setReservation({
        ...reservation,
        originalOrder: {
          ...reservation.originalOrder,
          tableIds: newTableIds,
        },
        // update table number for display
        tableNumber: tables
          .filter(t => newTableIds.includes(Number(t.id)))
          .map(t => `${t.table_type?.name}:${t.name}`)
          .join(', '),
      });
      setSelectedTableIds(newTableIds);
      setChangeTableMode(false);
      await refetchTable();
      showToast('Table changed successfully', 'success');
      router.push('/(tabs)/home');
    } else {
      showToast('Failed to change table', 'error');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>

      <ScreenHeader title="Tables" />

      <TableScreen
        refreshing={refreshing}
        onRefresh={onRefresh}
        fromOrder={!!pendingCustomerData}
        customerData={pendingCustomerData ?? undefined}
        changeTableMode={changeTableMode}
        onChangeTableConfirm={handleChangeTableConfirm}
      />

      {refreshing && <LoadingScreen />}

    </SafeAreaView>
  )
}