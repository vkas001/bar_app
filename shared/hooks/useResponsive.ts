import { useWindowDimensions } from "react-native";

const BREAKPOINTS = {
  sm: 380,
  md: 414,
  lg: 768,   // tablet portrait
  xl: 1024,  // tablet landscape
};

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= BREAKPOINTS.lg;
  const isLargeTablet = width >= BREAKPOINTS.xl;
  const isPhone = width < BREAKPOINTS.lg;
  const isLandscape = width > height;

  // Scale a value proportionally to screen width
  // rs(16) → 16 on 390px phone, ~22 on 768px tablet
  const rs = (size: number, base = 390) =>
    Math.round((width / base) * size);

  // Clamp rs() between a min and max
  const rsc = (size: number, min: number, max: number) =>
    Math.min(Math.max(rs(size), min), max);

  // Number of columns based on width
  const columns = isLargeTablet ? 4 : isTablet ? 3 : 2;

  return {
    width,
    height,
    isTablet,
    isLargeTablet,
    isPhone,
    isLandscape,
    rs,
    rsc,
    columns,
  };
}