import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f3460',
          borderTopColor: '#16213e',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#a0a0a0',
      }}
    >
      <Tabs.Screen
        name="itinerary"
        options={{
          title: 'Mi Itinerario',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="translator"
        options={{
          title: 'Traductor',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="translate" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
