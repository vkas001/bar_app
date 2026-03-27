import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { order, orderItem, orderItemStatus } from '../types/order.types';

interface Props {
  visible: boolean;
  order: order | null;
  onClose: () => void;
}

const ITEM_STATUS_OPTIONS: orderItemStatus[] = ["Pending", "Preparing", "Ready", "Served"];

const ITEM_STATUS_COLORS: Record<orderItemStatus, { backgroundColor: string; color: string }> = {
  Pending: { backgroundColor: "#172554", color: "#60a5fa" },
  Preparing: { backgroundColor: "#4c3a12", color: "#facc15" },
  Ready: { backgroundColor: "#16351f", color: "#86efac" },
  Served: { backgroundColor: "#3f3f46", color: "#f4f4f5" },
  Cancel: { backgroundColor: "#3f3f46", color: "#f4f4f5" },
};

const ITEM_STATUS_ICONS: Record<orderItemStatus, keyof typeof MaterialIcons.glyphMap> = {
  Pending: "schedule",
  Preparing: "local-fire-department",
  Ready: "check-circle",
  Served: "done-all",
  Cancel: "cancel",
};

export default function OrderDetailsModal({
  visible,
  order,
  onClose
}: Props) {
  const [orderItems, setOrderItems] = useState<orderItem[]>([]);
  const [openStatusMenuItemId, setOpenStatusMenuItemId] = useState<string | null>(null);

  // update orderItems when order changes
  useEffect(() => {
    if (order?.orderItems) {
      setOrderItems(order.orderItems);
    }
  }, [order]);

  if (!order) return null;

  const tables = order.table
    .split(",")
    .map((table) => table.trim())
    .filter(Boolean);

  const updateItemStatus = (itemId: string, newStatus: orderItemStatus) => {
    setOrderItems(orderItems.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1" pointerEvents="box-none">
        <Pressable className="absolute inset-x-0 top-0 bottom-16 bg-black/45" onPress={onClose} />

        <View className="absolute inset-x-0 top-0 bottom-16 flex-row">
          <Pressable className="flex-1" onPress={onClose} />

          <View
            className="w-[80%] rounded-l-2xl px-4 py-4"
            style={{ backgroundColor: "#000000" }}
          >

            {/* HEADER */}

            <View className="flex-row justify-between items-center px-4 py-4">
              <Text className="text-white text-3xl font-bold">
                Order Details
              </Text>

              <Pressable onPress={onClose}>
                <Ionicons name="close" size={26} color="white" />
              </Pressable>
            </View>

            <ScrollView className="px-4" showsVerticalScrollIndicator={false}>

              {/* ORDER SUMMARY CARD */}

              <View className="bg-card rounded-xl p-4 mt-4">

                <View className="flex-row justify-between items-center">

                  <View className="flex-row items-center gap-2 ">
                    <Ionicons name="person" size={20} color="#facc15" />
                    <Text className="text-white font-bold text-xl">
                      Order Summary
                    </Text>
                  </View>

                  <View className="bg-[#4c3a12] px-3 py-1 rounded-full">
                    <Text className="text-yellow text-xl font-semibold">
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap items-center mt-2">
                  <Text className="text-zinc-300 text-lg">#{order.id}</Text>
                  <Text className="text-zinc-500 mx-2">•</Text>
                  <Text className="text-zinc-300 text-lg">{order.customer || "Walk In"}</Text>
                  <Text className="text-zinc-500 mx-2">•</Text>
                  <Text className="text-zinc-300 text-lg">9876543210</Text>
                </View>

                <Text className="text-zinc-400 text-lg mt-1">
                  {order.date}
                </Text>

                <View className="flex-row items-center mt-2">
                  <Ionicons name="restaurant" size={20} color="#facc15" />
                  <Text className="text-zinc-300 text-xl ml-2">
                    Tables:
                  </Text>

                  <View className="flex-row items-center gap-2 ml-2">
                    {(tables.length ? tables : [order.table]).map((tableName, index) => (
                      <View key={`${tableName}-${index}`} className="bg-yellow px-2 py-[2px] rounded-lg">
                        <Text className="text-black text-xl font-semibold">
                          {tableName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text className="text-zinc-300 font-bold text-lg mt-2">
                  Payment:{" "}
                  <Text className="text-yellow font-bold">
                    {order.paymentStatus}
                  </Text>
                </Text>

              </View>

              {/* ORDER ITEMS */}

              <View className="bg-card rounded-xl p-4 mt-4">

                <View className="flex-row items-center mb-4">
                  <MaterialIcons
                    name="restaurant-menu"
                    size={20}
                    color="#facc15"
                  />
                  <Text className="text-white font-semibold text-xl ml-2">
                    Order Items
                  </Text>
                </View>

                {orderItems.map((item) => (
                  <View key={item.id} className="bg-black border-b pb-3 mb-3 rounded-lg">
                    {/* Item Header with ID */}
                    <View className="flex-row justify-between items-center py-4 px-4 mb-2">
                      <Text className="text-yellow font-semibold text-lg">
                        {item.id}
                      </Text>
                    </View>

                    {/* Item Details */}
                    <View className="flex-row justify-between mb-1">
                      <View className="flex-row items-center gap-2 px-4">
                        <Text className="text-zinc-400 text-xl">Qty:</Text>
                        <Text className="text-white text-xl">{item.quantity}</Text>
                        <Text className="text-zinc-400 text-xl">{item.unit}</Text>
                      </View>
                    </View>

                    {/* Note */}
                    {item.note && (
                      <View className="mt-1 px-4 flex-row items-center gap-2">
                        <Text className="text-zinc-400 text-xl">Note:</Text>
                        <Text className="text-zinc-300 text-xl italic">{item.note}</Text>
                      </View>
                    )}

                    <View className="mt-2 px-4 flex-row items-center justify-between">
                      <View
                        className="rounded-full px-3 py-1 flex-row items-center gap-2"
                        style={{ backgroundColor: ITEM_STATUS_COLORS[item.status].backgroundColor }}
                      >
                        <MaterialIcons
                          name={ITEM_STATUS_ICONS[item.status]}
                          size={16}
                          color={ITEM_STATUS_COLORS[item.status].color}
                        />
                        <Text
                          className="text-base font-semibold"
                          style={{ color: ITEM_STATUS_COLORS[item.status].color }}
                        >
                          {item.status}
                        </Text>
                      </View>

                      <View className="relative items-end">
                        <Pressable
                          className="bg-zinc-700 rounded-full px-3 py-1 flex-row items-center gap-1"
                          onPress={() =>
                            setOpenStatusMenuItemId(openStatusMenuItemId === item.id ? null : item.id)
                          }
                        >
                          <MaterialIcons name="edit" size={14} color="#e4e4e7" />
                          <Text className="text-zinc-200 text-sm font-semibold">
                            Change Status
                          </Text>
                          <MaterialIcons name="keyboard-arrow-down" size={18} color="#e4e4e7" />
                        </Pressable>

                        {/* Status Dropdown Menu */}

                        {openStatusMenuItemId === item.id && (
                          <View className="absolute top-10 right-0 bg-zinc-800 border border-zinc-700 rounded-xl py-1 min-w-[140px] z-20">
                            {ITEM_STATUS_OPTIONS.map((statusOption) => (
                              <Pressable
                                key={statusOption}
                                className="px-3 py-2 flex-row items-center gap-2"
                                onPress={() => {
                                  updateItemStatus(item.id, statusOption);
                                  setOpenStatusMenuItemId(null);
                                }}
                              >
                                <MaterialIcons
                                  name={ITEM_STATUS_ICONS[statusOption]}
                                  size={16}
                                  color={ITEM_STATUS_COLORS[statusOption].color}
                                />
                                <Text
                                  className="text-sm font-semibold"
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

              {/* TOTAL SUMMARY */}

              <View className="bg-card rounded-xl p-4 mt-4">

                <Text className="text-white font-bold text-xl mb-2">
                  Order Summary
                </Text>

                <View className="flex-row justify-between mb-2 pb-2">
                  <Text className="text-zinc-300 text-xl">
                    Items ({order.items})
                  </Text>

                  <Text className="text-zinc-300 text-xl">
                    Rs. {order.total.toFixed(2)}
                  </Text>
                </View>
                {/* Divider Line */}
                <View className="mb-2" style={{ height: 1, backgroundColor: '#71717a' }} />

                <View className="flex-row justify-between pb-2">

                  <Text className="text-white font-bold text-xl">
                    Total:
                  </Text>

                  <Text className="text-yellow font-bold text-2xl">
                    Rs. {order.total.toFixed(2)}
                  </Text>

                </View>
                {/* Divider Line */}
                <View className="mt-2" style={{ height: 1, backgroundColor: '#71717a' }} />

                <View className="flex-row justify-between mt-2">
                  <Text className="text-zinc-400 font-bold text-xl">
                    Payment Status:
                  </Text>

                  <Text className="text-yellow font-bold text-2xl">
                    {order.paymentStatus}
                  </Text>
                </View>

              </View>

            </ScrollView>

            {/* PRINT BUTTON */}

            <View className="px-4 pb-4 pt-3 mt-2">
              <Pressable
                className="bg-[#3a4455] py-3 rounded-lg"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text className="text-center text-white font-bold text-xl">
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