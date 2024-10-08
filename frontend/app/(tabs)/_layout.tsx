import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router"
import React from "react";

export default () => {
    return (
        <Tabs
            screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'alert';
    
                if (route.name === 'home') {
                iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'settings') {
                iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'chat') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            })}
        >
            <Tabs.Screen name="home" options={{ headerShown: false }}/>
            <Tabs.Screen name="list" options={{ headerShown: false }}/>
        </Tabs>
    )
}

const styles = {
    tabBar: {
        backgroundColor: '#5A2B81',
        paddingBottom: 5,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 60,
      },
      tabBarLabel: {
        fontSize: 14,
        fontWeight: 'bold',
      },
  };