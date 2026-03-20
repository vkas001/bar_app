import ScreenHeader from '@/components/Header/ScreenHeader';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarTabFilter from './components/BarTabFilter';
import BarTabForm from './components/BarTabForm';
import TabInfo from './components/TabInfo';
import { CreateBarTabPayload } from './types/barTab.types';

export default function BarTabScreen() {
  const [isCreateTabOpen, setIsCreateTabOpen] = useState(false)

  const handleCreateTab = (_payload: CreateBarTabPayload) => {
    setIsCreateTabOpen(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScreenHeader title="Bar Tabs" extraContent={<TabInfo />} />

      <BarTabFilter onPressNewTab={() => setIsCreateTabOpen(true)} />

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

    </SafeAreaView>
  )
}