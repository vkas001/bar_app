import { create } from 'zustand';

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

interface CreateOrderStore {
  pendingCustomerData: PendingCustomerData | null;
  selectedTableIds: number[];
  barTabCustomerData: BarTabCustomerData | null;
  setPendingCustomerData: (data: PendingCustomerData | null) => void;
  setSelectedTableIds: (ids: number[]) => void;
  setBarTabCustomerData: (data: BarTabCustomerData | null) => void;
  clearOrderData: () => void;
}

export const useOrderStore = create<CreateOrderStore>((set) => ({
  pendingCustomerData: null,
  selectedTableIds: [],
  barTabCustomerData: null,

  setPendingCustomerData: (data) => set({ pendingCustomerData: data }),

  setSelectedTableIds: (ids) => set({ selectedTableIds: ids }),

  setBarTabCustomerData: (data) => set({ barTabCustomerData: data }),

  clearOrderData: () => set({
    pendingCustomerData: null,
    selectedTableIds: [],
    barTabCustomerData: null

  }),
}));

