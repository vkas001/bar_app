import AppInput from '@/components/input'
import { useOrderStore } from '@/modules/orders/store/createOrderStore'
import { useResponsive } from '@/shared/hooks/useResponsive'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { useBarTabs } from '../hook/useBarTabs'
import { CreateBarTabPayload } from '../types/barTab.types'

interface BarTabFormProps {
	onClose: () => void
	onCancel?: () => void
}

export default function BarTabForm({
	onClose,
	onCancel
}: BarTabFormProps) {
	const router = useRouter()
	const { createBarTab, creating } = useBarTabs()
	const setBarTabCustomerData = useOrderStore(state => state.setBarTabCustomerData)

	const [customerName, setCustomerName] = useState('')
	const [phone, setPhone] = useState('')
	const [notes, setNotes] = useState('')


	const { isPhone, isSmallPhone, textSm, textBase, textLg, textXl, iconSm, size } = useResponsive()

	const handleCancel = () => {
		if (onCancel) { onCancel(); return }
		onClose()
	}

	const handleCreate = async () => {
		if (!customerName.trim()) {
			Alert.alert('Error', 'Please enter customer name');
			return
		}

		const created = await createBarTab({
			customerName: customerName.trim(),
			phone: phone.trim() || '',
			notes: notes.trim() || '',
		})

		if (!created) return

		setBarTabCustomerData({
			id: created.id,
			customerName: created.customerName,
			customerPhone: created.phone,
			notes: created.notes ?? '',
		})

		onClose()
		router.push('/(tabs)/menu')
	}
	const s = isSmallPhone ? {
		titleText: textXl,
		labelText: textSm,
		inputText: textSm,
		inputH: 'h-10',
		notesH: 'min-h-[100px] pt-2',
		btnH: 'h-10',
		btnText: textSm,
		closeBtnSize: 'h-8 w-8',
		closeIconSize: iconSm,
		inputIconSize: iconSm,
		inputMb: 'mb-3',
	} : {
		titleText: 'text-2xl',
		labelText: 'text-lg',
		inputText: 'text-base',
		inputH: 'h-12',
		notesH: 'min-h-[150px] pt-3',
		btnH: 'h-12',
		btnText: 'text-base',
		closeBtnSize: 'h-10 w-10',
		closeIconSize: 22,
		inputIconSize: 20,
		inputMb: 'mb-4',
	}

	return (
		// On phone: full width, no outer padding, sharp corners
		// On tablet: keep the given width with padding and rounded card
		<View className={isPhone ? 'px-2' : 'px-4 py-4'}>
			<View
				className={`border border-zinc-700 bg-zinc-900/90 p-5 ${isPhone ? 'rounded-3xl' : 'rounded-2xl p-4'}`}
			>
				{/* Header */}
				<View className='mb-3 flex-row items-start justify-between'>
					<Text className={`flex-1 pr-4 font-bold text-white ${s.titleText}`}>
						Create Bar Tab
					</Text>
					<Pressable
						accessibilityRole='button'
						onPress={onClose}
						className={`${s.closeBtnSize} items-center justify-center rounded-lg bg-zinc-800`}
						style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
					>
						<Ionicons name='close' size={s.closeIconSize} color='white' />
					</Pressable>
				</View>

				<View className='mb-4 h-px bg-white/15' />

				{/* Customer Name */}
				<AppInput
					label='Customer Name *'
					value={customerName}
					onChangeText={setCustomerName}
					placeholder='Enter customer name'
					leftIcon={<Ionicons name='person' size={s.inputIconSize} color='rgba(255,255,255,0.45)' />}
					containerClassName={s.inputMb}
					labelClassName={`pb-1 ${s.labelText}`}
					inputTextClassName={s.inputText}
					inputClassName={s.inputH}
				/>

				{/* Phone */}
				<AppInput
					label='Phone Number (optional)'
					value={phone}
					onChangeText={setPhone}
					keyboardType='phone-pad'
					placeholder='98XXXXXXXX'
					leftIcon={<Ionicons name='call' size={s.inputIconSize} color='rgba(255,255,255,0.45)' />}
					containerClassName={s.inputMb}
					labelClassName={`pb-1 ${s.labelText}`}
					inputTextClassName={s.inputText}
					inputClassName={s.inputH}
				/>

				{/* Notes */}
				<AppInput
					label='Notes (optional)'
					value={notes}
					onChangeText={setNotes}
					placeholder='Add any note for this tab...'
					leftIcon={<Ionicons name='document-text' size={s.inputIconSize} color='rgba(255,255,255,0.45)' />}
					multiline
					numberOfLines={isSmallPhone ? 3 : 5}
					textAlignVertical='top'
					containerClassName={isSmallPhone ? 'mb-3' : 'mb-5'}
					labelClassName={`pb-1 ${s.labelText}`}
					inputTextClassName={s.inputText}
					inputClassName={s.notesH}
				/>

				{/* Buttons */}
				<View className='mt-1 flex-row'
					style={{ gap: isSmallPhone ? size.padding.sm : 12 }}
				>
					<Pressable
						accessibilityRole='button'
						onPress={handleCancel}
						className={`${s.btnH} flex-1 items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800`}
						style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
					>
						<Text className={`font-semibold text-zinc-100 ${s.btnText}`}>Cancel</Text>
					</Pressable>

					<Pressable
						accessibilityRole='button'
						onPress={handleCreate}
						disabled={creating}
						className={`${s.btnH} flex-1 items-center justify-center rounded-xl bg-yellow`}
						style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
					>
						<Text className={`font-semibold text-black ${s.btnText}`}>
							{creating ? 'Creating...' : 'Create Tab'}
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}