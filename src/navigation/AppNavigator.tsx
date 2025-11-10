// Navegador principal de TravelKey
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types';

// Pantallas de autenticación
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Navegador principal (tabs)
import MainTabNavigator from './MainTabNavigator';

// Pantallas adicionales
import DetailScreen from '../screens/main/DetailScreen';
import ItineraryFormScreen from '../screens/main/ItineraryFormScreen';
import ItineraryDetailScreen from '../screens/main/ItineraryDetailScreen';
import TranslatorScreen from '../screens/main/TranslatorScreen';
import AlertsScreen from '../screens/main/AlertsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import PreferencesScreen from '../screens/main/PreferencesScreen';
import ExpensesScreen from '../screens/main/ExpensesScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // TODO: Agregar pantalla de loading
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#1a1a2e' },
        }}
      >
        {user ? (
          // Usuario autenticado - mostrar navegación principal
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen}
              options={{
                headerShown: true,
                title: 'Detalles',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="ItineraryForm" 
              component={ItineraryFormScreen}
              options={{
                headerShown: true,
                title: 'Generar Itinerario',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="ItineraryDetail" 
              component={ItineraryDetailScreen}
              options={{
                headerShown: true,
                title: 'Mi Itinerario',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Translator" 
              component={TranslatorScreen}
              options={{
                headerShown: true,
                title: 'Traductor',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Alerts" 
              component={AlertsScreen}
              options={{
                headerShown: true,
                title: 'Alertas de Seguridad',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                headerShown: true,
                title: 'Perfil',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Preferences" 
              component={PreferencesScreen}
              options={{
                headerShown: true,
                title: 'Preferencias',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen 
              name="Expenses" 
              component={ExpensesScreen}
              options={{
                headerShown: true,
                title: 'Gestor de Gastos',
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
          </>
        ) : (
          // Usuario no autenticado - mostrar pantallas de auth
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
