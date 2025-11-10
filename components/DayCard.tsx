import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { ActivityTimeline, DayItinerary } from '../lib/services/geminiService';

interface DayCardProps {
  dayItinerary: DayItinerary;
  isExpanded: boolean;
}

export function DayCard({ dayItinerary, isExpanded }: DayCardProps) {
  const { day, title, activities, totalEstimatedCost, notes } = dayItinerary;

  // Calcular tiempo total del día
  const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <View style={styles.dayCard}>
      {/* Header del día */}
      <View style={styles.dayHeader}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayNumber}>Día {day}</Text>
        </View>
        <View style={styles.dayInfo}>
          <Text style={styles.dayTitle}>{title}</Text>
          <View style={styles.dayStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.statText}>
                {hours}h {minutes > 0 ? `${minutes}m` : ''}
              </Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="currency-usd" size={14} color={Colors.textSecondary} />
              <Text style={styles.statText}>S/. {totalEstimatedCost}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="map-marker" size={14} color={Colors.textSecondary} />
              <Text style={styles.statText}>{activities.length} actividades</Text>
            </View>
          </View>
        </View>
        <MaterialCommunityIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.blue}
        />
      </View>

      {/* Timeline expandido */}
      {isExpanded && (
        <ScrollView style={styles.timelineContainer} showsVerticalScrollIndicator={false}>
          {notes && (
            <View style={styles.notesContainer}>
              <MaterialCommunityIcons name="information" size={16} color={Colors.blue} />
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          )}

          {/* Timeline de actividades */}
          <View style={styles.timeline}>
            {activities.map((activity, index) => (
              <TimelineItem
                key={index}
                activity={activity}
                isLast={index === activities.length - 1}
              />
            ))}
          </View>

          {/* Resumen de costos */}
          <View style={styles.costSummary}>
            <Text style={styles.costSummaryTitle}>Resumen de Gastos del Día</Text>
            {activities.map((activity, index) => (
              <View key={index} style={styles.costItem}>
                <Text style={styles.costActivityName}>{activity.name}</Text>
                <Text style={styles.costAmount}>S/. {activity.estimatedCost}</Text>
              </View>
            ))}
            <View style={styles.costTotal}>
              <Text style={styles.costTotalLabel}>Total del día:</Text>
              <Text style={styles.costTotalAmount}>S/. {totalEstimatedCost}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

interface TimelineItemProps {
  activity: ActivityTimeline;
  isLast: boolean;
}

function TimelineItem({ activity, isLast }: TimelineItemProps) {
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('comida') || categoryLower.includes('restaurante')) {
      return 'silverware-fork-knife';
    }
    if (categoryLower.includes('arqueología') || categoryLower.includes('museo')) {
      return 'bank';
    }
    if (categoryLower.includes('experiencia') || categoryLower.includes('cultural')) {
      return 'culture';
    }
    if (categoryLower.includes('naturaleza')) {
      return 'tree';
    }
    return 'map-marker';
  };

  const getCategoryColor = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('comida')) return Colors.green;
    if (categoryLower.includes('arqueología')) return Colors.warning;
    if (categoryLower.includes('experiencia')) return Colors.blue;
    return Colors.grayMedium;
  };

  const hours = Math.floor(activity.duration / 60);
  const minutes = activity.duration % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}` : `${minutes}m`;

  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot}>
        <View style={[styles.timelineDotInner, { backgroundColor: getCategoryColor(activity.category) }]} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTime}>{activity.time}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(activity.category) }]}>
            <MaterialCommunityIcons
              name={getCategoryIcon(activity.category)}
              size={12}
              color={Colors.white}
            />
            <Text style={styles.categoryText}>{activity.category}</Text>
          </View>
        </View>
        <Text style={styles.timelineActivityName}>{activity.name}</Text>
        <Text style={styles.timelineDescription}>{activity.description}</Text>
        <View style={styles.timelineMeta}>
          {activity.location && (
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="map-marker" size={12} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{activity.location}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{durationText}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="currency-usd" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaText}>S/. {activity.estimatedCost}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
  },
  dayBadge: {
    backgroundColor: Colors.blue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    justifyContent: 'center',
  },
  dayNumber: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dayInfo: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  dayStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  timelineContainer: {
    maxHeight: 600,
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  timeline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDotInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.blue,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '500',
  },
  timelineActivityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  timelineMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  costSummary: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
  },
  costSummaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  costActivityName: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  costAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  costTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: Colors.blue,
  },
  costTotalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  costTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue,
  },
});

