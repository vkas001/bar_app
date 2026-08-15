import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const LOAD_DURATION = 2400;
const LOGO_ASPECT = 2779 / 2050;

export function SplashScreen() {
  const { width } = useWindowDimensions();
  const isTV = width >= 1280;
  const logoWidth = isTV ? Math.min(width * 0.48, 512) : 180;
  const barWidth = isTV ? Math.min(width * 0.32, 480) : 160;

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const progress = useSharedValue(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.Never,
    });
    scale.value = withTiming(1, {
      duration: 450,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.Never,
    });
    progress.value = withTiming(1, {
      duration: LOAD_DURATION,
      easing: Easing.inOut(Easing.cubic),
      reduceMotion: ReduceMotion.Never,
    });
  }, [opacity, scale, progress]);

  useEffect(() => {
    const start = Date.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / LOAD_DURATION, 1);
      setPercent(Math.round(easeInOutCubic(t) * 100));
      if (t >= 1) clearInterval(timer);
    }, 33);
    return () => clearInterval(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const barStyle = useAnimatedStyle(() => ({
    width: barWidth * progress.value,
  }));

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/restaurant-img.jpg")}
        className="flex-1 items-center justify-center"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/70" />
        <Animated.View style={logoStyle} className="items-center">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: logoWidth, height: logoWidth / LOGO_ASPECT }}
            resizeMode="contain"
            accessible
            accessibilityLabel="Vintage Bar"
          />
        </Animated.View>
        <View className="flex-row items-center">
          <View
            className="overflow-hidden rounded-full bg-white/20"
            style={{ width: barWidth, height: isTV ? 8 : 4 }}
          >
            <Animated.View
              className="h-full rounded-full bg-yellow"
              style={barStyle}
            />
          </View>
          <Text className="ml-3 text-xs text-white lg:text-sm">
            {percent}%
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}