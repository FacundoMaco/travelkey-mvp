// Pantalla de detalle de itinerario de TravelKey
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Itinerary } from '../../types';

interface ItineraryDetailScreenProps {
  route: RouteProp<RootStackParamList, 'ItineraryDetail'>;
}

const ItineraryDetailScreen: React.FC<ItineraryDetailScreenProps> = ({ route }) => {
  const { itinerary } = route.params;

  // Mock data para demostración
  const mockItinerary: Itinerary = {
    id: '1',
    destination: 'Cusco, Perú',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    budget: 800,
    interests: ['Cultura', 'Historia', 'Aventura'],
    days: [
      {
        day: 1,
        date: '2024-02-15',
        activities: [
          {
            id: '1',
            time: '09:00',
            title: 'Llegada a Cusco',
            description: 'Check-in en hotel y aclimatación',
            location: 'Hotel en Centro Histórico',
            duration: '2 horas',
            cost: 0,
            type: 'hotel',
          },
          {
            id: '2',
            time: '14:00',
            title: 'City Tour por Cusco',
            description: 'Recorrido por los principales sitios históricos',
            location: 'Centro Histórico de Cusco',
            duration: '4 horas',
            cost: 50,
            type: 'attraction',
          },
        ],
      },
      {
        day: 2,
        date: '2024-02-16',
        activities: [
          {
            id: '3',
            time: '06:00',
            title: 'Visita a Machu Picchu',
            description: 'Tour completo a la ciudadela inca',
            location: 'Machu Picchu',
            duration: '8 horas',
            cost: 150,
            type: 'attraction',
          },
        ],
      },
    ],
    totalCost: 800,
    createdAt: '2024-01-15T10:00:00Z',
  };

  const currentItinerary = itinerary || mockItinerary;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header del itinerario */}
        <View style={styles.header}>
          <Text style={styles.title}>{currentItinerary.destination}</Text>
          <Text style={styles.dates}>
            {currentItinerary.startDate} - {currentItinerary.endDate}
          </Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Presupuesto:</Text>
            <Text style={styles.budgetAmount}>${currentItinerary.budget}</Text>
          </View>
        </View>

        {/* Intereses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intereses</Text>
          <View style={styles.interestsContainer}>
            {currentItinerary.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Días del itinerario */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinerario Diario</Text>
          {currentItinerary.days.map((day) => (
            <View key={day.day} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>Día {day.day}</Text>
                <Text style={styles.dayDate}>{day.date}</Text>
              </View>
              
              {day.activities.map((activity) => (
                <View key={activity.id} style={styles.activityContainer}>
                  <View style={styles.activityTime}>
                    <Text style={styles.timeText}>{activity.time}</Text>
                  </View>
                  
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    <View style={styles.activityDetails}>
                      <View style={styles.activityDetailItem}>
                        <Ionicons name="location-outline" size={14} color="#0f3460" />
                        <Text style={styles.activityDetailText}>{activity.location}</Text>
                      </View>
                      <View style={styles.activityDetailItem}>
                        <Ionicons name="time-outline" size={14} color="#0f3460" />
                        <Text style={styles.activityDetailText}>{activity.duration}</Text>
                      </View>
                      {activity.cost > 0 && (
                        <View style={styles.activityDetailItem}>
                          <Ionicons name="card-outline" size={14} color="#0f3460" />
                          <Text style={styles.activityDetailText}>${activity.cost}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Resumen de costos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Costos</Text>
          <View style={styles.costSummary}>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Total Estimado:</Text>
              <Text style={styles.costAmount}>${currentItinerary.totalCost}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#0f3460" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>Compartir</Text>
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
  header: {
    padding: 20,
    backgroundColor: '#16213e',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  dates: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 12,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f3460',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  dayContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dayDate: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  activityContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityTime: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f3460',
    backgroundColor: '#16213e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityDetailText: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  costSummary: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  costAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f3460',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#16213e',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: '#0f3460',
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0f3460',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default ItineraryDetailScreen;
