import AppInput from '@/components/input';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  onCreate: (data: any) => void;
}

export default function CreateOrderForm
  ({
    onCreate
  }: Props) {
  const [isWalkIn, setIsWalkIn] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [prevData, setPrevData] = useState({ name: "", phone: "" })

  const handleCreate = () => {
    onCreate({
      customer: isWalkIn ? "Walk-in" : name,
      phone,
      guests,
    });

    // reset
    setName("");
    setPhone("");
    setGuests(1);
    setIsWalkIn(false);
  };

  const handleWalkInToggle = () => {
    if (!isWalkIn) {
      setPrevData({ name, phone })

      //Autofill

      setName("Walk-in");
      setPhone("9800000000");
    } else {
      setName(prevData.name);
      setPhone(prevData.phone);
    }
    setIsWalkIn((prev) => !prev)
  }


  return (
    <View className='flex-1 px-4 pt-4'>
      <View className='rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4'>
        <Text className='text-white text-2xl font-bold'>
          New Order
        </Text>
        <Text className='text-zinc-400 font-bold text-xl mt-1 mb-4'>
          Fill customer details and guest count
        </Text>

        {/* Walk-in Toggle */}

        <Pressable
          onPress={handleWalkInToggle}
          className='flex-row items-center rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 py-3 mb-4'
        >
          <View
            className={`w-6 h-6 rounded border mr-3 items-center justify-center ${isWalkIn ? 'bg-yellow border-yellow' : 'border-white'
              }`}
          >
            {isWalkIn ? <Text className='text-black text-xl font-bold'>✓</Text> : null}
          </View>

          <View className='flex-1'>
            <Text className='text-white text-xl font-semibold'>Walk-In Customer</Text>
            <Text className='text-zinc-400 text-lg'>
              Use this for customers without reservations

            </Text>
          </View>
        </Pressable>

        <AppInput
          label='Customer Name'
          value={name}
          onChangeText={setName}
          placeholder='Enter customer name'
          editable={!isWalkIn}
          containerClassName='mb-4'
          labelClassName='text-xl'
          inputTextClassName='text-xl'
        />

        <AppInput
          label='Customer Phone'
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
          placeholder='9800000000'
          editable={!isWalkIn}
          containerClassName='mb-4'
          labelClassName='text-xl'
          inputTextClassName='text-xl'
        />

        <Text className='text-white text-lg font-semibold py-4'>Guests</Text>
        <View className='flex-row items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3'>
          <Pressable
            onPress={() => setGuests(Math.max(1, guests - 1))}
            className='h-8 w-8 rounded-full bg-zinc-700 items-center justify-center'
          >
            <Text className='text-yellow text-2xl font-bold'>-</Text>
          </Pressable>

          <Text className='text-white text-xl font-semibold'>
            {guests} {guests === 1 ? 'Person' : 'People'}
          </Text>

          <Pressable
            onPress={() => setGuests(guests + 1)}
            className='h-8 w-8 rounded-full bg-zinc-700 items-center justify-center'
          >
            <Text className='text-yellow text-2xl font-bold'>+</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleCreate}
          className='bg-yellow rounded-xl mt-10 py-4 items-center'
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          <Text className='text-white font-bold text-2xl'>
            Create Order
          </Text>
        </Pressable>
      </View>
    </View>
  )
}