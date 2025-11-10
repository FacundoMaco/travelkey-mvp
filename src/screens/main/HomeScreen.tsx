// Pantalla principal de TravelKey
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList, Place } from '../../types';
import CardItem from '../../components/CardItem';
import SectionHeader from '../../components/SectionHeader';

// Importar datos mock
import hotelsData from '../../data/mockHotels.json';
import restaurantsData from '../../data/mockRestaurants.json';
import placesData from '../../data/mockPlaces.json';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    // Combinar todos los datos y seleccionar algunos destacados
    const allPlaces: Place[] = [...hotelsData, ...restaurantsData, ...placesData];
    setFeaturedPlaces(allPlaces.slice(0, 6));
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return today.toLocaleDateString('es-ES', options);
  };

  const handlePlacePress = (item: Place) => {
    navigation.navigate('Detail', { item });
  };

  const handleItineraryPress = () => {
    navigation.navigate('ItineraryForm');
  };

  const handleAlertsPress = () => {
    navigation.navigate('Alerts');
  };

  const handleTranslatorPress = () => {
    navigation.navigate('Translator');
  };

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <CardItem item={item} onPress={handlePlacePress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con saludo */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.name || 'Viajero'}</Text>
            <Text style={styles.date}>{getCurrentDate()}</Text>
          </View>
          
          <TouchableOpacity style={styles.alertsButton} onPress={handleAlertsPress}>
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#a0a0a0" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar destino o actividad..."
              placeholderTextColor="#a0a0a0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Botones de utilidades */}
        <View style={styles.utilitiesContainer}>
          <TouchableOpacity style={styles.utilityButton} onPress={handleItineraryPress}>
            <Ionicons name="map-outline" size={24} color="#0f3460" />
            <Text style={styles.utilityText}>Generar Itinerario</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.utilityButton} onPress={handleTranslatorPress}>
            <Ionicons name="language-outline" size={24} color="#0f3460" />
            <Text style={styles.utilityText}>Traductor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.utilityButton} onPress={handleAlertsPress}>
            <Ionicons name="shield-outline" size={24} color="#0f3460" />
            <Text style={styles.utilityText}>Alertas</Text>
          </TouchableOpacity>
        </View>

        {/* Mi Itinerario */}
        <SectionHeader
          title="Mi Itinerario"
          subtitle="Tus planes de viaje personalizados"
          onPress={handleItineraryPress}
        />
        
        <View style={styles.itineraryContainer}>
          <View style={styles.itineraryPlaceholder}>
            <Ionicons name="map-outline" size={48} color="#a0a0a0" />
            <Text style={styles.itineraryPlaceholderText}>
              Genera tu primer itinerario con IA
            </Text>
            <TouchableOpacity style={styles.createItineraryButton} onPress={handleItineraryPress}>
              <Text style={styles.createItineraryButtonText}>Crear Itinerario</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Experiencias Locales Destacadas */}
        <SectionHeader
          title="Experiencias Locales Destacadas"
          subtitle="Descubre lo mejor de cada destino"
        />

        <FlatList
          data={featuredPlaces}
          renderItem={renderPlaceItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placesList}
        />

        {/* Categorías */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Hospedaje' as any)}
          >
            <Ionicons name="bed-outline" size={32} color="#0f3460" />
            <Text style={styles.categoryText}>Hospedaje</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Gastronomía' as any)}
          >
            <Ionicons name="restaurant-outline" size={32} color="#0f3460" />
            <Text style={styles.categoryText}>Gastronomía</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Lugares' as any)}
          >
            <Ionicons name="camera-outline" size={32} color="#0f3460" />
            <Text style={styles.categoryText}>Lugares</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  date: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 4,
  },
  alertsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16213e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  utilitiesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  utilityButton: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  utilityText: {
    color: '#0f3460',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  itineraryContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  itineraryPlaceholder: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0f3460',
    borderStyle: 'dashed',
  },
  itineraryPlaceholderText: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  createItineraryButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  createItineraryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  placesList: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  categoryText: {
    color: '#0f3460',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default HomeScreen;
