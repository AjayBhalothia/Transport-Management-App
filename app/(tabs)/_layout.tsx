import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: "#ffffff" },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Maintenance',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wrench.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trucks"
        options={{
          title: 'Trucks',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="truck.box.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: 'Employees',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="party"
        options={{
          title: 'Party',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="building.2.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
