import React, { ReactNode, forwardRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type AppInputProps = TextInputProps & {
	label?: string;
	hint?: string;
	error?: string;
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	inputTextClassName?: string;
	leftIcon?: ReactNode;
	onLeftIconPress?: () => void;
	rightIcon?: ReactNode;
	onRightIconPress?: () => void;
};

const AppInput = forwardRef<TextInput, AppInputProps>(
	({
		label,
		hint,
		error,
		containerClassName,
		labelClassName,
		inputClassName,
		inputTextClassName,
		leftIcon,
		onLeftIconPress,
		rightIcon,
		onRightIconPress,
		placeholderTextColor = 'rgba(255,255,255,0.35)',
		...props
	}, ref) => {
		const hasError = Boolean(error);
		const isMultiline = Boolean(props.multiline);
		const resolvedLabelClassName = labelClassName ?? 'text-xs py-4';
		const resolvedInputTextClassName = inputTextClassName ?? 'text-sm';

		return (
			<View className={containerClassName ?? 'mb-6'}>
				{label ? (
					<Text className={`text-white ${resolvedLabelClassName}`}>
						{label}
					</Text>
				) : null}

				<View className="relative">
					{leftIcon ? (
						<TouchableOpacity
							onPress={onLeftIconPress}
							activeOpacity={0.75}
							className="absolute left-3 z-10"
							style={
								isMultiline
									? { top: 14 }
									: { top: '50%', transform: [{ translateY: -10 }] }
							}
						>
							{leftIcon}
						</TouchableOpacity>
					) : null}

					<TextInput
						ref={ref}
						placeholderTextColor={placeholderTextColor}
						className={`bg-white/10 text-white/85 px-4 py-3 rounded-xl border ${
							hasError ? 'border-red-400' : 'border-white/20'
						} ${leftIcon ? 'pl-11' : ''} ${rightIcon ? 'pr-11' : ''} ${resolvedInputTextClassName} ${inputClassName ?? ''}`}
						{...props}
					/>

					{rightIcon ? (
						<TouchableOpacity
							onPress={onRightIconPress}
							activeOpacity={0.75}
							className="absolute right-3"
							style={{ top: '50%', transform: [{ translateY: -10 }] }}
						>
							{rightIcon}
						</TouchableOpacity>
					) : null}
				</View>

				{error ? (
					<Text className="mt-2 text-xs text-red-400">{error}</Text>
				) : hint ? (
					<Text className="mt-2 text-xs text-zinc-400">{hint}</Text>
				) : null}
			</View>
		);
	}
);

AppInput.displayName = 'AppInput';

export default AppInput;
