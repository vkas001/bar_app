import ConfirmDialog from '@/components/confirmDialog'
import { PermissionGuard } from '@/modules/auth/guard'
import { useOrderStore } from '@/modules/orders/store/createOrderStore'
import { useResponsive } from '@/shared/hooks/useResponsive'
import { useToast } from '@/shared/ui/toast'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useCancelReservation } from '../hook/useReservaiton'
import { Reservation, RESERVATION_STATUS_STYLES } from '../types/reservation.types'


interface Props {
    visible: boolean
    reservation: Reservation | null
    onClose: () => void
    onOrderSuccess?: () => void
}

export default function ReservationDetailsModal({
    visible,
    reservation,
    onClose,
    onOrderSuccess
}: Props) {
    const { cancelReservation } = useCancelReservation();
    const [cancelling, setCancelling] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const { showToast } = useToast();

    const { isSmallPhone, textXs, textSm, textBase, textLg, textXl, text2xl, iconXs, iconSm, iconMd, size } = useResponsive()
    const setPendingCustomerData = useOrderStore((state) => state.setPendingCustomerData);
    const setSelectedTableIds = useOrderStore((state) => state.setSelectedTableIds);
    const setReservation = useOrderStore((state) => state.setReservation);
    const setChangeTableMode = useOrderStore((state) => state.setChangeTableMode);
    const router = useRouter();

    if (!reservation) return null

    const currentStatusColor = RESERVATION_STATUS_STYLES[reservation.status]
    const customerInitial = reservation.customerName.trim().charAt(0).toUpperCase() || '?'
    const formattedOrderId = reservation.id.startsWith('#') ? reservation.id : `#${reservation.id}`
    const totalAmount = reservation.total ?? 0
    const totalPaid = reservation.paymentStatus === 'Paid' ? totalAmount : 0
    const discount = 0

    const reservationTables = reservation.tableNumber
        .split(',')
        .map((table) => table.trim())
        .filter(Boolean)

    const orderItems = reservation.originalOrder.orderItems || []

    const s = isSmallPhone ? {
        panelWidth: '92%',
        headerText: textXl,
        sectionTitle: textXs,
        bodyText: textSm,
        smallText: textXs,
        amountText: textSm,
        iconSize: iconXs,
        sectionIcon: iconSm,
        px: 'px-2',
        cardP: 'p-3',
        rowPy: 'py-1.5',
        badgePx: 'px-2 py-0.5',
        btnPy: 'py-2.5',
        gap: size.padding.sm,
        sectionGap: size.padding.sm,
    } : {
        panelWidth: '80%',
        headerText: 'text-3xl',
        sectionTitle: 'text-xl',
        bodyText: 'text-lg',
        smallText: 'text-lg',
        amountText: 'text-lg',
        iconSize: 20,
        sectionIcon: 20,
        px: 'px-4',
        cardP: 'p-4',
        rowPy: 'py-2',
        badgePx: 'px-3 py-1',
        btnPy: 'py-4',
        gap: 8,
        sectionGap: 8,
    }

    const handleCancelReservation = async () => {
        console.log('[ReservationDetailsModal] Cancel button pressed - Permission guard passed', {
            reservationId: reservation?.id,
            customerName: reservation?.customerName
        })
        setShowCancelDialog(true)
    }

    // confirm handler
    const handleConfirmCancel = async () => {
        if (!reservation?.originalOrder.reservationId) {
            console.warn('[ReservationDetailsModal] Cancel confirmation - Missing reservation ID')
            return
        }

        console.log('[ReservationDetailsModal] Confirming reservation cancellation', {
            reservationId: reservation.originalOrder.reservationId,
            customerName: reservation.customerName,
            status: reservation.status
        })

        setShowCancelDialog(false)
        setCancelling(true)
        const success = await cancelReservation(
            Number(reservation.originalOrder.reservationId)
        )
        setCancelling(false)

        if (success) {
            console.log('[ReservationDetailsModal] Reservation cancelled successfully', {
                reservationId: reservation.originalOrder.reservationId
            })
            showToast('Reservation cancelled successfully', 'success')
            onClose()
            onOrderSuccess?.()
        } else {
            console.error('[ReservationDetailsModal] Failed to cancel reservation', {
                reservationId: reservation.originalOrder.reservationId
            })
            showToast('Failed to cancel reservation', 'error')
        }
    }
    return (
        <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
            <View className='flex-1' pointerEvents='box-none'>
                <Pressable className='absolute inset-x-0 top-0 bottom-16 bg-black/45' onPress={onClose} />

                <View className='absolute inset-x-0 top-0 bottom-16 flex-row'>
                    <Pressable className='flex-1' onPress={onClose} />

                    <View
                        className='rounded-l-2xl bg-black'
                        style={{ width: '100%' }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* Header */}
                            <View className={`flex-row items-center justify-between ${s.px} py-4`}>
                                <Text className={`font-bold text-white ${s.headerText}`}>
                                    Reservation Details
                                </Text>
                                <Pressable onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                    <Ionicons name='close' size={isSmallPhone ? 20 : 26} color='white' />
                                </Pressable>
                            </View>

                            <View className={s.px}>

                                {/* Reservation & Customer Info */}
                                <View className={`rounded-xl bg-zinc-900 ${s.cardP} mb-4`}>
                                    <View className='flex-row items-center' style={{ gap: s.sectionGap }}>
                                        <Ionicons name='calendar' size={s.sectionIcon} color='#facc15' />
                                        <Text className={`font-bold text-white ${s.sectionTitle}`}>
                                            {isSmallPhone ? 'Customer Info' : 'Reservation & Customer'}
                                        </Text>
                                    </View>

                                    <View className='mt-3 rounded-lg px-2'>

                                        {/* Name */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Name</Text>
                                            <Text className={`text-white flex-shrink ml-4 ${s.bodyText}`} numberOfLines={1}>
                                                {reservation.customerName}
                                            </Text>
                                        </View>

                                        {/* Phone */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Phone</Text>
                                            <Text className={`text-white ${s.bodyText}`}>{reservation.phone ?? '-'}</Text>
                                        </View>

                                        <View className='my-1.5 h-[1px] bg-zinc-700' />

                                        {/* Date */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Date</Text>
                                            <Text className={`font-semibold text-white ${s.bodyText}`}>
                                                {(() => {
                                                    const dateStr = reservation.originalOrder.date
                                                    if (dateStr) {
                                                        const d = new Date(dateStr)
                                                        if (!isNaN(d.getTime())) {
                                                            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        }
                                                    }
                                                    return reservation.date || '-'
                                                })()}
                                            </Text>
                                        </View>

                                        {/* Time */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Time</Text>
                                            <Text className={`text-white ${s.bodyText}`}>
                                                {(() => {
                                                    const dateStr = reservation.originalOrder.date
                                                    if (dateStr) {
                                                        const d = new Date(dateStr)
                                                        if (!isNaN(d.getTime())) {
                                                            return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                                                        }
                                                    }
                                                    return reservation.time || '-'
                                                })()}
                                            </Text>
                                        </View>

                                        {/* Guest */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Guest</Text>
                                            <Text className={`text-white ${s.bodyText}`}>{reservation.peopleCount}</Text>
                                        </View>

                                        {/* Status */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Status</Text>
                                            <View className={`rounded-full ${s.badgePx}`} style={{ backgroundColor: currentStatusColor.bg }}>
                                                <Text className={`font-semibold capitalize ${s.smallText}`} style={{ color: currentStatusColor.text }}>
                                                    {reservation.status}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className='my-1.5 h-[1px] bg-zinc-700' />

                                        {/* Tables */}
                                        <View className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>Tables</Text>
                                            <View className='max-w-[65%] flex-row flex-wrap justify-end' style={{ gap: size.padding.sm }}>
                                                {reservationTables.map((table) => (
                                                    <View key={table} className={`rounded-lg bg-yellow ${isSmallPhone ? 'px-2 py-1' : 'px-2 py-2'}`}>
                                                        <Text className={`text-black font-semibold ${s.smallText}`}>{table}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Orders */}
                                <View className={`rounded-xl bg-zinc-900 ${s.cardP} mb-4`}>
                                    <View className='flex-row items-center' style={{ gap: s.sectionGap }}>
                                        <Ionicons name='restaurant' size={s.sectionIcon} color='#facc15' />
                                        <Text className={`font-bold text-white ${isSmallPhone ? textLg : text2xl}`}>Orders</Text>
                                    </View>

                                    <View className='mt-3 gap-2'>
                                        {orderItems.map((item, index) => {
                                            const itemId = item.id?.startsWith('#') ? item.id : `#${item.id ?? index + 1}`
                                            return (
                                                <View key={item.id ?? index} className='rounded-lg bg-black p-3'>
                                                    <View className='flex-row items-start justify-between'>
                                                        <View className='flex-1 mr-2'>
                                                            <Text className={`font-bold text-yellow ${s.sectionTitle}`} numberOfLines={1}>
                                                                Order {item.name}
                                                            </Text>
                                                            <Text className={`mt-1 text-zinc-300 ${s.bodyText}`}>
                                                                Items: {item.quantity ?? 1}
                                                            </Text>
                                                        </View>

                                                        <View className='items-end flex-shrink-0'>
                                                            <Text className={`text-zinc-300 ${s.smallText}`} numberOfLines={1}>
                                                                {item.status ?? reservation.orderStatus ?? '-'} / {reservation.paymentStatus ?? ''}
                                                            </Text>
                                                            <Text className={`mt-1 font-semibold text-white ${s.bodyText}`}>
                                                                Rs {item.price?.toLocaleString() ?? item.price?.toLocaleString() ?? '-'}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>

                                {/* Notes */}
                                <View className={`rounded-xl bg-card ${s.cardP} mb-4`}>
                                    <View className='flex-row items-center' style={{ gap: s.sectionGap }}>
                                        <Ionicons name='document-text' size={s.sectionIcon} color='#facc15' />
                                        <Text className={`font-bold text-white ${s.sectionTitle}`}>Notes</Text>
                                    </View>
                                    <Text className={`mt-3 text-zinc-300 ${s.bodyText}`}>
                                        No additional notes for this reservation.
                                    </Text>
                                </View>
                            </View>

                            {/* Total Amount */}
                            <View className={`mx-3 rounded-xl bg-zinc-900 ${s.cardP}`}>
                                <View className='flex-row items-center' style={{ gap: s.sectionGap }}>
                                    <Ionicons name='cash-outline' size={s.sectionIcon} color='#facc15' />
                                    <Text className={`font-bold text-white ${isSmallPhone ? textLg : text2xl}`}>Total Amount</Text>
                                </View>

                                <View className='mt-3 rounded-lg bg-black p-3'>
                                    {[
                                        { label: 'Total Amount', value: `Rs ${totalAmount.toLocaleString()}` },
                                        { label: 'Total Paid', value: `Rs ${totalPaid.toLocaleString()}` },
                                        { label: 'Discount', value: `Rs ${discount.toLocaleString()}` },
                                        { label: 'Payment Status', value: reservation.paymentStatus ?? '-' },
                                    ].map(({ label, value }, i) => (
                                        <View key={i} className={`flex-row items-center justify-between ${s.rowPy}`}>
                                            <Text className={`text-zinc-300 ${s.bodyText}`}>{label}</Text>
                                            <Text className={`font-semibold text-white ${s.amountText}`}>{value}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Actions */}
                            <View className={`bg-zinc-900 mt-4 mx-3 rounded-xl ${s.cardP} mb-4`}>
                                <Text className={`text-white font-bold mb-3 ${s.sectionTitle}`}>
                                    Reservation Actions
                                </Text>

                                <View className='flex-row items-stretch gap-2 mb-2'>
                                    <TouchableOpacity
                                        className={`flex-1 flex-row items-center justify-center rounded-lg bg-yellow ${s.btnPy}`}
                                        onPress={() => {
                                            setPendingCustomerData({
                                                customerName: reservation.customerName,
                                                customerPhone: reservation.phone ?? '',
                                                guestCount: reservation.peopleCount,
                                            });
                                            setSelectedTableIds(reservation.originalOrder.tableIds ?? []);
                                            setReservation(reservation);
                                            router.push('/(tabs)/menu');
                                            onClose();
                                        }}
                                    >
                                        <Ionicons name='add' size={s.iconSize} color='black' />
                                        <Text className={`ml-1 font-bold text-black ${s.bodyText}`}>
                                            Add Order
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className={`flex-1 flex-row items-center justify-center rounded-lg bg-blue ${s.btnPy}`}
                                        onPress={() => {
                                            setReservation(reservation);
                                            setChangeTableMode(true);
                                            router.push('/(tabs)/tables');
                                            onClose();
                                        }}
                                    >
                                        <Ionicons name='refresh' size={s.iconSize} color='white' />
                                        <Text className={`ml-1 font-bold text-white ${s.bodyText}`} numberOfLines={1}>
                                            {isSmallPhone ? 'Chg Table' : 'Change Table'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <PermissionGuard
                                    permissions={['pos.order_delete']}
                                >
                                    <TouchableOpacity
                                        onPress={handleCancelReservation}
                                        disabled={cancelling}
                                        className={`flex-row items-center justify-center rounded-lg bg-red-500 ${s.btnPy}`}
                                        style={{ opacity: cancelling ? 0.6 : 1 }}
                                    >
                                        {cancelling ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            <>
                                                <Ionicons name='close' size={s.iconSize} color='white' />
                                                <Text className={`ml-1 font-bold text-white ${s.bodyText}`}>
                                                    Cancel Reservation
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </PermissionGuard>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>

            <ConfirmDialog
                visible={showCancelDialog}
                title="Cancel Reservation"
                message="Are you sure you want to cancel this reservation?"
                confirmText="Confirm"
                cancelText="No"
                onConfirm={handleConfirmCancel}
                onCancel={() => setShowCancelDialog(false)}
            />
        </Modal>
    )
}