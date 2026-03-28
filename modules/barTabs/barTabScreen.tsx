import ScreenHeader from '@/components/Header/ScreenHeader';
import { useScreenRefresh } from '@/components/refresh/refresh';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Modal, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarTabCard from './components/BarTabCard';
import BarTabDetailsModal from './components/BarTabDetailsModal';
import BarTabFilter from './components/BarTabFilter';
import BarTabForm from './components/BarTabForm';
import TabInfo from './components/TabInfo';
import { barTabs } from './data/barTab.data';
import { BarTab, BarTabStatus, CreateBarTabPayload } from './types/barTab.types';
import { useBarTabs } from './hook/useBarTabs';

export default function BarTabScreen() {
  const router = useRouter()
  const { tabs, loading, creating, error, refresh, createBarTab } = useBarTabs()

  const { refreshing, onRefresh } = useScreenRefresh(refresh)
  const [isCreateTabOpen, setIsCreateTabOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<BarTab | null>(null)
  const [isTabDetailsOpen, setIsTabDetailsOpen] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BarTabStatus>('all')

  const filteredTabs = useMemo(() => {
    return tabs
      .filter(tab => statusFilter === 'all' || tab.status === statusFilter)
      .filter(tab => {
        const q = search.toLowerCase()
        return (
          tab.customerName.toLowerCase().includes(q) ||
          tab.phone.toLowerCase().includes(q)
        )
      })
  }, [tabs, search, statusFilter])

  const handleCreateTab = async (payload: CreateBarTabPayload) => {
    await createBarTab(payload)
    setIsCreateTabOpen(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScreenHeader
        title="Bar Tabs"
        extraContent={<TabInfo tabs={tabs} />}
        onBackPress={() => router.replace('/(tabs)/home')}
      />

      <BarTabFilter
        onPressNewTab={() => setIsCreateTabOpen(true)}
        onSearchChange={setSearch}
        onstatusCchange={setStatusFilter}

      />

      <Modal
        visible={isCreateTabOpen}
        transparent
        animationType='slide'
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={() => setIsCreateTabOpen(false)}
      >
        <View className='flex-1 items-center justify-center bg-black/60'>
          <View className='w-[80%] rounded-3xl pb-4'>
            <BarTabForm
              onClose={() => setIsCreateTabOpen(false)}
              onCancel={() => setIsCreateTabOpen(false)}
              onCreateTab={handleCreateTab}
            />
          </View>
        </View>
      </Modal>

      <BarTabDetailsModal
        visible={isTabDetailsOpen}
        tab={selectedTab}
        onClose={() => {
          setIsTabDetailsOpen(false)
          setSelectedTab(null)
        }}
      />

      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#facc15'
            colors={['#facc15']}
          />
        }
      >
        {filteredTabs.map((tab) => (
          <BarTabCard
            key={tab.id}
            tab={tab}
            onPress={(pressedTab) => {
              setSelectedTab(pressedTab)
              setIsTabDetailsOpen(true)
            }}
          />
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}