export type orderStatus = "Processing" | "Completed" | "Pending" |"Cancelled";

export type orderItemStatus = "Pending" | "Preparing" | "Ready" | "Served" | "Cancel";

export interface orderItem {
  id: string;
  qty: number;
  unit: string;
  note?: string;
  status: orderItemStatus;
}

export interface order {
    id: number | string;
    table: string;
    type: string;
    customer?: string;
    items: number;
    total: number;
    paymentStatus: "Pending" | "Paid";
    status: orderStatus;
    date: string;
}