import { useResponsive } from '@/shared/hooks/useResponsive';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ITEM_STATUS_COLORS, ITEM_STATUS_ICONS, ORDER_STATUS_OPTIONS } from '../../menu/types/itemStatus';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { order, orderItem, orderItemStatus } from '../types/order.types';

interface Props {
  visible: boolean;
  order: order | null;
  onClose: () => void;
}



export default function OrderDetailsModal({
  visible,
  order,
  onClose
}: Props) {
  const [orderItems, setOrderItems] = useState<orderItem[]>([]);
  const [openStatusMenuItemId, setOpenStatusMenuItemId] = useState<string | null>(null);

  const {
    isSmallPhone,
    isPhone,
    isTablet,
    isLargeTablet,
    textXs,
    textSm,
    textBase,
    textLg,
    textXl,
    text2xl,
    text3xl,
    iconXs,
    iconSm,
    iconMd,
    size,
  } = useResponsive()

  useEffect(() => {
    if (order?.orderItems) setOrderItems(order.orderItems);
  }, [order]);

  if (!order) return null;

  const tables = order.table.split(",").map((t) => t.trim()).filter(Boolean);

 const updateItemStatus = (itemId: string | number, newStatus: orderItemStatus) => {
         setOrderItems(prev =>
             prev.map(item => item.id === itemId ? { ...item, status: newStatus } : item)
         );
         setOpenStatusMenuItemId(null);
     };

  // s config: tablet keeps originals, phone scales down
  const s = isSmallPhone ? {
    panelWidth: '92%',
    headerText: textXl,
    sectionTitle: textBase,
    bodyText: textSm,
    smallText: textXs,
    amountText: textBase,
    totalText: textLg,
    badgePx: 'px-2 py-0.5',
    cardP: 'p-3',
    px: 'px-2',
    py: 'py-2',
    itemPx: 'px-2 py-2',
    iconSize: iconXs,
    sectionIcon: iconSm,
    closeIcon: 20,
    gap: size.padding.sm,
  } : isPhone ? {
    panelWidth: '88%',
    headerText: text2xl,
    sectionTitle: textLg,
    bodyText: textBase,
    smallText: textSm,
    amountText: textLg,
    totalText: textXl,
    badgePx: 'px-2 py-1',
    cardP: 'p-3',
    px: 'px-3',
    py: 'py-3',
    itemPx: 'px-3 py-3',
    iconSize: iconSm,
    sectionIcon: iconMd,
    closeIcon: 22,
    gap: size.padding.md,
  } : {
    panelWidth: '80%',
    headerText: 'text-3xl',
    sectionTitle: 'text-xl',
    bodyText: 'text-lg',
    smallText: 'text-lg',
    amountText: 'text-xl',
    totalText: 'text-2xl',
    badgePx: 'px-3 py-1',
    cardP: 'p-4',
    px: 'px-4',
    py: 'py-4',
    itemPx: 'px-4 py-4',
    iconSize: 16,
    sectionIcon: 20,
    closeIcon: 26,
    gap: 8,
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1" pointerEvents="box-none">
        <Pressable className="absolute inset-x-0 top-0 bottom-16 bg-black/45" onPress={onClose} />

        <View className="absolute inset-x-0 top-0 bottom-16 flex-row">
          <Pressable className="flex-1" onPress={onClose} />

          <View
            className="rounded-l-2xl"
            style={{ width: '100%', backgroundColor: "#000000" }}
          >
            {/* Header */}
            <View className={`flex-row justify-between items-center ${s.px} ${s.py}`}>
              <Text className={`font-bold text-white ${s.headerText}`}>Order Details</Text>
              <Pressable onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={s.closeIcon} color="white" />
              </Pressable>
            </View>

            <ScrollView className={s.px}
              showsVerticalScrollIndicator={false}>

              {/* Order Summary Card */}
              <View className={`bg-card rounded-xl ${s.cardP} mt-3`}>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center flex-1 mr-2" style={{ gap: s.gap }}>
                    <Ionicons name="person" size={s.sectionIcon} color="#facc15" />
                    <Text className={`font-bold text-white ${s.sectionTitle}`} numberOfLines={1}>
                      Order Summary
                    </Text>
                  </View>
                  <View className={`bg-[#4c3a12] rounded-full ${s.badgePx}`}>
                    <Text className={`text-yellow font-semibold ${s.smallText}`}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap items-center mt-2" style={{ gap: 4 }}>
                  <Text className={`text-zinc-300 ${s.bodyText}`}>#{order.id}</Text>
                  <Text className="text-zinc-500 mx-1">•</Text>
                  <Text className={`text-zinc-300 ${s.bodyText}`} numberOfLines={1}>
                    {order.customer || "Walk In"}
                  </Text>
                  {!!order.customerPhone && (
                    <>
                      <Text className="text-zinc-500 mx-1">•</Text>
                      <Text className={`text-zinc-300 ${s.bodyText}`}>{order.customerPhone}</Text>
                    </>
                  )}
                </View>

                <Text className={`text-zinc-400 mt-1 ${s.smallText}`}>{order.date}</Text>

                <View className="flex-row items-center flex-wrap mt-2" style={{ gap: s.gap }}>
                  <Ionicons name="restaurant" size={s.sectionIcon} color="#facc15" />
                  <Text className={`text-zinc-300 ${s.bodyText}`}>Tables:</Text>
                  <View className="flex-row flex-wrap" style={{ gap: size.padding.sm }}>
                    {(tables.length ? tables : [order.table]).map((tableName, index) => (
                      <View
                        key={`${tableName}-${index}`}
                        className={`bg-yellow rounded-lg ${isSmallPhone ? 'px-1.5 py-0.5' : 'px-2 py-[2px]'}`}
                      >
                        <Text className={`text-black font-semibold ${s.bodyText}`}>
                          {tableName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text className={`font-bold mt-2 text-zinc-300 ${s.smallText}`}>
                  Payment:{" "}
                  <Text className="text-yellow font-bold">{order.paymentStatus}</Text>
                </Text>
              </View>

              {/* Order Items */}
              <View className={`bg-card rounded-xl ${s.cardP} mt-4`}>
                <View className="flex-row items-center mb-3" style={{ gap: s.gap }}>
                  <MaterialIcons name="restaurant-menu" size={s.sectionIcon} color="#facc15" />
                  <Text className={`font-semibold text-white ${s.sectionTitle}`}>Order Items</Text>
                </View>

                {orderItems.map((item) => (
                  <View key={item.id} className="bg-black border-b pb-3 mb-3 rounded-lg">

                    {/* Item ID */}
                    <View className={`flex-row justify-between items-center ${s.itemPx}`}>
                      <Text className={`text-yellow font-semibold ${s.bodyText}`} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>

                    {/* Qty / Unit */}
                    <View className={`flex-row items-center ${s.px}`} style={{ gap: size.padding.sm }}>
                      <Text className={`text-zinc-400 ${s.bodyText}`}>Qty:</Text>
                      <Text className={`text-white ${s.bodyText}`}>{item.quantity}</Text>
                      <Text className={`text-zinc-400 ${s.bodyText}`}>{item.unit}</Text>
                    </View>

                    {/* Note */}
                    {item.note && (
                      <View className={`mt-1 flex-row items-center ${s.px}`} style={{ gap: size.padding.sm }}>
                        <Text className={`text-zinc-400 ${s.smallText}`}>Note:</Text>
                        <Text className={`text-zinc-300 italic flex-1 ${s.smallText}`} numberOfLines={2}>
                          {item.note}
                        </Text>
                      </View>
                    )}

                    {/* Status + Change */}
                    <View className={`mt-2 flex-row items-center justify-between ${s.px}`}>
                      <View
                        className={`rounded-full flex-row items-center ${s.badgePx}`}
                        style={{
                          backgroundColor: ITEM_STATUS_COLORS[item.status].backgroundColor,
                          gap: size.padding.sm,
                        }}
                      >
                        <MaterialIcons
                          name={ITEM_STATUS_ICONS[item.status]}
                          size={s.iconSize}
                          color={ITEM_STATUS_COLORS[item.status].color}
                        />
                        <Text
                          className={`font-semibold ${s.smallText}`}
                          style={{ color: ITEM_STATUS_COLORS[item.status].color }}
                        >
                          {item.status}
                        </Text>
                      </View>

                      <View className="relative items-end">
                        <Pressable
                          className={`bg-zinc-700 rounded-full flex-row items-center ${isSmallPhone ? 'px-2 py-0.5' : 'px-3 py-1'}`}
                          style={{ gap: size.padding.sm }}
                          onPress={() =>
                            setOpenStatusMenuItemId(openStatusMenuItemId === item.id ? null : item.id)
                          }
                        >
                          <MaterialIcons name="edit" size={s.iconSize} color="#e4e4e7" />
                          {!isSmallPhone && (
                            <Text className={`text-zinc-200 font-semibold ${s.smallText}`}>
                              Change Status
                            </Text>
                          )}
                          <MaterialIcons name="keyboard-arrow-down" size={isSmallPhone ? 14 : 18} color="#e4e4e7" />
                        </Pressable>

                        {openStatusMenuItemId === item.id && (
                          <View className="absolute top-8 right-0 bg-zinc-800 border border-zinc-700 rounded-xl py-1 min-w-[130px] z-20">
                            {ORDER_STATUS_OPTIONS.map((statusOption) => (
                              <Pressable
                                key={statusOption}
                                className={`flex-row items-center ${isSmallPhone ? 'px-2 py-1.5' : 'px-3 py-2'}`}
                                style={{ gap: size.padding.sm }}
                                onPress={() => {
                                  updateItemStatus(item.id, statusOption);
                                  setOpenStatusMenuItemId(null);
                                }}
                              >
                                <MaterialIcons
                                  name={ITEM_STATUS_ICONS[statusOption]}
                                  size={s.iconSize}
                                  color={ITEM_STATUS_COLORS[statusOption].color}
                                />
                                <Text
                                  className={`font-semibold ${s.smallText}`}
                                  style={{ color: ITEM_STATUS_COLORS[statusOption].color }}
                                >
                                  {statusOption}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Total Summary */}
              <View className={`bg-card rounded-xl ${s.cardP} mt-4`}>
                <Text className={`font-bold text-white mb-2 ${s.sectionTitle}`}>Order Summary</Text>

                <View className="flex-row justify-between mb-2 pb-2">
                  <Text className={`text-zinc-300 ${s.bodyText}`}>Items ({order.items})</Text>
                  <Text className={`text-zinc-300 ${s.amountText}`}>Rs. {order.total.toFixed(2)}</Text>
                </View>

                <View className="mb-2" style={{ height: 1, backgroundColor: '#71717a' }} />

                <View className="flex-row justify-between pb-2">
                  <Text className={`font-bold text-white ${s.bodyText}`}>Total:</Text>
                  <Text className={`font-bold text-yellow ${s.totalText}`}>Rs. {order.total.toFixed(2)}</Text>
                </View>

                <View className="mt-2" style={{ height: 1, backgroundColor: '#71717a' }} />

                <View className="flex-row justify-between mt-2">
                  <Text className={`font-bold text-zinc-400 ${s.bodyText}`}>Payment Status:</Text>
                  <Text className={`font-bold text-yellow ${s.totalText}`}>{order.paymentStatus}</Text>
                </View>
              </View>

            </ScrollView>

            {/* Print Button */}
            <View className={`${s.px} pb-4 pt-3 mt-2`}>
              <Pressable
                className={`bg-[#3a4455] rounded-lg ${isSmallPhone ? 'py-2' : 'py-3'}`}
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
              >
                <Text className={`text-center font-bold text-white ${s.sectionTitle}`}>
                  Print Receipt
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}