// Tipos principales de la aplicación TravelKey

export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  interests: string[];
  budget: 'low' | 'medium' | 'high';
  travelStyle: 'adventure' | 'cultural' | 'relaxation' | 'business';
}

export interface Place {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: 'hotel' | 'restaurant' | 'attraction';
  address: string;
  phone?: string;
  website?: string;
}

export interface Hotel extends Place {
  category: 'hotel';
  amenities: string[];
  roomTypes: string[];
  checkIn: string;
  checkOut: string;
}

export interface Restaurant extends Place {
  category: 'restaurant';
  cuisine: string[];
  openingHours: string;
  priceRange: string;
}

export interface Attraction extends Place {
  category: 'attraction';
  openingHours: string;
  ticketPrice: number;
  duration: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
  type: 'hotel' | 'restaurant' | 'attraction' | 'transport';
  placeId?: string;
}

export interface Itinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  days: ItineraryDay[];
  totalCost: number;
  createdAt: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'weather' | 'traffic' | 'health';
  severity: 'low' | 'medium' | 'high';
  date: string;
  location?: string;
}

export interface Expense {
  id: string;
  concept: string;
  amount: number;
  category: 'accommodation' | 'food' | 'transport' | 'entertainment' | 'shopping' | 'other';
  date: string;
  location?: string;
}

// Tipos de navegación
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Detail: { item: Place };
  ItineraryForm: undefined;
  ItineraryDetail: { itinerary: Itinerary };
  Translator: undefined;
  Alerts: undefined;
  Profile: undefined;
  Preferences: undefined;
  Expenses: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reservations: undefined;
  Map: undefined;
  Profile: undefined;
};
