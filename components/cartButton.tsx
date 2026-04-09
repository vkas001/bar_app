import { Pressable, Text, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

interface CartButtonProps {
    itemCount: number;
    onPress: () => void;
}

export default function CartButton({ itemCount, onPress }: CartButtonProps) {
    const scale = useRef(new Animated.Value(1)).current;
    const pulse = useRef(new Animated.Value(1)).current;
    const pulseOpacity = useRef(new Animated.Value(0.6)).current;

    // Pulse ring animation when itemCount > 0
    useEffect(() => {
        if (itemCount > 0) {
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(pulse, { toValue: 1.5, duration: 900, useNativeDriver: true }),
                        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
                    ]),
                    Animated.sequence([
                        Animated.timing(pulseOpacity, { toValue: 0, duration: 900, useNativeDriver: true }),
                        Animated.timing(pulseOpacity, { toValue: 0.6, duration: 900, useNativeDriver: true }),
                    ]),
                ])
            ).start();
        } else {
            pulse.setValue(1);
            pulseOpacity.setValue(0);
        }
    }, [itemCount]);

    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.88, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{
                position: 'absolute',
                bottom: 18,
                right: 20,
            }}
        >
            {/* Pulse ring */}
            {itemCount > 0 && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#e5a100',
                        opacity: pulseOpacity,
                        transform: [{ scale: pulse }],
                    }}
                />
            )}

            {/* Button */}
            <Animated.View
                style={{
                    transform: [{ scale }],
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#e5a100',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 10,
                }}
            >
                <Ionicons name="cart" size={28} color="#111" />

                {/* Badge */}

                <View
                    style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'red',
                        borderRadius: 20,
                        minWidth: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 4,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: '800'
                        }}
                    >
                        {itemCount > 99 ? '99+' : itemCount}
                    </Text>
                </View>

            </Animated.View>
        </Pressable>
    );
}