import * as Linking from 'expo-linking'
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();


export default function AuthLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 2,
          display: ['profile/[id]', 'roomDetail', 'welcome', 'search', "RoomDetail", "PersonalInformation", "payment"].includes(route.name) ? 'none' : 'flex'
        },
        tabBarActiveTintColor: '#96B374',
        tabBarInactiveTintColor: isDarkMode ? '#666' : '#888',
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-today" size={28} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="RoomDetail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="roomDetail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="welcome"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
    </QueryClientProvider>
  );
}