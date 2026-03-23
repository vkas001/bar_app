import { bgColor } from "@/theme/colors";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, useWindowDimensions } from "react-native";

const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;
  const isLandscape = width > height;
  return { isTablet, isLargeTablet, isLandscape };
};

export default function TabsLayout() {
  const { isTablet, isLargeTablet } = useResponsive();

  const tabBarHeight    = isLargeTablet ? 72 : isTablet ? 68 : 64;
  const tabIconSize     = isLargeTablet ? 26 : isTablet ? 24 : 22;
  const tabFontSize     = isLargeTablet ? 13 : isTablet ? 12 : 10;
  const fabSize         = isLargeTablet ? 72 : isTablet ? 68 : 64;
  const fabIconSize     = isLargeTablet ? 30 : isTablet ? 28 : 26;
  const fabOffset       = isLargeTablet ? -28 : isTablet ? -26 : -25;
  const paddingVertical = isLargeTablet ? 12 : isTablet ? 10 : 8;

  return (
    <>
      <StatusBar style="light" translucent={false} />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: bgColor.yellow,
          tabBarInactiveTintColor: "#9ca3af",

          // ── Show label + icon on tablet, icon only on phone ──────────────
          tabBarShowLabel: isTablet,
          tabBarLabelPosition: isTablet ? "beside-icon" : "below-icon",

          tabBarStyle: {
            backgroundColor: "#262626",
            borderTopColor: "#2f2f2f",
            height: tabBarHeight,
            paddingBottom: paddingVertical,
            paddingTop: paddingVertical,
          },

          tabBarItemStyle: {
            borderRadius: 8,
          },

          tabBarLabelStyle: {
            fontSize: tabFontSize,
            fontWeight: "600",
          },
        }}
      >

        {/* ── Home ── */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={tabIconSize}
                color={color}
              />
            ),
          }}
        />

        {/* ── Orders ── */}
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name={focused ? "list-alt" : "list-alt"}
                size={tabIconSize}
                color={color}
              />
            ),
          }}
        />

        {/* ── Create Order (FAB) ── */}
        <Tabs.Screen
          name="createOrder"
          options={{
            title: "",
            tabBarIcon: () => (
              <View
                style={{
                  width: fabSize,
                  height: fabSize,
                  borderRadius: fabSize / 2,
                }}
                className="bg-yellow justify-center items-center shadow-lg"
              >
                <FontAwesome5
                  name="concierge-bell"
                  size={fabIconSize}
                  color="white"
                />
              </View>
            ),
            tabBarButton: ({ ref: _ref, ...props }) => (
              <Pressable
                {...props}
                style={{ top: fabOffset }}
                className="justify-center items-center"
              />
            ),
          }}
        />

        {/* ── Tables ── */}
        <Tabs.Screen
          name="tables"
          options={{
            title: "Tables",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "table-chair" : "table-furniture"}
                size={tabIconSize}
                color={color}
              />
            ),
          }}
        />

        {/* ── Menu ── */}
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name={focused ? "concierge-bell" : "concierge-bell"}
                size={tabIconSize}
                color={color}
              />
            ),
          }}
        />

      </Tabs>
    </>
  );
}