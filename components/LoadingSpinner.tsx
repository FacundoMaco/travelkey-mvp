import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface LoadingSpinnerProps {
  visible?: boolean;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

/**
 * Componente LoadingSpinner reutilizable
 * Muestra un indicador de carga consistente en toda la app
 */
export const LoadingSpinner = React.memo(({
  visible = true,
  size = 'large',
  color = Colors.blue,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  if (!visible) return null;

  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
});
