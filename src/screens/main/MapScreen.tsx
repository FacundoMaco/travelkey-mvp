// Pantalla de mapa de TravelKey
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapScreen: React.FC = () => {
  const places = [
    { name: 'Machu Picchu', location: 'Cusco, Perú', type: 'attraction' },
    { name: 'Hotel Boutique La Casona', location: 'Lima Centro', type: 'hotel' },
    { name: 'Central Restaurante', location: 'Barranco, Lima', type: 'restaurant' },
    { name: 'Líneas de Nasca', location: 'Ica, Perú', type: 'attraction' },
    { name: 'Islas Ballestas', location: 'Paracas, Ica', type: 'attraction' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return 'bed-outline';
      case 'restaurant':
        return 'restaurant-outline';
      case 'attraction':
        return 'camera-outline';
      default:
        return 'location-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel':
        return '#0f3460';
      case 'restaurant':
        return '#e74c3c';
      case 'attraction':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa de Lugares</Text>
        <Text style={styles.subtitle}>
          Explora los destinos y lugares de interés
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {places.map((place, index) => (
          <TouchableOpacity key={index} style={styles.placeCard}>
            <View style={styles.placeIcon}>
              <Ionicons
                name={getTypeIcon(place.type) as any}
                size={24}
                color={getTypeColor(place.type)}
              />
            </View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeLocation}>{place.location}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
          </TouchableOpacity>
        ))}

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={64} color="#a0a0a0" />
          <Text style={styles.mapPlaceholderTitle}>Mapa Interactivo</Text>
          <Text style={styles.mapPlaceholderText}>
            Aquí se mostraría el mapa con los pines de ubicación
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Activar Mapa Real</Text>
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
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  placeLocation: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  mapPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 20,
  },
  mapPlaceholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MapScreen;
