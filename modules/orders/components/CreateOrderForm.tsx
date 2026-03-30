import AppInput from '@/components/input';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useOrderStore } from '../store/createOrderStore';

interface Props {
  onCreate: (data: any) => void;
  selectedTableIds?: number[];  // Pass selected table IDs from parent       // Reservation ID to send to backend
}

const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  return { width, height, isTablet, isLargeTablet };
};

export default function CreateOrderForm({
  onCreate,
  selectedTableIds = [],
}: Props) {
  // console.log('CreateOrderForm props:');
  const [isWalkIn, setIsWalkIn] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [prevData, setPrevData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const setPendingCustomerData = useOrderStore(s => s.setPendingCustomerData);

  const { isTablet, isLargeTablet } = useResponsive();

  const cardPadding = isLargeTablet ? "p-8" : isTablet ? "p-6" : "p-4";
  const outerPadding = isLargeTablet ? "px-6 pt-6" : isTablet ? "px-5 pt-5" : "px-4 pt-4";
  const titleSize = isLargeTablet ? "text-3xl" : isTablet ? "text-2xl" : "text-2xl";
  const subtitleSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
  const labelSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
  const inputTextSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
  const walkInTitleSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
  const walkInSubSize = isLargeTablet ? "text-lg" : isTablet ? "text-base" : "text-sm";
  const guestLabelSize = isLargeTablet ? "text-xl" : isTablet ? "text-lg" : "text-base";
  const guestCountSize = isLargeTablet ? "text-2xl" : isTablet ? "text-xl" : "text-lg";
  const guestBtnSize = isLargeTablet ? "h-11 w-11" : isTablet ? "h-10 w-10" : "h-8 w-8";
  const guestBtnText = isLargeTablet ? "text-3xl" : isTablet ? "text-2xl" : "text-xl";
  const checkboxSize = isLargeTablet ? "w-8 h-8" : isTablet ? "w-7 h-7" : "w-6 h-6";
  const checkmarkSize = isLargeTablet ? "text-2xl" : isTablet ? "text-xl" : "text-lg";
  const btnTextSize = isLargeTablet ? "text-2xl" : isTablet ? "text-xl" : "text-lg";
  const btnPadding = isLargeTablet ? "py-5" : isTablet ? "py-4" : "py-4";
  const inputGap = isLargeTablet ? "mb-6" : isTablet ? "mb-5" : "mb-4";
  const btnMarginTop = isLargeTablet ? "mt-12" : isTablet ? "mt-10" : "mt-8";

  const inputRowClass = isTablet ? "flex-row gap-4" : "flex-col";
  const inputFlexClass = isTablet ? "flex-1" : "";

  const handleCreate = () => {
    if (!name.trim()) { Alert.alert('Error', 'Please enter customer name'); return }
    if (!phone.trim()) { Alert.alert('Error', 'Please enter customer phone'); return }

    setPendingCustomerData({
      customer_name: isWalkIn ? "Walk In" : name.trim(),
      customer_phone: isWalkIn ? "9876543210" : phone.trim(),
      guest_count: guests,
    })

    navigation.navigate('tables' as never)
  }
  const handleWalkInToggle = () => {
    if (!isWalkIn) {
      setPrevData({ name, phone });

      // Autofill
      setName("Walk-in");
      setPhone("9876543210");
    } else {
      setName(prevData.name);
      setPhone(prevData.phone);
    }
    setIsWalkIn((prev) => !prev);
  };

  return (
    <View className={`flex-1 ${outerPadding}`}>
      <View className={`rounded-2xl border border-zinc-700 bg-zinc-900/80 ${cardPadding}`}>

        {/* ── Header ── */}
        <Text className={`text-white font-bold ${titleSize}`}>
          New Order
        </Text>
        <Text className={`text-zinc-400 font-bold ${subtitleSize} mt-1 mb-4`}>
          Fill customer details and guest count
        </Text>

        {/* ── Walk-in Toggle ── */}
        <Pressable
          onPress={handleWalkInToggle}
          disabled={loading}
          className={`
            flex-row items-center rounded-xl
            border border-zinc-700 bg-zinc-800/70
            px-3 mb-4
            ${isLargeTablet ? "py-4" : isTablet ? "py-3" : "py-3"}
          `}
        >
          <View
            className={`
              rounded border mr-3 items-center justify-center
              ${checkboxSize}
              ${isWalkIn ? "bg-yellow border-yellow" : "border-white"}
            `}
          >
            {isWalkIn && (
              <Text className={`text-black font-bold ${checkmarkSize}`}>✓</Text>
            )}
          </View>

          <View className="flex-1">
            <Text className={`text-white font-semibold ${walkInTitleSize}`}>
              Walk-In Customer
            </Text>
            <Text className={`text-zinc-400 ${walkInSubSize}`}>
              Use this for customers without reservations
            </Text>
          </View>
        </Pressable>

        {/* ── Inputs: stacked on phone, side-by-side on tablet ── */}
        <View className={inputRowClass}>
          <View className={`${inputFlexClass} ${inputGap}`}>
            <AppInput
              label="Customer Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter customer name"
              editable={!isWalkIn && !loading}
              labelClassName={labelSize}
              inputTextClassName={inputTextSize}
            />
          </View>

          <View className={`${inputFlexClass} ${inputGap}`}>
            <AppInput
              label="Customer Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="9800000000"
              editable={!isWalkIn && !loading}
              labelClassName={labelSize}
              inputTextClassName={inputTextSize}
            />
          </View>
        </View>

        {/* ── Guest Counter ── */}
        <Text className={`text-white font-semibold py-4 ${guestLabelSize}`}>
          Guests
        </Text>
        <View className="flex-row items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3">
          <Pressable
            onPress={() => setGuests(Math.max(1, guests - 1))}
            disabled={loading}
            className={`rounded-full bg-zinc-700 items-center justify-center ${guestBtnSize}`}
          >
            <Text className={`text-yellow font-bold ${guestBtnText}`}>-</Text>
          </Pressable>

          <Text className={`text-white font-semibold ${guestCountSize}`}>
            {guests} {guests === 1 ? "Person" : "People"}
          </Text>

          <Pressable
            onPress={() => setGuests(guests + 1)}
            disabled={loading}
            className={`rounded-full bg-zinc-700 items-center justify-center ${guestBtnSize}`}
          >
            <Text className={`text-yellow font-bold ${guestBtnText}`}>+</Text>
          </Pressable>
        </View>

        {/* ── Submit ── */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={loading}
          className={`bg-yellow rounded-xl items-center ${btnPadding} ${btnMarginTop}`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text className={`text-black font-bold ${btnTextSize}`}>
              Create Order
            </Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}