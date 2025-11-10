import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAuth } from '../lib/AuthContext';

export default function HomeScreen() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const redirectToMain = useCallback(() => {
    if (!authLoading && user) {
      // Placeholder: In the future, check if user profile is complete
      // For now, redirect to the app's main navigation
      router.replace('/(tabs)/itinerary');
      setLoading(false);
    } else if (!authLoading && !user) {
      // User not authenticated, redirect will be handled by _layout.tsx
      setLoading(false);
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    redirectToMain();
  }, [redirectToMain]);

  if (loading || authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
