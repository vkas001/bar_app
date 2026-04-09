import { create } from 'zustand';
import { BarTabItem } from '@/modules/barTabs/types/barTab.types';

// For creating a new order
interface PendingCustomerData {
  customerName: string;
  customerPhone: string;
  guestCount: number;
}

// For creating a new Bar Tab
interface BarTabCustomerData {
  id: number;
  customerName: string;
  customerPhone: string | null;
  notes: string | null;
}

import { Reservation } from '@/modules/home/types/reservation.types';

interface CreateOrderStore {
  pendingCustomerData: PendingCustomerData | null;
  selectedTableIds: number[];
  barTabCustomerData: BarTabCustomerData | null;
  barTabPreviousItems: BarTabItem[]
  reservation: Reservation | null;
  orderJustCompleted: boolean;
  changeTableMode: boolean;


  setBarTabPreviousItems: (items: BarTabItem[]) => void;
  setPendingCustomerData: (data: PendingCustomerData | null) => void;
  setSelectedTableIds: (ids: number[]) => void;
  setBarTabCustomerData: (data: BarTabCustomerData | null) => void;
  setReservation: (reservation: Reservation | null) => void;
  clearOrderData: () => void;
  setOrderJustCompleted: (value: boolean) => void;
  setChangeTableMode: (value: boolean) => void;
}

export const useOrderStore = create<CreateOrderStore>((set) => ({
  pendingCustomerData: null,
  selectedTableIds: [],
  barTabCustomerData: null,
  barTabPreviousItems: [],
  reservation: null,
  changeTableMode: false,
  orderJustCompleted: false,
  
  setOrderJustCompleted: (value) => set({ orderJustCompleted: value }),

  setPendingCustomerData: (data) => set({ pendingCustomerData: data }),

  setSelectedTableIds: (ids) => set({ selectedTableIds: ids }),

  setBarTabCustomerData: (data) => set({ barTabCustomerData: data }),

  setReservation: (reservation) => set({ reservation }),

  setBarTabPreviousItems: (items) => set({ barTabPreviousItems: items }),

  setChangeTableMode: (value) => set({ changeTableMode: value }),

  clearOrderData: () => set({
    pendingCustomerData: null,
    selectedTableIds: [],
    barTabCustomerData: null,
    barTabPreviousItems: [],
    reservation: null,
    orderJustCompleted: false,
    changeTableMode: false,
  }),
}));

