// Pantalla de formulario de itinerario de TravelKey
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ItineraryFormScreen: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(500);
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = [
    'Aventura', 'Cultura', 'Gastronomía', 'Playa', 'Montaña', 
    'Historia', 'Arte', 'Naturaleza', 'Vida Nocturna', 'Relajación'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerateItinerary = () => {
    if (!destination.trim()) {
      Alert.alert('Error', 'Por favor ingresa un destino');
      return;
    }
    
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Por favor selecciona las fechas de viaje');
      return;
    }

    if (interests.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un interés');
      return;
    }

    Alert.alert(
      'Itinerario Generado',
      'Tu itinerario personalizado ha sido creado con éxito. Próximamente se integrará con la IA de Gemini.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Generar Itinerario Personalizado</Text>
          <Text style={styles.subtitle}>
            Cuéntanos sobre tu viaje y crearemos el itinerario perfecto para ti
          </Text>

          {/* Destino */}
          <View style={styles.section}>
            <Text style={styles.label}>Destino *</Text>
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="¿A dónde quieres viajar?"
              placeholderTextColor="#666"
            />
          </View>

          {/* Fechas */}
          <View style={styles.section}>
            <Text style={styles.label}>Fechas de Viaje *</Text>
            <View style={styles.dateContainer}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateLabel}>Inicio</Text>
                <TextInput
                  style={styles.dateInput}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#666"
                />
              </View>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateLabel}>Fin</Text>
                <TextInput
                  style={styles.dateInput}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#666"
                />
              </View>
            </View>
          </View>

          {/* Presupuesto */}
          <View style={styles.section}>
            <Text style={styles.label}>Presupuesto por persona</Text>
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetLabel}>${budget}</Text>
              <View style={styles.budgetSlider}>
                <TouchableOpacity
                  style={[styles.budgetButton, budget === 200 && styles.budgetButtonActive]}
                  onPress={() => setBudget(200)}
                >
                  <Text style={[styles.budgetButtonText, budget === 200 && styles.budgetButtonTextActive]}>
                    Económico
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.budgetButton, budget === 500 && styles.budgetButtonActive]}
                  onPress={() => setBudget(500)}
                >
                  <Text style={[styles.budgetButtonText, budget === 500 && styles.budgetButtonTextActive]}>
                    Medio
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.budgetButton, budget === 1000 && styles.budgetButtonActive]}
                  onPress={() => setBudget(1000)}
                >
                  <Text style={[styles.budgetButtonText, budget === 1000 && styles.budgetButtonTextActive]}>
                    Lujo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Intereses */}
          <View style={styles.section}>
            <Text style={styles.label}>Intereses *</Text>
            <Text style={styles.interestsSubtitle}>
              Selecciona los tipos de actividades que más te gustan
            </Text>
            <View style={styles.interestsContainer}>
              {interestOptions.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestButton,
                    interests.includes(interest) && styles.interestButtonActive
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[
                    styles.interestButtonText,
                    interests.includes(interest) && styles.interestButtonTextActive
                  ]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón de generación */}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateItinerary}
          >
            <Ionicons name="sparkles" size={20} color="#ffffff" />
            <Text style={styles.generateButtonText}>Generar con IA</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  dateInput: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  budgetContainer: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f3460',
    marginBottom: 16,
  },
  budgetSlider: {
    flexDirection: 'row',
    gap: 8,
  },
  budgetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  budgetButtonActive: {
    backgroundColor: '#0f3460',
  },
  budgetButtonText: {
    fontSize: 14,
    color: '#0f3460',
    fontWeight: '500',
  },
  budgetButtonTextActive: {
    color: '#ffffff',
  },
  interestsSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  interestButtonActive: {
    backgroundColor: '#0f3460',
  },
  interestButtonText: {
    fontSize: 14,
    color: '#0f3460',
    fontWeight: '500',
  },
  interestButtonTextActive: {
    color: '#ffffff',
  },
  generateButton: {
    backgroundColor: '#0f3460',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ItineraryFormScreen;
