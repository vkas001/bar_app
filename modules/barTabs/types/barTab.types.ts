export type BarTabStatus = "active" | "closed" | "suspended";
export type BarPaymentStatus = "active" | "partial" | "unpaid";

// RAW API RESPONSE
export interface BarTabItemAPI {
  id: number;
  item: {
    id: number;
    name: string;
    description: string | null;
    thumbnailUrl: string;
    item_category: {
      id: number;
      name: string;
      description: string;
    };
  }
  item_unit: {
    id: number;
    title: string;
    value: number;
    unit_name: string;
    unit_price: number;
  };
  status: string;
  quantity: number;
  price: number;
  note: string | null;
  location: {
    id: number;
    name: string;
    code: string;
  };
}

export interface BarTabAPI {
  id: number;
  customerName: string;
  phone: string | null;
  email: string | null;
  status: BarTabStatus;
  items: BarTabItemAPI[];
  subtotal: number;
  tax: number;
  total: number;
  paid_amount: string;
  balance: number;
  notes: string | null;
  payments: unknown[];
  item_count: number;
  is_active: boolean;
  is_closed: boolean;
  formatted_total: string;
  duration_since_created: string;
  creator: {
    id: number;
    name: string | null;
    email: string;
  };
}

export interface BarTab {
  id: number;
  customerName: string;
  phone: string;
  status: BarTabStatus;
  paymentStatus: BarPaymentStatus;
  items: number;
  total: number;
  tax: number;
  paidAmount: number;
  createdAt: string;
  notes: string | null;
  tabItems: BarTabItem[];
  raw: BarTabAPI;
}

export interface BarTabItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  note: string | null;
}

export interface CreateBarTabPayload {
  customerName: string;
  phone: string;
  notes: string;
}
