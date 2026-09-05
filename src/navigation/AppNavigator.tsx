import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/Colors';

import HomeScreen from '../screens/client/HomeScreen';
import MenuScreen from '../screens/client/MenuScreen';
import CartScreen from '../screens/client/CartScreen';
import OrdersScreen from '../screens/client/OrdersScreen';
import ProfileScreen from '../screens/client/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors?.primary || '#FF6B00',
        tabBarInactiveTintColor: Colors?.textSecondary || '#757575',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>📜</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🛒</Text>,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Commandes',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}