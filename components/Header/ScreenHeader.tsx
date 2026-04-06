import { useResponsive } from '@/shared/hooks/useResponsive'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface ScreenHeaderProps {
    title: string
    extraContent?: ReactNode
    onBackPress?: () => void
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, extraContent, onBackPress }) => {
    const navigation = useNavigation()
    const { isSmallPhone, isTablet, isLargeTablet, text2xl, textXl, iconMd, iconLg, px, textBase } = useResponsive()

    const chevronSize = isLargeTablet ? 32 : isTablet ? 28 : isSmallPhone ? 24 : 28

    return (
        <View className={`mb-2 ${px}`}>
            <View className="flex-row items-center">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={onBackPress ?? (() => navigation.goBack())}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Feather name="chevron-left" size={chevronSize} color="white" />
                </TouchableOpacity>

                {/* Title */}
                <Text
                    numberOfLines={1}
                    className={`ml-3 flex-1 font-bold text-white ${isSmallPhone ? textBase : text2xl}`}
                >
                    {title}
                </Text>

                {/* Extra Content */}
                {extraContent && (
                    <View className="ml-2">
                        {extraContent}
                    </View>
                )}

            </View>
        </View>
    )
}

export default ScreenHeader