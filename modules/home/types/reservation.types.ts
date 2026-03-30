import { order } from '@/modules/orders/types/order.types'

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'
export type ReservationStatusFilter = 'all' | ReservationStatus

export interface Reservation {
    id: string
    customerName: string
    phone: string
    date: string
    tableNumber: string
    peopleCount: number
    time: string
    status: ReservationStatus
    orderItems: number
    orderStatus: string
    paymentStatus: 'Pending' | 'Paid'
    total: number
    originalOrder: order
}

export const RESERVATION_STATUS_STYLES: Record<ReservationStatus, { bg: string; text: string }> = {
    confirmed: { bg: '#16351f', text: '#86efac' },
    pending: { bg: '#4c3a12', text: '#facc15' },
    cancelled: { bg: '#4c1d1d', text: '#fca5a5' },
    completed: { bg: '#1f2937', text: '#d1d5db' },
}

export const RESERVATION_STATUS_FILTERS: ReservationStatusFilter[] = [
    'all',
    'confirmed',
    'pending',
    'cancelled',
    'completed'
]