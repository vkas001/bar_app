import AppInput from '@/components/input'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { CreateBarTabPayload } from '../types/barTab.types'

interface BarTabFormProps {
	onClose: () => void
	onCancel?: () => void
	onCreateTab: (payload: CreateBarTabPayload) => void
}

export default function BarTabForm({ onClose, onCancel, onCreateTab }: BarTabFormProps) {
	const [customerName, setCustomerName] = useState('')
	const [phone, setPhone] = useState('')
	const [notes, setNotes] = useState('')

	const handleCancel = () => {
		if (onCancel) {
			onCancel()
			return
		}
		onClose()
	}

	const handleCreate = () => {
		onCreateTab({
			customerName: customerName.trim(),
			phone: phone.trim(),
			notes: notes.trim(),
		})

		setCustomerName('')
		setPhone('')
		setNotes('')
	}

	return (
		<View className='px-4 py-4'>
			<View className='rounded-2xl border border-zinc-700 bg-zinc-900/90 p-5'>
				<View className='mb-3 flex-row items-start justify-between'>
					<View className='flex-1 pr-4'>
						<Text className='text-2xl font-bold text-white'>
							Create Bar Tab
						</Text>
	
					</View>

					<Pressable
						accessibilityRole='button'
						onPress={onClose}
						className='h-10 w-10 items-center justify-center rounded-lg bg-zinc-800'
						style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
					>
						<Ionicons name='close' size={22} color='white' />
					</Pressable>
				</View>

				<View className='mb-5 h-px bg-white/15' />

				<AppInput
					label='Customer Name *'
					value={customerName}
					onChangeText={setCustomerName}
					placeholder='Enter customer name'
                    leftIcon={<Ionicons name='person' size={20} color='rgba(255,255,255,0.45)' />}
					containerClassName='mb-4'
					labelClassName='pb-2 text-lg'
					inputTextClassName='text-base'
					inputClassName='h-12'
				/>

				<AppInput
					label='Phone Number(optional)'
					value={phone}
					onChangeText={setPhone}
					keyboardType='phone-pad'
					placeholder='98XXXXXXXX'
                    leftIcon={<Ionicons name='call' size={20} color='rgba(255,255,255,0.45)' />}
					containerClassName='mb-4'
					labelClassName='pb-2 text-lg'
					inputTextClassName='text-lg'
					inputClassName='h-12'
				/>

				<AppInput
					label='Notes(optional)'
					value={notes}
					onChangeText={setNotes}
					placeholder='Add any note for this tab...'
                    leftIcon={<Ionicons name='document-text' size={20} color='rgba(255,255,255,0.45)' />}
					multiline
					numberOfLines={5}
					textAlignVertical='top'
					containerClassName='mb-5'
					labelClassName='pb-2 text-lg'
					inputTextClassName='text-lg'
					inputClassName='min-h-[150px] pt-3'
				/>

				<View className='mt-2 flex-row gap-3'>
					<Pressable
						accessibilityRole='button'
						onPress={handleCancel}
						className='h-12 flex-1 items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800'
						style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
					>
						<Text className='text-base font-semibold text-zinc-100'>
							Cancel
						</Text>
					</Pressable>

					<Pressable
						accessibilityRole='button'
						onPress={handleCreate}
						className='h-12 flex-1 items-center justify-center rounded-xl bg-yellow'
						style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
					>
						<Text className='text-base font-semibold text-black'>
							Create Tab
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}
