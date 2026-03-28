export type orderStatus = 'Processing' | 'Completed' | 'Pending' | 'Cancelled';
export type orderItemStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served' | 'Cancel';

export interface order {
  id: string;
  table: string;           // "B:6" — group:name
  customer: string;        // reservation.customer.name
  customerPhone?: string;   // reservation.customer.phone
  status: orderStatus;     // mapped from API status
  type: string;            // reservation.status
  date: string;            // created_at formatted
  items: number;           // order_details.length
  peopleCount?: number;    // reservation.party_size
  total: number;           // sum of order_details price * quantity
  paymentStatus: string;   // payment ? 'Paid' : 'Pending'
  orderItems: orderItem[]; // detailed items for modal
}

// Raw API types
export interface ApiOrderDetail {
  id: number;
  item: { name: string };
  item_unit: { title: string };
  status: string;
  quantity: number;
  price: number;
  note: string;
}

export interface ApiOrder {
  id: number;
  reservation: {
    customer: {
      id: number;
      name: string;
      phone: string
    };
    party_size: number;
    status: string;
    tables: {
      id: number;
      name: string;
      status: string;
      table_type: { id: number; name: string };
      capacity: number;
      is_available: boolean;
      is_active: boolean;
    }[];
    date_time: string;
  };
  status: string;
  note: string | null;
  order_details: ApiOrderDetail[];
  payment: null | object;
  created_at: string;
}

export interface orderItem {
  id: string;
  name: string;
  unit: string;
  note: string;
  status: orderItemStatus;
  price: number;
  quantity: number;
}

export interface ApiOrderDetail {
  id: number;
  item: { name: string };
  item_unit: { title: string };
  status: string;
  quantity: number;
  price: number;
  note: string;
}