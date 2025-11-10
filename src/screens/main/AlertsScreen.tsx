// Pantalla de alertas de seguridad de TravelKey
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '../../types';

// Importar datos mock
import alertsData from '../../data/mockAlerts.json';

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    setAlerts(alertsData);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      loadAlerts();
      setRefreshing(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'warning';
      case 'medium':
        return 'alert-circle';
      case 'low':
        return 'information-circle';
      default:
        return 'help-circle';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security':
        return 'shield-outline';
      case 'weather':
        return 'cloud-outline';
      case 'traffic':
        return 'car-outline';
      case 'health':
        return 'medical-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security':
        return '#e74c3c';
      case 'weather':
        return '#3498db';
      case 'traffic':
        return '#f39c12';
      case 'health':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'security':
        return 'Seguridad';
      case 'weather':
        return 'Clima';
      case 'traffic':
        return 'Tráfico';
      case 'health':
        return 'Salud';
      default:
        return 'General';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const categories = [
    { key: null, name: 'Todas', icon: 'list-outline' },
    { key: 'security', name: 'Seguridad', icon: 'shield-outline' },
    { key: 'weather', name: 'Clima', icon: 'cloud-outline' },
    { key: 'traffic', name: 'Tráfico', icon: 'car-outline' },
    { key: 'health', name: 'Salud', icon: 'medical-outline' },
  ];

  const filteredAlerts = selectedCategory 
    ? alerts.filter(alert => alert.category === selectedCategory)
    : alerts;

  const renderAlertItem = ({ item }: { item: Alert }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <View style={styles.alertCategory}>
          <Ionicons
            name={getCategoryIcon(item.category) as any}
            size={20}
            color={getCategoryColor(item.category)}
          />
          <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
            {getCategoryName(item.category)}
          </Text>
        </View>
        
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
          <Ionicons
            name={getSeverityIcon(item.severity) as any}
            size={14}
            color="#ffffff"
          />
          <Text style={styles.severityText}>
            {item.severity === 'high' ? 'Alta' : 
             item.severity === 'medium' ? 'Media' : 'Baja'}
          </Text>
        </View>
      </View>

      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      
      <View style={styles.alertFooter}>
        <View style={styles.alertInfo}>
          <Ionicons name="time-outline" size={14} color="#a0a0a0" />
          <Text style={styles.alertDate}>{formatDate(item.date)}</Text>
        </View>
        
        {item.location && (
          <View style={styles.alertInfo}>
            <Ionicons name="location-outline" size={14} color="#a0a0a0" />
            <Text style={styles.alertLocation}>{item.location}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderCategoryFilter = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.key && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Ionicons
        name={item.icon as any}
        size={16}
        color={selectedCategory === item.key ? '#ffffff' : '#0f3460'}
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item.key && styles.categoryButtonTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Alertas de Seguridad</Text>
        <Text style={styles.subtitle}>
          Mantente informado sobre situaciones importantes en tu destino
        </Text>
      </View>

      {/* Filtros de categoría */}
      <FlatList
        data={categories}
        renderItem={renderCategoryFilter}
        keyExtractor={(item) => item.key || 'all'}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Lista de alertas */}
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alertsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0f3460"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#27ae60" />
            <Text style={styles.emptyTitle}>No hay alertas</Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory 
                ? `No hay alertas de ${getCategoryName(selectedCategory).toLowerCase()}`
                : 'No hay alertas activas en este momento'
              }
            </Text>
          </View>
        }
      />
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
    marginRight: 8,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#0f3460',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#0f3460',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  alertsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  alertCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0f3460',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  severityText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertDate: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  alertLocation: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});

export default AlertsScreen;
