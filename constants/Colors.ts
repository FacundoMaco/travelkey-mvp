// Paleta de colores modo claro - Blanco, Azul y Verde
export const Colors = {
  // Colores principales
  white: '#FFFFFF',
  blue: '#4A90E2',
  blueDark: '#1976D2',
  green: '#4CAF50',
  
  // Grises
  grayLight: '#F5F5F5',
  grayMedium: '#9E9E9E',
  grayDark: '#424242',
  
  // Fondos
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  
  // Texto
  textPrimary: '#424242',
  textSecondary: '#9E9E9E',
  
  // Elementos de UI
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Estados
  error: '#E74C3C',
  success: '#4CAF50',
  warning: '#FF9800',
};

// Mantener compatibilidad con el sistema anterior
const tintColorLight = Colors.blue;

export default {
  light: {
    text: Colors.textPrimary,
    background: Colors.background,
    tint: tintColorLight,
    tabIconDefault: Colors.grayMedium,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  },
};
