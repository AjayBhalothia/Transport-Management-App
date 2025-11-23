import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Maintenance",
          tabBarLabel: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol size={16} name="wrench.fill" color={color} />
              <Text style={{ color }}>Maintenance</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wrench.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarLabel: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol size={16} name="car.fill" color={color} />
              <Text style={{ color }}>Trips</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="car.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="trucks"
        options={{
          title: "Trucks",
          tabBarLabel: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol size={16} name="truck.box.fill" color={color} />
              <Text style={{ color }}>Trucks</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="truck.box.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="employees"
        options={{
          title: "Employees",
          tabBarLabel: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol size={16} name="person.2.fill" color={color} />
              <Text style={{ color }}>Employees</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="party"
        options={{
          title: "Party",
          tabBarLabel: ({ color }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol size={16} name="building.2.fill" color={color} />
              <Text style={{ color }}>Party</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="building.2.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
