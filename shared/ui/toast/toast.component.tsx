import { View, Text } from 'react-native';
import { ToastType } from './toast.types';

export const ToastView = ({
    message,
    type,
}: {
    message: string;
    type: ToastType;
}) => {
    const bgColor =
        type === 'success'
            ? '#22c55e' // green-500
            : type === 'error'
                ? '#ef4444' // red-500
                : '#3b82f6'; // blue-500

    return (
        <View style={{
            backgroundColor: bgColor,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 }
        }}>
            <Text
                style={{ color: '#fff' }}
            >
                {message}
            </Text>
        </View>
    );
};