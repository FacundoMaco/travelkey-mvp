// Pantalla de preferencias de TravelKey
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferencesScreen: React.FC = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<'low' | 'medium' | 'high'>('medium');
  const [travelStyle, setTravelStyle] = useState<'adventure' | 'cultural' | 'relaxation' | 'business'>('cultural');
  const [loading, setLoading] = useState(true);

  const interestOptions = [
    { id: 'adventure', name: 'Aventura', icon: 'trending-up-outline' },
    { id: 'culture', name: 'Cultura', icon: 'library-outline' },
    { id: 'food', name: 'Gastronomía', icon: 'restaurant-outline' },
    { id: 'beach', name: 'Playa', icon: 'sunny-outline' },
    { id: 'mountain', name: 'Montaña', icon: 'mountain-outline' },
    { id: 'history', name: 'Historia', icon: 'book-outline' },
    { id: 'art', name: 'Arte', icon: 'color-palette-outline' },
    { id: 'nature', name: 'Naturaleza', icon: 'leaf-outline' },
    { id: 'nightlife', name: 'Vida Nocturna', icon: 'moon-outline' },
    { id: 'relaxation', name: 'Relajación', icon: 'bed-outline' },
    { id: 'photography', name: 'Fotografía', icon: 'camera-outline' },
    { id: 'shopping', name: 'Compras', icon: 'bag-outline' },
  ];

  const budgetOptions = [
    { value: 'low', label: 'Económico', description: 'Hasta $50/día', icon: 'wallet-outline' },
    { value: 'medium', label: 'Medio', description: '$50-150/día', icon: 'card-outline' },
    { value: 'high', label: 'Lujo', description: '$150+/día', icon: 'diamond-outline' },
  ];

  const travelStyleOptions = [
    { value: 'adventure', label: 'Aventura', description: 'Actividades emocionantes y deportes', icon: 'flash-outline' },
    { value: 'cultural', label: 'Cultural', description: 'Museos, historia y tradiciones', icon: 'library-outline' },
    { value: 'relaxation', label: 'Relajación', description: 'Spa, playa y descanso', icon: 'bed-outline' },
    { value: 'business', label: 'Negocios', description: 'Reuniones y trabajo', icon: 'briefcase-outline' },
  ];

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedInterests = await AsyncStorage.getItem('user_interests');
      const savedBudget = await AsyncStorage.getItem('user_budget');
      const savedTravelStyle = await AsyncStorage.getItem('user_travel_style');

      if (savedInterests) {
        setInterests(JSON.parse(savedInterests));
      }
      if (savedBudget) {
        setBudget(savedBudget as 'low' | 'medium' | 'high');
      }
      if (savedTravelStyle) {
        setTravelStyle(savedTravelStyle as 'adventure' | 'cultural' | 'relaxation' | 'business');
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('user_interests', JSON.stringify(interests));
      await AsyncStorage.setItem('user_budget', budget);
      await AsyncStorage.setItem('user_travel_style', travelStyle);
      
      Alert.alert('Éxito', 'Tus preferencias han sido guardadas');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar las preferencias');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando preferencias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Intereses */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Intereses de Viaje</Text>
            <Text style={styles.sectionSubtitle}>
              Selecciona los tipos de actividades que más te gustan
            </Text>
            <View style={styles.interestsGrid}>
              {interestOptions.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestButton,
                    interests.includes(interest.id) && styles.interestButtonActive
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                >
                  <Ionicons
                    name={interest.icon as any}
                    size={24}
                    color={interests.includes(interest.id) ? '#ffffff' : '#0f3460'}
                  />
                  <Text style={[
                    styles.interestText,
                    interests.includes(interest.id) && styles.interestTextActive
                  ]}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Presupuesto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Presupuesto de Viaje</Text>
            <Text style={styles.sectionSubtitle}>
              Selecciona tu rango de presupuesto por día
            </Text>
            <View style={styles.budgetContainer}>
              {budgetOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.budgetButton,
                    budget === option.value && styles.budgetButtonActive
                  ]}
                  onPress={() => setBudget(option.value as 'low' | 'medium' | 'high')}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color={budget === option.value ? '#ffffff' : '#0f3460'}
                  />
                  <Text style={[
                    styles.budgetLabel,
                    budget === option.value && styles.budgetLabelActive
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.budgetDescription,
                    budget === option.value && styles.budgetDescriptionActive
                  ]}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Estilo de viaje */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estilo de Viaje</Text>
            <Text style={styles.sectionSubtitle}>
              ¿Cómo prefieres viajar?
            </Text>
            <View style={styles.travelStyleContainer}>
              {travelStyleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.travelStyleButton,
                    travelStyle === option.value && styles.travelStyleButtonActive
                  ]}
                  onPress={() => setTravelStyle(option.value as any)}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color={travelStyle === option.value ? '#ffffff' : '#0f3460'}
                  />
                  <Text style={[
                    styles.travelStyleLabel,
                    travelStyle === option.value && styles.travelStyleLabelActive
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.travelStyleDescription,
                    travelStyle === option.value && styles.travelStyleDescriptionActive
                  ]}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón de guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
            <Ionicons name="save-outline" size={20} color="#ffffff" />
            <Text style={styles.saveButtonText}>Guardar Preferencias</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 16,
    lineHeight: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0f3460',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  interestButtonActive: {
    backgroundColor: '#0f3460',
  },
  interestText: {
    fontSize: 12,
    color: '#0f3460',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  interestTextActive: {
    color: '#ffffff',
  },
  budgetContainer: {
    gap: 12,
  },
  budgetButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  budgetButtonActive: {
    backgroundColor: '#0f3460',
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f3460',
    marginTop: 8,
    marginBottom: 4,
  },
  budgetLabelActive: {
    color: '#ffffff',
  },
  budgetDescription: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  budgetDescriptionActive: {
    color: '#ffffff',
  },
  travelStyleContainer: {
    gap: 12,
  },
  travelStyleButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  travelStyleButtonActive: {
    backgroundColor: '#0f3460',
  },
  travelStyleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f3460',
    marginTop: 8,
    marginBottom: 4,
  },
  travelStyleLabelActive: {
    color: '#ffffff',
  },
  travelStyleDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  travelStyleDescriptionActive: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#0f3460',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PreferencesScreen;
