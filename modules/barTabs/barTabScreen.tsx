import ScreenHeader from '@/components/Header/ScreenHeader';
import { useScreenRefresh } from '@/components/refresh/refresh';
import LoadingScreen from '@/components/refresh/LoadingScreen';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarTabCard from './components/BarTabCard';
import BarTabDetailsModal from './components/BarTabDetailsModal';
import BarTabFilter from './components/BarTabFilter';
import BarTabForm from './components/BarTabForm';
import TabInfo from './components/TabInfo';
import { useBarTabs } from './hook/useBarTabs';
import { BarTab, BarTabStatus, CreateBarTabPayload } from './types/barTab.types';
import { useOrderStore } from '../orders/store/createOrderStore';

export default function BarTabScreen() {
  const router = useRouter()
  const { tabs, loading, creating, error, refresh, createBarTab } = useBarTabs()
  const { orderJustCompleted, setOrderJustCompleted } = useOrderStore()

  const { refreshing, onRefresh } = useScreenRefresh(refresh)
  const [isCreateTabOpen, setIsCreateTabOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<BarTab | null>(null)
  const [isTabDetailsOpen, setIsTabDetailsOpen] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BarTabStatus>('all')

  useEffect(() => {
    if (!selectedTab) return
    const updated = tabs.find(t => t.id === selectedTab.id)
    if (updated) setSelectedTab(updated)
  }, [tabs])

  useEffect(() => {
    if (orderJustCompleted) {
      refresh()
      setOrderJustCompleted(false)
    }
  }, [orderJustCompleted])

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
    // Customer name is required, phone and notes are optional
    const { customerName, phone, notes } = payload;
    if (!customerName) {
      alert('Please enter customer name');
      return;
    }
    await createBarTab(payload);
    setIsCreateTabOpen(false);

    router.replace({
      pathname: '/(tabs)/menu',
      params: {
        customerName,
        phone: phone || '',
        notes: notes || ''
      }
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScreenHeader
        title="Bar Tabs"
        onBackPress={() => router.replace('/(tabs)/home')}
      />

      <View className='justify-center items-center '>
        <TabInfo tabs={tabs} />
      </View>

      <BarTabFilter
        onPressNewTab={() => setIsCreateTabOpen(true)}
        onSearchChange={setSearch}
        onstatusCchange={setStatusFilter}

      />


      {refreshing && <LoadingScreen />}
      <Modal
        visible={isCreateTabOpen}
        transparent
        animationType='slide'
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={() => setIsCreateTabOpen(false)}
      >
        <View className='flex-1 justify-center bg-black/50'>
          <View className='rounded-3xl pb-4'>
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
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24
        }}
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