import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="add" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="videocam" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
