import { bgColor } from "@/theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, View } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <StatusBar
        style="light"
        translucent={false}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: bgColor.yellow,
          tabBarInactiveTintColor: "#9ca3af",

          tabBarStyle: {
            backgroundColor: "#262626",
            borderTopColor: "#2f2f2f",
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },

          tabBarLabelPosition: "beside-icon",

          tabBarItemStyle: {
            borderRadius: 8,
          },

          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
          },
        }}
      >

        {/* Home */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* Orders */}
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* Create Order */}
        <Tabs.Screen
          name="createOrder"
          options={{
            title: "",
            tabBarIcon: ({ }) => (
              <View className="w-16 h-16 rounded-full bg-yellow justify-center items-center shadow-lg">
                <FontAwesome5
                  name="concierge-bell"
                  size={26}
                  color="white"
                />
              </View>
            ),
            tabBarButton: ({ ref: _ref, ...props }) => (
              <Pressable
                {...props}
                className="top-[-25] justify-center items-center"
              />
            )
          }}
        />

        {/* Menu */}
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "restaurant" : "restaurant-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* Tables */}
        <Tabs.Screen
          name="tables"
          options={{
            title: "Tables",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}