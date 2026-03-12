import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsMobile } from "../hooks/useIsMobile";

export default function RootIndex() {
  const isMobile = useIsMobile();

  return (
    <SafeAreaView className="flex-1 bg-yellow">
    <View className="flex-1 justify-center items-center p-4">
      <Text className="font-heading mb-4">
        {isMobile ? "Welcome Mobile User!" : "Welcome Tablet User!"}
      </Text>

     
      <TouchableOpacity className="bg-blue p-4 rounded-lg mb-4">
        <Text className="text-pink text-center font-body">
          This card resizes automatically on phones.
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
