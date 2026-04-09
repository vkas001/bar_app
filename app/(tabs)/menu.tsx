import CartButton from '@/components/cartButton'
import PageHeader from '@/components/Header/PageHeader'
import ScreenHeader from '@/components/Header/ScreenHeader'
import { useScreenRefresh } from '@/components/refresh/refresh'
import CartModal from '@/modules/menu/components/CartModal'
import { useMenu } from '@/modules/menu/hook/useMenu'
import MenuScreen from '@/modules/menu/menuscreen'
import { useCartStore } from '@/modules/menu/store/cartStore'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function menu() {
 
  const [cartVisible, setCartVisible] = useState(false)
  const itemCount = useCartStore((state) => state.getTotalItems());
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-black relative'>

      <PageHeader />

      <ScreenHeader title="Menu" />



     
        <MenuScreen/>

      <CartButton
        itemCount={itemCount}
        onPress={() => setCartVisible(true)}
      />

      <CartModal
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        onOrderSuccess={(type) => {
          setCartVisible(false);

          if (type === 'bar_tab') {
            router.push('/(tabs)/home');

          } else {
            router.push('/(tabs)/orders');
          }
        }}
      />

    </SafeAreaView>
  )
}