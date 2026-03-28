import { order } from '@/modules/orders/types/order.types'
import { Reservation, ReservationStatus } from '../types/reservation.types'

/**
 * Maps order status to reservation status
 */
export function mapOrderStatusToReservationStatus(status: string): ReservationStatus {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus === 'completed') {
        return 'completed'
    }

    if (normalizedStatus === 'cancelled') {
        return 'cancelled'
    }

    if (normalizedStatus === 'pending') {
        return 'pending'
    }

    // Processing or any other status = confirmed
    return 'confirmed'
}

/**
 * Maps an order to a reservation
 */
export function mapOrderToReservation(order: order): Reservation {

    // order.date is like 'Mar 27, 2024, 10:30 AM' — extract time part
    let time = '-';
    const timeMatch = order.date.match(/\b(\d{1,2}:\d{2}\s*[AP]M)\b/i);
    if (timeMatch) {
        time = timeMatch[1];
    }

    return {
        id: order.id,
        customerName: order.customer || 'Guest',
        phone: order.customerPhone || '-',
        date: order.date,
        tableNumber: order.table,
        peopleCount: order.peopleCount ?? order.items, // Prefer peopleCount if available
        time: time,
        status: mapOrderStatusToReservationStatus(order.status),
        orderItems: order.items,
        orderStatus: order.status,
        paymentStatus: order.paymentStatus as 'Pending' | 'Paid',
        total: order.total,
        originalOrder: order,
    }
}

/**
 * Filters reservations based on query and status
 */
export function filterReservations(
    reservations: Reservation[],
    query: string,
    statusFilter: ReservationStatus | 'all'
): Reservation[] {
    const normalizedQuery = query.trim().toLowerCase()
    
    return reservations.filter((reservation) => {
        const matchesQuery =
            !normalizedQuery ||
            reservation.customerName.toLowerCase().includes(normalizedQuery) ||
            reservation.tableNumber.toLowerCase().includes(normalizedQuery) ||
            reservation.phone.toLowerCase().includes(normalizedQuery)

        const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter
        
        return matchesQuery && matchesStatus
    })
}