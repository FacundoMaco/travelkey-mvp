import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderImage } from '../../components/PlaceholderImage';
import { NativeMapView } from '../../components/NativeMapView';
import { Colors } from '../../constants/Colors';
import { chiclayoAccommodations, chiclayoExperiences, chiclayoRestaurants } from '../../lib/mockData';
import { Accommodation, LocalExperience, Restaurant } from '../../lib/types';

type PlaceType = 'all' | 'accommodation' | 'restaurant' | 'experience';

// Coordenadas de Chiclayo (centro del mapa)
const CHICLAYO_COORDINATES = {
  latitude: -6.7704,
  longitude: -79.8417,
};

// Colores para diferentes tipos de marcadores
const MARKER_COLORS = {
  accommodation: Colors.blue,
  restaurant: Colors.green,
  experience: Colors.warning,
};

export default function MapScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedPlace, setSelectedPlace] = useState<(Accommodation | Restaurant | LocalExperience) | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }, []);

  // Memoizar filtrado de lugares para evitar recálculos innecesarios
  const filteredPlaces = useMemo(() => {
    let places: (Accommodation | Restaurant | LocalExperience)[] = [
      ...chiclayoAccommodations,
      ...chiclayoRestaurants,
      ...chiclayoExperiences
    ];

    if (selectedType !== 'all') {
      places = places.filter(place => {
        if (selectedType === 'accommodation') return 'type' in place;
        if (selectedType === 'restaurant') return 'cuisine' in place;
        if (selectedType === 'experience') return 'category' in place;
        return true;
      });
    }

    if (selectedPriceRange !== 'all') {
      places = places.filter(place => place.priceRange === selectedPriceRange);
    }

    return places;
  }, [selectedType, selectedPriceRange]);

  const getMarkerColor = useCallback((place: Accommodation | Restaurant | LocalExperience): string => {
    if ('type' in place) return MARKER_COLORS.accommodation;
    if ('cuisine' in place) return MARKER_COLORS.restaurant;
    return MARKER_COLORS.experience;
  }, []);

  const handleMarkerPress = useCallback((place: Accommodation | Restaurant | LocalExperience) => {
    setSelectedPlace(place);
    setShowInfoModal(true);
  }, []);

  const handleCenterOnUser = useCallback(() => {
    if (userLocation) {
      // Esto se manejaría con una referencia al mapa, pero por simplicidad
      // mostramos un mensaje
      Alert.alert('Ubicación', 'Centrando en tu ubicación...');
    } else {
      Alert.alert('Ubicación', 'Activa el permiso de ubicación para usar esta función');
    }
  }, [userLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa de Chiclayo</Text>
        <Text style={styles.subtitle}>Experiencias Auténticas en Lambayeque</Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['all', 'accommodation', 'restaurant', 'experience'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                selectedType === type && styles.filterButtonActive
              ]}
              onPress={() => setSelectedType(type as PlaceType)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedType === type && styles.filterButtonTextActive
              ]}>
                {type === 'all' && 'Todos'}
                {type === 'accommodation' && 'Hospedajes'}
                {type === 'restaurant' && 'Restaurantes'}
                {type === 'experience' && 'Experiencias'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.priceFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['all', 'low', 'medium', 'high'].map(range => (
            <TouchableOpacity
              key={range}
              style={[
                styles.filterButton,
                selectedPriceRange === range && styles.filterButtonActive
              ]}
              onPress={() => setSelectedPriceRange(range as 'all' | 'low' | 'medium' | 'high')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedPriceRange === range && styles.filterButtonTextActive
              ]}>
                {range === 'all' && 'Todos los Precios'}
                {range === 'low' && 'Económico'}
                {range === 'medium' && 'Medio'}
                {range === 'high' && 'Premium'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.webMapPlaceholder}>
            <MaterialCommunityIcons name="map-marker-radius" size={64} color={Colors.blue} />
            <Text style={styles.webMapText}>Mapa no disponible en web</Text>
            <Text style={styles.webMapSubtext}>
              Por favor, usa la app en iOS o Android para ver el mapa interactivo
            </Text>
            <ScrollView style={styles.placesList}>
              {filteredPlaces.map((place) => (
                <TouchableOpacity
                  key={place.id}
                  style={styles.placeCard}
                  onPress={handleMarkerPress.bind(null, place)}
                >
                  <PlaceholderImage source={{ uri: place.imageUrl }} style={styles.placeImage} />
                  <View style={styles.placeDetails}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeDescription} numberOfLines={2}>{place.description}</Text>
                    <View style={styles.placeMetadata}>
                      <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={16} color={Colors.warning} />
                        <Text style={styles.ratingText}>{place.rating}</Text>
                      </View>
                      <View style={styles.tagContainer}>
                        {place.tags.slice(0, 2).map(tag => (
                          <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <NativeMapView
            filteredPlaces={filteredPlaces}
            userLocation={userLocation}
            onMarkerPress={handleMarkerPress}
            onCenterOnUser={handleCenterOnUser}
            getMarkerColor={getMarkerColor}
            styles={styles}
          />
        )}
      </View>

      {/* Info Modal */}
      <Modal
        visible={showInfoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
                  <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                    <MaterialCommunityIcons name="close" size={24} color={Colors.textPrimary} />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {selectedPlace.imageUrl && (
                    <PlaceholderImage source={{ uri: selectedPlace.imageUrl }} style={styles.modalImage} />
                  )}
                  <View style={styles.modalBody}>
                    <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
                    <View style={styles.modalMetadata}>
                      <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={16} color={Colors.warning} />
                        <Text style={styles.ratingText}>{selectedPlace.rating}</Text>
                      </View>
                      <View style={styles.tagContainer}>
                        {selectedPlace.tags.slice(0, 3).map(tag => (
                          <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    {'contact' in selectedPlace && selectedPlace.contact.phone && (
                      <Text style={styles.contactText}>
                        📞 {selectedPlace.contact.phone}
                      </Text>
                    )}
                    {'location' in selectedPlace && (
                      <Text style={styles.locationText}>
                        📍 {selectedPlace.location.address}, {selectedPlace.location.city}
                      </Text>
                    )}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  priceFilterContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.backgroundSecondary,
  },
  filterScroll: {
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  filterButtonActive: {
    backgroundColor: Colors.blue,
  },
  filterButtonText: {
    color: Colors.blue,
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  modalMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.warning,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '500',
  },
  contactText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: Colors.backgroundSecondary,
  },
  webMapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 8,
  },
  webMapSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  placesList: {
    width: '100%',
    maxHeight: 400,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  placeDetails: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  placeName: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeDescription: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 10,
  },
  placeMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});