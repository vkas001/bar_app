import { order } from "../types/order.types"

export const orders: order[] = [
    {
        id: "20204",
        table: "A:3",
        type: "Dine-in",
        customer: "John Doe",
        items: 2,
        total: 2500,
        paymentStatus: "Pending",
        status: "Processing",
        date: "March 13, 2026 at 03:45 PM"

    },
    {
        id: "20203",
        table: "A:4",
        type: "Walk-in",
        customer: "John Ham",
        items: 5,
        total: 2200,
        paymentStatus: "Pending",
        status: "Completed",
        date: "March 11, 2026 at 12:15 PM"

    },
    {
        id: "#20203",
        table: "A:4, A:8",
        customer: "Rick Sanchez",
        type: "Walk In",
        items: 1,
        total: 2200,
        status: "Completed",
        paymentStatus: "Pending",
        date: "March 11, 2026",
    },
    {
        id: "#20200",
        table: "A:4, A:8",
        customer: "Harry Potter",
        type: "Walk In",
        items: 1,
        total: 2200,
        status: "Completed",
        paymentStatus: "Pending",
        date: "March 11, 2026",
    },
    {
        id: "#20202",
        table: "A:4, A:8",
        customer: "Hermione Granger",
        type: "Walk In",
        items: 1,
        total: 1560,
        status: "Processing",
        paymentStatus: "Pending",
        date: "March 11, 2026",
    },
    {
        id: "#20201",
        table: "D:12",
        customer: "Tony Stark",
        type: "Walk In",
        items: 2,
        total: 720,
        status: "Processing",
        paymentStatus: "Pending",
        date: "January 20, 2026",
    },
]