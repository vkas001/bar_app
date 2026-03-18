import { Text, View } from "react-native";

export const Badge = ({ label }: { label: string }) => {
    return (
        <View className="px-3 py-2 rounded-md border border-yellow">
            <Text className="text-yellow text-xl font-bold">
                {label}
            </Text>
        </View>
    );
};