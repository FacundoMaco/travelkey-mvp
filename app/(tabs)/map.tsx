import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chiclayoAccommodations, chiclayoExperiences, chiclayoRestaurants } from '../../lib/mockData';
import { Accommodation, LocalExperience, Restaurant } from '../../lib/types';

type PlaceType = 'all' | 'accommodation' | 'restaurant' | 'experience';

export default function MapScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filterPlaces = () => {
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
  };

  const renderPlaceCard = (place: Accommodation | Restaurant | LocalExperience) => (
    <View key={place.id} style={styles.placeCard}>
      <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.placeDescription} numberOfLines={2}>{place.description}</Text>
        <View style={styles.placeMetadata}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa de Chiclayo</Text>
        <Text style={styles.subtitle}>Experiencias Auténticas en Lambayeque</Text>
      </View>

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

      <ScrollView style={styles.placesContainer}>
        {filterPlaces().map(renderPlaceCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: '#0f3460',
  },
  priceFilterContainer: {
    paddingVertical: 10,
    backgroundColor: '#16213e',
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
    borderColor: '#00d4ff',
  },
  filterButtonActive: {
    backgroundColor: '#00d4ff',
  },
  filterButtonText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#1a1a2e',
  },
  placesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeDescription: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 10,
  },
  placeMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    marginLeft: 5,
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  tag: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: '500',
  },
});
