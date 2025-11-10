import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../constants/Colors';
import { Accommodation, LocalExperience, Restaurant } from '../lib/types';

const CHICLAYO_COORDINATES = {
  latitude: -6.7704,
  longitude: -79.8417,
};

interface NativeMapViewProps {
  filteredPlaces: (Accommodation | Restaurant | LocalExperience)[];
  userLocation: { latitude: number; longitude: number } | null;
  onMarkerPress: (place: Accommodation | Restaurant | LocalExperience) => void;
  onCenterOnUser: () => void;
  getMarkerColor: (place: Accommodation | Restaurant | LocalExperience) => string;
  styles: any;
}

export function NativeMapView({
  filteredPlaces,
  userLocation,
  onMarkerPress,
  onCenterOnUser,
  getMarkerColor,
  styles,
}: NativeMapViewProps) {
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...CHICLAYO_COORDINATES,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={false}
      >
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.location.coordinates.latitude,
              longitude: place.location.coordinates.longitude,
            }}
            onPress={() => onMarkerPress(place)}
          >
            <View style={[styles.markerContainer, { backgroundColor: getMarkerColor(place) }]}>
              <MaterialCommunityIcons
                name={
                  'type' in place ? 'bed' :
                  'cuisine' in place ? 'silverware-fork-knife' :
                  'map-marker'
                }
                size={20}
                color={Colors.white}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.centerButton} onPress={onCenterOnUser}>
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color={Colors.blue} />
      </TouchableOpacity>
    </>
  );
}

