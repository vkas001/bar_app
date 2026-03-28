import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function confirmDialog({
    visible,
    title = "Confirm",
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel"
}: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/30 justify-center items-center">
                <View className="bg-black p-5 rounded-lg w-4/5">
                    <Text className="text-2xl font-bold text-center mb-3 text-white">
                        {title}
                    </Text>

                    <Text className="text-lg text-center text-white mb-5">
                        {message}
                    </Text>

                    <View className="flex-row justify-between gap-x-3">
                        <TouchableOpacity
                            onPress={onCancel}
                            className="flex-1 px-4 py-2 rounded-lg bg-red-500 items-center"
                        >
                            <Text className="text-white text-lg">
                                {cancelText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onConfirm}
                            className="flex-1 px-4 py-2 rounded-lg bg-yellow items-center"
                        >
                            <Text className="text-white text-lg">
                                {confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}