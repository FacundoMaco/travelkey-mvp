import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa Interactivo</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <MaterialCommunityIcons name="map" size={80} color="#00d4ff" />
        <Text style={styles.placeholderText}>Mapa de Chiclayo y Alrededores</Text>
        <Text style={styles.placeholderSubtext}>
          Próximamente: Lugares turísticos, hospedajes y restaurantes con filtros de autenticidad peruana
        </Text>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filtros de Autenticidad Peruana</Text>
        <View style={styles.filterGrid}>
          <View style={styles.filterCard}>
            <MaterialCommunityIcons name="leaf" size={32} color="#4caf50" />
            <Text style={styles.filterLabel}>Sostenible</Text>
          </View>
          <View style={styles.filterCard}>
            <MaterialCommunityIcons name="people" size={32} color="#2196f3" />
            <Text style={styles.filterLabel}>Comunidad</Text>
          </View>
          <View style={styles.filterCard}>
            <MaterialCommunityIcons name="store" size={32} color="#ff9800" />
            <Text style={styles.filterLabel}>Pequeño Negocio</Text>
          </View>
          <View style={styles.filterCard}>
            <MaterialCommunityIcons name="heart" size={32} color="#e74c3c" />
            <Text style={styles.filterLabel}>Artesanía Local</Text>
          </View>
        </View>
      </View>
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
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    margin: 20,
    borderRadius: 12,
  },
  placeholderText: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  placeholderSubtext: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  filterSection: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d4ff',
    marginBottom: 15,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  filterLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});
