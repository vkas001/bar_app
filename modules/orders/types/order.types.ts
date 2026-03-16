export type orderStatus = "Processing" | "Completed" | "Pending" |"Cancelled";

export interface order {
    id: string;
    table: string;
    type: string;
    customer?: string;
    items: number;
    total: number;
    paymentStatus: "Pending" | "Paid" | "All";
    status: orderStatus;
    date: string;
}