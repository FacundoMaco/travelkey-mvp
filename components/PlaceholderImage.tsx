import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface PlaceholderImageProps extends ImageProps {
  placeholder?: boolean;
  fadeInDuration?: number;
  priority?: 'low' | 'normal' | 'high';
}

/**
 * Componente PlaceholderImage optimizado
 * Soporta lazy loading, caché de imágenes y placeholder fallback
 */
export const PlaceholderImage = React.memo(({
  source,
  style,
  placeholder = true,
  fadeInDuration = 300,
  priority = 'normal',
  onLoad,
  onError,
  ...props
}: PlaceholderImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    onLoad?.({} as any);
  }, [onLoad]);

  const handleImageError = useCallback((error: any) => {
    setImageError(true);
    setImageLoading(false);
    onError?.(error);
  }, [onError]);

  // Si no hay source o hay error, mostrar placeholder
  if (!source || imageError || (typeof source === 'object' && !('uri' in source))) {
    return (
      <View style={[styles.placeholder, style]}>
        <MaterialCommunityIcons name="image-off" size={40} color={Colors.grayMedium} />
      </View>
    );
  }

  return (
    <View style={style}>
      {imageLoading && placeholder && (
        <View style={[StyleSheet.absoluteFill, styles.loadingPlaceholder]}>
          <MaterialCommunityIcons name="image-outline" size={40} color={Colors.grayMedium} />
        </View>
      )}
      <Image
        {...props}
        source={source}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
        progressiveRenderingEnabled
        cache="force-cache"
        fadeDuration={fadeInDuration}
      />
    </View>
  );
}, (prevProps, nextProps) => {
  // Comparación personalizada para memoización
  // Retorna true si son iguales (no re-renderizar)
  return (
    prevProps.source === nextProps.source &&
    prevProps.style === nextProps.style &&
    prevProps.placeholder === nextProps.placeholder
  );
});

PlaceholderImage.displayName = 'PlaceholderImage';

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  loadingPlaceholder: {
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 10,
  },
});
