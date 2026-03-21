import React from 'react'
import { View } from 'react-native'
import BarCard from './components/BarCard'
import ViewReservation from './components/ViewReservation'

export default function HomeScreen() {



    return (
        <View className='ml-2 mr-2'>
            <BarCard />
            <ViewReservation />
        </View>
    )
}