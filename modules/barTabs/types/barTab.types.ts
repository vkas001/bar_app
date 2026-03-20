export type BarTabStatus = "active" | "closed" | "suspended";

export interface BarTab {
  id: string;
  customerName: string;
  phone: string;
  items: number;
  total: number;
  balance: number;
  status: BarTabStatus;
  createdAt: string;
}

export type CreateBarTabPayload = Pick<BarTab, 'customerName' | 'phone'> & {
  notes: string;
};