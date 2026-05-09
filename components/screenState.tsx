import { ActivityIndicator, Pressable, Text, View } from 'react-native'

type Props = {
    loading: boolean;
    error?: string | null;
    onRetry: () => void;
    loadingText?: string;
};

export function ScreenState({
    loading,
    error,
    onRetry,
    loadingText = 'Loading...',
}: Props) {
    if (!loading && !error) return null;

    return (
        <View className='bg-zinc-900 mt-4 rounded-lg'>
            <View className='flex-1 mt-8 ml-4 mr-4 mb-8 items-center justify-center py-20'>
                {loading && (
                    <>
                        <ActivityIndicator size="large" color="#fcd34d" />
                        <Text className="mt-4 text-white text-base">{loadingText}</Text>
                    </>
                )}
                {error && (
                    <>
                        <Text className="text-red-500 text-lg font-bold mb-2">
                            Something went wrong
                        </Text>
                        <Text className="text-white text-center mb-4">{error}</Text>
                        {onRetry && (
                            <Pressable onPress={onRetry}>
                                <Text className="text-yellow text-base font-semibold">
                                    Tap to retry
                                </Text>
                            </Pressable>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}