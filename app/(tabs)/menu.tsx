import { useScreenRefresh } from '@/components/refresh/refresh'
import React from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function menu() {
  const { refreshing, onRefresh } = useScreenRefresh()

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView
        className='flex-1'
        contentContainerClassName='px-4 py-4'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View>
          <Text className="font-heading text-xl text-white">
            Heading Text
          </Text>

          <Text className="font-body text-base text-white mt-2">
            Body Text
          </Text>

          <Text className="font-bodyBold text-lg text-white mt-2">
            Bold Body Text
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}