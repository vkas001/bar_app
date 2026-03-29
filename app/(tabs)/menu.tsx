import { useScreenRefresh } from '@/components/refresh/refresh'
import React from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@/components/Header/ScreenHeader'
import PageHeader from '@/components/Header/PageHeader'
import MenuScreen from '@/modules/menu/menuscreen'

export default function menu() {
  const { refreshing, onRefresh } = useScreenRefresh()

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <PageHeader />
      <ScreenHeader title="Menu" />
      <ScrollView
        className='flex-1'
        contentContainerClassName='px-4 py-4'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <MenuScreen />
      </ScrollView>
    </SafeAreaView>
  )
}