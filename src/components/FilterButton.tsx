// Componente de botón de filtro
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterButtonProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isActive?: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  icon,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isActive ? '#ffffff' : '#0f3460'}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, isActive && styles.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: '#0f3460',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f3460',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default FilterButton;
