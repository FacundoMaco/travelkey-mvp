import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../lib/AuthContext';

export default function ItineraryScreen() {
  const { user } = useAuth();
  const [loadingAI, setLoadingAI] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleGenerateItinerary = async () => {
    setLoadingAI(true);
    try {
      // TODO: Call AI API to generate itinerary
      // For now, show a placeholder
      Alert.alert('IA', 'Generando itinerario personalizado basado en tu perfil...');
      
      // Simulate API call
      setTimeout(() => {
        setItinerary({
          destination: 'Chiclayo, Perú',
          days: 3,
          activities: [
            { day: 1, name: 'Museo Túmulo Real', category: 'Atracción' },
            { day: 1, name: 'Ceviche en Restaurante Local', category: 'Comida' },
            { day: 2, name: 'Chan Chan (Trujillo)', category: 'Arqueología' },
            { day: 3, name: 'Mercado de Moshoqueque', category: 'Experiencia Local' },
          ],
        });
        Alert.alert('Éxito', '¡Itinerario generado! Revisa los detalles abajo.');
      }, 2000);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSOS = () => {
    Alert.alert(
      'Botón SOS',
      '¿Necesitas ayuda urgente? Se notificará a emergencias locales en Perú.',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Confirmar SOS', onPress: () => Alert.alert('SOS Enviado', 'Emergencias locales contactadas.'), style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>¡Hola, {user?.displayName || 'Viajero'}!</Text>
          <Text style={styles.subtitle}>Tu Itinerario por Perú</Text>
        </View>

        {/* SOS and Alerts Bar */}
        <View style={styles.alertBar}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="#fff" />
            <Text style={styles.sosText}>SOS/Emergencia</Text>
          </TouchableOpacity>
          <View style={styles.alertIcon}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#00d4ff" />
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>2</Text>
            </View>
          </View>
        </View>

        {/* Safety Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Alertas de Seguridad</Text>
          <View style={styles.alertCard}>
            <Text style={styles.alertCardTitle}>Ruta de montaña cerrada temporalmente</Text>
            <Text style={styles.alertCardText}>Acceso a Catarata de Oquendo cerrado por mantenimiento. Reabrirá en 2 semanas.</Text>
          </View>
          <View style={styles.alertCard}>
            <Text style={styles.alertCardTitle}>Clima: Inicio de época de lluvias</Text>
            <Text style={styles.alertCardText}>Se esperan precipitaciones en la sierra. Llevar ropa impermeable para excursiones.</Text>
          </View>
        </View>

        {/* AI Generation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 Generador de Itinerario</Text>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleGenerateItinerary}
            disabled={loadingAI}
          >
            {loadingAI ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons name="brain" size={24} color="#fff" />
                <Text style={styles.aiButtonText}>Generar Itinerario con IA</Text>
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.aiSubtitle}>
            Descubre la auténtica Perú. Nuestro sistema genera itinerarios basados en tus intereses, presupuesto y preferencias de experiencias locales.
          </Text>
        </View>

        {/* Itinerary Display */}
        {itinerary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Tu Itinerario: {itinerary.destination}</Text>
            {itinerary.activities.map((activity, index) => (
              <View key={index} style={styles.activityCard}>
                <View style={styles.activityDay}>
                  <Text style={styles.activityDayText}>Día {activity.day}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.activityCategory}>{activity.category}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Expense Tracker Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Resumen de Gastos</Text>
          <View style={styles.expenseCard}>
            <Text style={styles.expenseLabel}>Gastado hoy:</Text>
            <Text style={styles.expenseAmount}>S/. 145.50</Text>
          </View>
          <View style={styles.expenseCard}>
            <Text style={styles.expenseLabel}>Presupuesto restante:</Text>
            <Text style={styles.expenseAmount}>S/. 354.50</Text>
          </View>
        </View>

        {/* Featured Local Experiences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Experiencias Auténticas de Perú</Text>
          <View style={styles.experienceCard}>
            <MaterialCommunityIcons name="leaf" size={24} color="#4caf50" />
            <View style={styles.experienceContent}>
              <Text style={styles.experienceName}>Comunidad Agrícola Chiclayano</Text>
              <View style={styles.tagContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Comunidad</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Sostenible</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.experienceCard}>
            <MaterialCommunityIcons name="store" size={24} color="#ff9800" />
            <View style={styles.experienceContent}>
              <Text style={styles.experienceName}>Taller de Cerámica Local</Text>
              <View style={styles.tagContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Pequeño Negocio</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Artesanía Local</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.experienceCard}>
            <MaterialCommunityIcons name="bowl-mix" size={24} color="#e74c3c" />
            <View style={styles.experienceContent}>
              <Text style={styles.experienceName}>Cooking Class - Gastronomía Peruana</Text>
              <View style={styles.tagContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Auténtico</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Cultural</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  alertBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0f3460',
    marginTop: 10,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  sosText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 12,
  },
  alertIcon: {
    position: 'relative',
    marginLeft: 15,
  },
  alertBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d4ff',
    marginBottom: 15,
  },
  alertCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  alertCardTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  alertCardText: {
    color: '#a0a0a0',
    fontSize: 12,
    lineHeight: 16,
  },
  aiButton: {
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00d4ff',
    marginBottom: 10,
  },
  aiButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  aiSubtitle: {
    color: '#a0a0a0',
    fontSize: 12,
    lineHeight: 16,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  activityDay: {
    backgroundColor: '#0f3460',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  activityDayText: {
    color: '#00d4ff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activityContent: {
    flex: 1,
    padding: 12,
  },
  activityName: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  activityCategory: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  expenseCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  expenseLabel: {
    color: '#a0a0a0',
  },
  expenseAmount: {
    color: '#00d4ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  experienceCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  experienceContent: {
    flex: 1,
    marginLeft: 12,
  },
  experienceName: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: '500',
  },
});
