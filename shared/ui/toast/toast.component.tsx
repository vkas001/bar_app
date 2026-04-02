import { View, Text } from 'react-native';
import { ToastType } from './toast.types';

export const ToastView = ({
    message,
    type,
}: {
    message: string;
    type: ToastType;
}) => {
    const bg =
        type === 'success'
            ? 'bg-green-500'
            : type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500';

    return (
        <View className={`px-4 py-3 rounded-xl shadow-lg ${bg}`}>
            <Text className="text-white font-semibold">{message}</Text>
        </View>
    );
};