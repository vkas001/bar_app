import { useWindowDimensions } from "react-native";

const BREAKPOINTS = {
  sm: 380,
  md: 414,
  lg: 768,   // tablet portrait
  xl: 1024,  // tablet landscape
};

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isPhone = width < BREAKPOINTS.lg
  const isTablet = width >= BREAKPOINTS.lg
  const isLargeTablet = width >= BREAKPOINTS.xl
  const isLandscape = width > height
  const isSmallPhone = width < BREAKPOINTS.sm
  const isMediumPhone = width >= BREAKPOINTS.sm && width < BREAKPOINTS.md

  // Scale a value proportionally to screen width
  // rs(16) → 16 on 390px phone, ~22 on 768px tablet
  const rs = (size: number, base = 390) =>
    Math.round((width / base) * size);

  // Clamp rs() between a min and max
  const rsc = (size: number, min: number, max: number) =>
    Math.min(Math.max(rs(size), min), max);

  // Number of columns based on width
  const columns = isLargeTablet ? 4 : isTablet ? 3 : 2;

  // ── Spacing classes ──────────────────────────────────────────────────────
  const px = isLargeTablet ? 'px-8' : isTablet ? 'px-6' : 'px-4'
  const py = isLargeTablet ? 'py-4' : isTablet ? 'py-3' : 'py-2'
  const mx = isLargeTablet ? 'mx-8' : isTablet ? 'mx-6' : 'mx-4'
  const my = isLargeTablet ? 'my-8' : isTablet ? 'my-6' : 'my-4'
  const gap = isLargeTablet ? 'gap-6' : isTablet ? 'gap-4' : 'gap-3'
  const p = isLargeTablet ? 'p-6' : isTablet ? 'p-5' : 'p-4'

  // ── Typography classes ───────────────────────────────────────────────────
  const textXs = isLargeTablet ? 'text-sm' : isTablet ? 'text-xs' : 'text-xs'
  const textSm = isLargeTablet ? 'text-base' : isTablet ? 'text-sm' : 'text-xs'
  const textBase = isLargeTablet ? 'text-lg' : isTablet ? 'text-base' : 'text-base'
  const textLg = isLargeTablet ? 'text-xl' : isTablet ? 'text-lg' : 'text-base'
  const textXl = isLargeTablet ? 'text-2xl' : isTablet ? 'text-xl' : 'text-lg'
  const text2xl = isLargeTablet ? 'text-3xl' : isTablet ? 'text-2xl' : 'text-xl'
  const text3xl = isLargeTablet ? 'text-4xl' : isTablet ? 'text-3xl' : 'text-2xl'

  // ── Icon sizes (numeric — for Expo/vector icons) ─────────────────────────
  const iconXs = isLargeTablet ? 16 : isTablet ? 14 : 12
  const iconSm = isLargeTablet ? 20 : isTablet ? 18 : 16
  const iconMd = isLargeTablet ? 24 : isTablet ? 22 : 20
  const iconLg = isLargeTablet ? 28 : isTablet ? 26 : 24
  const iconXl = isLargeTablet ? 32 : isTablet ? 30 : 28

  // ── Avatar / circle sizes ────────────────────────────────────────────────
  const avatarSm = isLargeTablet ? 'h-12 w-12' : isTablet ? 'h-10 w-10' : 'h-9 w-9'
  const avatarMd = isLargeTablet ? 'h-16 w-16' : isTablet ? 'h-14 w-14' : 'h-12 w-12'
  const avatarLg = isLargeTablet ? 'h-20 w-20' : isTablet ? 'h-18 w-18' : 'h-16 w-16'

  // ── Component classes ────────────────────────────────────────────────────
  const inputHeight = isLargeTablet ? 'h-16' : isTablet ? 'h-14' : 'h-12'
  const btnPadding = isLargeTablet ? 'py-5 px-8' : isTablet ? 'py-4 px-6' : 'py-3 px-4'
  const cardPadding = isLargeTablet ? 'p-8' : isTablet ? 'p-6' : 'p-4'
  const roundedCard = isLargeTablet ? 'rounded-2xl' : isTablet ? 'rounded-xl' : 'rounded-xl'

  // ── Tab bar ──────────────────────────────────────────────────────────────
  const tabBarHeight = rsc(64, 60, 72)
  const tabIconSize = rsc(22, 20, 26)
  const tabFontSize = rsc(10, 10, 13)
  const tabShowLabel = isTablet
  const tabLabelPosition: 'beside-icon' | 'below-icon' = isTablet ? 'beside-icon' : 'below-icon'

  // ── FAB (center tab button) ──────────────────────────────────────────────
  const fabSize = rsc(64, 60, 72)
  const fabIconSize = rsc(26, 24, 30)
  const fabOffset = -(rsc(25, 22, 28))

  // ── Raw numeric size tokens ──────────────────────────────────────────────
  const size = {
    icon: {
      xs: iconXs,
      sm: iconSm,
      md: iconMd,
      lg: iconLg,
      xl: iconXl,
    },
    padding: {
      sm: isLargeTablet ? 8 : isTablet ? 6 : 4,
      md: isLargeTablet ? 16 : isTablet ? 12 : 8,
      lg: isLargeTablet ? 24 : isTablet ? 20 : 16,
    },
    radius: {
      sm: isLargeTablet ? 8 : isTablet ? 6 : 4,
      md: isLargeTablet ? 12 : isTablet ? 10 : 8,
      lg: isLargeTablet ? 16 : isTablet ? 14 : 12,
      xl: isLargeTablet ? 24 : isTablet ? 20 : 16,
      full: 9999,
    },
    avatar: {
      sm: isLargeTablet ? 48 : isTablet ? 40 : 36,
      md: isLargeTablet ? 64 : isTablet ? 56 : 48,
      lg: isLargeTablet ? 80 : isTablet ? 72 : 64,
    },
  }

  return {
    // ── Raw dimensions ─────────────────────────────────────────────────────
    width,
    height,

    // ── Breakpoint booleans ────────────────────────────────────────────────
    isPhone,
    isSmallPhone,
    isMediumPhone,
    isTablet,
    isLargeTablet,
    isLandscape,

    // ── Scaling functions ──────────────────────────────────────────────────
    rs,
    rsc,
    columns,

    // ── Spacing classes ────────────────────────────────────────────────────
    px, py, mx, my, gap, p,

    // ── Typography classes ─────────────────────────────────────────────────
    textXs, textSm, textBase, textLg, textXl, text2xl, text3xl,

    // ── Icon sizes (numeric) ───────────────────────────────────────────────
    iconXs, iconSm, iconMd, iconLg, iconXl,

    // ── Component classes ──────────────────────────────────────────────────
    avatarSm, avatarMd, avatarLg,
    inputHeight,
    btnPadding,
    cardPadding,
    roundedCard,

    // ── Tab bar values ─────────────────────────────────────────────────────
    tabBarHeight,
    tabIconSize,
    tabFontSize,
    tabShowLabel,
    tabLabelPosition,

    // ── FAB values ─────────────────────────────────────────────────────────
    fabSize,
    fabIconSize,
    fabOffset,

    // ── Raw numeric tokens ─────────────────────────────────────────────────
    size,
  }
}