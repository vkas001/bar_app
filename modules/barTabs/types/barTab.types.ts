export type BarTabStatus = "active" | "closed" | "suspended";
export type BarPaymentStatus = "unpaid" | "partial" | "active";

export interface BarTab {
  id: string;
  customerName: string;
  phone: string;
  notes: string;
  items: number;
  tax: number;
  total: number;
  paidAmount: number;
  balance: number;
  status: BarTabStatus;
  paymentStatus: BarPaymentStatus;
  createdAt: string;
}
export interface BarTabItem {
	id: string;
	name: string;
	qty: number;
	unit: string;
	note?: string;
}

export type CreateBarTabPayload = Pick<BarTab, 'customerName' | 'phone'> & {
  notes: string;
};