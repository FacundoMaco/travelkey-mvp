import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../lib/AuthContext';
import '../lib/firebase';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Cargar fuentes de forma no bloqueante
  const [fontsLoaded] = useFonts({
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // No esperar por fuentes - mostrar contenido inmediatamente
    // Las fuentes se cargarán en background
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    // Reducir timeout - no esperar demasiado
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/welcome');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, isLoading, segments, router]);

  // Mostrar contenido inmediatamente, no esperar por fuentes
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 200,
      }}
    />
  );
}

export default function RootLayoutNav() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
