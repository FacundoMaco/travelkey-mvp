// Componente de tarjeta para mostrar hoteles, restaurantes y lugares
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.7;

interface CardItemProps {
  item: Place;
  onPress: (item: Place) => void;
}

const CardItem: React.FC<CardItemProps> = ({ item, onPress }) => {
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <Ionicons
              name={getCategoryIcon(item.category) as any}
              size={16}
              color={getCategoryColor(item.category)}
            />
            <Text style={[styles.category, { color: getCategoryColor(item.category) }]}>
              {item.category === 'hotel' ? 'Hospedaje' : 
               item.category === 'restaurant' ? 'Gastronomía' : 'Lugares'}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#f39c12" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            ${item.price}
            {item.category === 'hotel' ? '/noche' : 
             item.category === 'restaurant' ? '/persona' : '/entrada'}
          </Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color="#a0a0a0" />
            <Text style={styles.location} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#16213e',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  category: {
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f3460',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginLeft: 8,
  },
  location: {
    fontSize: 12,
    color: '#a0a0a0',
    flex: 1,
  },
});

export default CardItem;
