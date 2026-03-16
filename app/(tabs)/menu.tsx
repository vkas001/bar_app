import { View, Text } from 'react-native'
import React from 'react'

export default function menu() {
  return (
    <View>
      <Text className="font-heading text-xl">
        Heading Text
      </Text>

      <Text className="font-body text-base">
        Body Text
      </Text>

      <Text className="font-bodyBold text-lg">
        Bold Body Text
      </Text>
    </View>
  )
}