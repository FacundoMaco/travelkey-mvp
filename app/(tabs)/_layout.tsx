import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.grayMedium,
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
