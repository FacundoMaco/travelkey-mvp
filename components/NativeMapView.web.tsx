// Versión web de NativeMapView - no renderiza nada porque el componente principal maneja web
import React from 'react';
import { Accommodation, LocalExperience, Restaurant } from '../lib/types';

interface NativeMapViewProps {
  filteredPlaces: (Accommodation | Restaurant | LocalExperience)[];
  userLocation: { latitude: number; longitude: number } | null;
  onMarkerPress: (place: Accommodation | Restaurant | LocalExperience) => void;
  onCenterOnUser: () => void;
  getMarkerColor: (place: Accommodation | Restaurant | LocalExperience) => string;
  styles: any;
}

export function NativeMapView(props: NativeMapViewProps) {
  // En web, este componente no se renderiza porque map.tsx maneja la vista web directamente
  return null;
}

