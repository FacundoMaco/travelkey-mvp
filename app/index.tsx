import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../lib/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder: In the future, check if user profile is complete
    // For now, redirect to the app's main navigation
    setTimeout(() => {
      router.replace('/(tabs)/itinerary');
      setLoading(false);
    }, 500);
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <ActivityIndicator size="large" color="#0f3460" />
      </View>
    );
  }

  return null;
}
