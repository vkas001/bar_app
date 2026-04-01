import { create } from 'zustand';

interface PendingCustomerData {
  customer_name: string;
  customer_phone: string;
  guest_count: number;
}

interface CreateOrderStore {
  pendingCustomerData: PendingCustomerData | null;
  selectedTableIds: number[];
  setPendingCustomerData: (data: PendingCustomerData | null) => void;
  setSelectedTableIds: (ids: number[]) => void;
  clearOrderData: () => void;
}

export const useOrderStore = create<CreateOrderStore>((set) => ({
  pendingCustomerData: null,
  selectedTableIds: [],

  setPendingCustomerData: (data) => set({ pendingCustomerData: data }),

  setSelectedTableIds: (ids) => set({ selectedTableIds: ids }),

  clearOrderData: () => set({
    pendingCustomerData: null,
    selectedTableIds: []
  }),
}));

export const useCreateOrderStore = create<CreateOrderStore>((set) => ({
  pendingCustomerData: null,
  selectedTableIds: [],
  setPendingCustomerData: (data) => set({ pendingCustomerData: data }),
  setSelectedTableIds: (ids) => set({ selectedTableIds: ids }),
  clearOrderData: () => set({ pendingCustomerData: null, selectedTableIds: [] }),
}));