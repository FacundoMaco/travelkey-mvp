import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
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
import { DayCard } from '../../components/DayCard';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../lib/AuthContext';
import { GeminiItineraryResponse, generateItineraryWithGemini, isGeminiConfigured } from '../../lib/services/geminiService';
import { ErrorHandler } from '../../lib/services/errorHandler';

export default function ItineraryScreen() {
  const { user } = useAuth();
  const [loadingAI, setLoadingAI] = useState(false);
  const [itinerary, setItinerary] = useState<GeminiItineraryResponse | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const handleGenerateItinerary = useCallback(async () => {
    setLoadingAI(true);
    setExpandedDay(null); // Reset expanded day
    try {
      // Verificar si Gemini está configurado
      if (!isGeminiConfigured()) {
        Alert.alert(
          'API no configurada',
          'Gemini API no está configurada. Verifica que EXPO_PUBLIC_GEMINI_API_KEY esté en tu archivo .env',
          [{ text: 'OK' }]
        );
        setLoadingAI(false);
        return;
      }

      // Generar con Gemini API
      const result = await generateItineraryWithGemini({
        destination: 'Chiclayo, Perú',
        days: 3,
        interests: ['Arqueología', 'Gastronomía Peruana', 'Cultura Local'],
        budget: 'medium',
        region: 'Norte del Perú',
      });

      setItinerary(result);
      // Expandir el primer día por defecto
      if (result.dayItineraries.length > 0) {
        setExpandedDay(1);
      }
      // El itinerario se generó exitosamente (puede ser de Gemini o fallback)
      // No mostrar alerta - el usuario ya ve el resultado
    } catch (error: any) {
      // Solo mostrar error si realmente falló todo (incluido el fallback)
      // Pero esto no debería pasar porque generateItineraryWithGemini siempre retorna algo
      console.error('Error inesperado generando itinerario:', error);
      const appError = ErrorHandler.formatGenericError(error, 'generación de itinerario');
      ErrorHandler.log(appError);
      Alert.alert('Error', 'No se pudo generar el itinerario. Por favor, intenta de nuevo.');
    } finally {
      setLoadingAI(false);
    }
  }, []);

  const toggleDay = useCallback((day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  }, [expandedDay]);

  const handleSOS = useCallback(() => {
    Alert.alert(
      'Botón SOS',
      '¿Necesitas ayuda urgente? Se notificará a emergencias locales en Perú.',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Confirmar SOS', onPress: () => Alert.alert('SOS Enviado', 'Emergencias locales contactadas.'), style: 'destructive' },
      ]
    );
  }, []);

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
            <MaterialCommunityIcons name="alert-circle" size={20} color={Colors.white} />
            <Text style={styles.sosText}>SOS/Emergencia</Text>
          </TouchableOpacity>
          <View style={styles.alertIcon}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.blue} />
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
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <MaterialCommunityIcons name="brain" size={24} color={Colors.white} />
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
            <View style={styles.itineraryHeader}>
              <View>
                <Text style={styles.sectionTitle}>📍 Tu Itinerario: {itinerary.destination}</Text>
                <Text style={styles.itinerarySubtitle}>
                  {itinerary.days} días • Total estimado: S/. {itinerary.totalEstimatedCost}
                </Text>
              </View>
            </View>

            {/* Days List */}
            {itinerary.dayItineraries.map((dayItinerary) => (
              <TouchableOpacity
                key={dayItinerary.day}
                onPress={() => toggleDay(dayItinerary.day)}
                activeOpacity={0.8}
              >
                <DayCard
                  dayItinerary={dayItinerary}
                  isExpanded={expandedDay === dayItinerary.day}
                />
              </TouchableOpacity>
            ))}

            {/* Total Summary */}
            <View style={styles.totalSummary}>
              <View style={styles.totalSummaryRow}>
                <Text style={styles.totalSummaryLabel}>Costo Total Estimado:</Text>
                <Text style={styles.totalSummaryAmount}>S/. {itinerary.totalEstimatedCost}</Text>
              </View>
              <View style={styles.totalSummaryRow}>
                <Text style={styles.totalSummaryLabel}>Promedio por día:</Text>
                <Text style={styles.totalSummaryAmount}>
                  S/. {Math.round(itinerary.totalEstimatedCost / itinerary.days)}
                </Text>
              </View>
            </View>
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
            <MaterialCommunityIcons name="leaf" size={24} color={Colors.green} />
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
            <MaterialCommunityIcons name="store" size={24} color={Colors.warning} />
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
            <MaterialCommunityIcons name="bowl-mix" size={24} color={Colors.error} />
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
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  alertBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.blue,
    marginTop: 10,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  sosText: {
    color: Colors.white,
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
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue,
    marginBottom: 15,
  },
  alertCard: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  alertCardTitle: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertCardText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  aiButton: {
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.blueDark,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  aiButtonText: {
    color: Colors.white,
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  aiSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activityDay: {
    backgroundColor: Colors.blue,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  activityDayText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  activityContent: {
    flex: 1,
    padding: 12,
  },
  activityName: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityCategory: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  expenseCard: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  expenseLabel: {
    color: Colors.textSecondary,
  },
  expenseAmount: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontSize: 16,
  },
  experienceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  experienceContent: {
    flex: 1,
    marginLeft: 12,
  },
  experienceName: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
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
    borderRadius: 4,
  },
  tagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '500',
  },
  itineraryHeader: {
    marginBottom: 20,
  },
  itinerarySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  totalSummary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  totalSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalSummaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  totalSummaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue,
  },
});
