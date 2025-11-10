// Pantalla de detalle de TravelKey
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Place } from '../../types';

const { width } = Dimensions.get('window');

interface DetailScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { item } = route.params;

  const getCategoryIcon = (category: string) => {
    switch (category) {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hotel':
        return 'Hospedaje';
      case 'restaurant':
        return 'Gastronomía';
      case 'attraction':
        return 'Lugares';
      default:
        return 'Lugar';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagen principal */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          {/* Header con categoría y rating */}
          <View style={styles.header}>
            <View style={styles.categoryContainer}>
              <Ionicons
                name={getCategoryIcon(item.category) as any}
                size={20}
                color={getCategoryColor(item.category)}
              />
              <Text style={[styles.category, { color: getCategoryColor(item.category) }]}>
                {getCategoryName(item.category)}
              </Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#f39c12" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>

          {/* Título y precio */}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>
            ${item.price}
            {item.category === 'hotel' ? '/noche' : 
             item.category === 'restaurant' ? '/persona' : '/entrada'}
          </Text>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Información de contacto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#0f3460" />
              <Text style={styles.infoText}>{item.address}</Text>
            </View>
            {item.phone && (
              <View style={styles.infoItem}>
                <Ionicons name="call-outline" size={20} color="#0f3460" />
                <Text style={styles.infoText}>{item.phone}</Text>
              </View>
            )}
            {item.website && (
              <View style={styles.infoItem}>
                <Ionicons name="globe-outline" size={20} color="#0f3460" />
                <Text style={styles.infoText}>{item.website}</Text>
              </View>
            )}
          </View>

          {/* Información específica por categoría */}
          {item.category === 'hotel' && 'amenities' in item && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenidades</Text>
              <View style={styles.amenitiesContainer}>
                {item.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#0f3460" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item.category === 'restaurant' && 'cuisine' in item && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de Cocina</Text>
              <View style={styles.tagsContainer}>
                {item.cuisine.map((cuisine, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{cuisine}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item.category === 'attraction' && 'duration' in item && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información de Visita</Text>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#0f3460" />
                <Text style={styles.infoText}>Duración: {item.duration}</Text>
              </View>
              {item.openingHours && (
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={20} color="#0f3460" />
                  <Text style={styles.infoText}>Horarios: {item.openingHours}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botón de acción fijo */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.actionButtonText}>
            {item.category === 'hotel' ? 'Reservar' : 
             item.category === 'restaurant' ? 'Hacer Reserva' : 'Agregar a Itinerario'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#f39c12',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f3460',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#a0a0a0',
    lineHeight: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 14,
    color: '#ffffff',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  actionContainer: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#16213e',
  },
  actionButton: {
    backgroundColor: '#0f3460',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailScreen;
