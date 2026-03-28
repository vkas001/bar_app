import { BarPaymentStatus, BarTab, BarTabAPI } from "../types/barTab.types";

function derivePaymentStatus(paid: number, total: number): BarPaymentStatus {
    if (paid <= 0) return "unpaid";
    if (paid >= total) return "active";   // fully paid
    return "partial";
}

export function mapBarTabAPIToCard(tab: BarTabAPI): BarTab {
    const paidAmount = parseFloat(tab.paid_amount ?? "0");

   // console.log("raw items:", JSON.stringify(tab.items, null, 2));

    return {
        id: tab.id,
        customerName: tab.customerName,
        phone: tab.phone ?? "—",
        status: tab.status,
        paymentStatus: derivePaymentStatus(paidAmount, tab.total),
        items: tab.item_count,
        total: tab.total,
        tax: tab.tax,                          // add tax to BarTab type if not there
        paidAmount,
        createdAt: tab.duration_since_created,
        notes: tab.notes,                      // add notes to BarTab type if not there
        tabItems: tab.items
            .filter(i => i && i.item && i.item_unit)
            .map((i) => ({
                id: i.id,
                name: i.item.name,
                quantity: i.quantity,
                unit: i.item_unit.title,
                price: i.price,
                note: i.note,
            })),
        raw: tab,
    };
}