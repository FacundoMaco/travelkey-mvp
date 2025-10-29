// User Profile Types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  age: number;
  interests: string[]; // 'culture', 'gastronomy', 'adventure', 'nature', 'history', 'archaeology', etc.
  budget: 'low' | 'medium' | 'high'; // Budget range in Peruvian Soles
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  region?: string; // 'Chiclayo', 'Cusco', 'Lima', etc.
}

// Itinerary Types
export interface Activity {
  id: string;
  name: string;
  description: string;
  category: 'accommodation' | 'restaurant' | 'activity' | 'attraction' | 'archaeological';
  tags: string[]; // 'sostenible', 'community', 'small-business', 'local-craft', 'authentic-peruvian'
  location: {
    latitude: number;
    longitude: number;
    address: string;
    region: string; // 'Chiclayo', 'Trujillo', etc.
  };
  rating: number;
  price: number; // In Peruvian Soles (S/.)
  duration?: number; // in minutes
  imageUrl?: string;
  cuisine?: string; // For restaurants: 'Peruvian', 'Seafood', 'Traditional', etc.
}

export interface ItineraryDay {
  day: number;
  date: Date;
  activities: Activity[];
  totalExpense: number; // In Peruvian Soles
  notes?: string;
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  destination: string; // e.g., 'Chiclayo', 'Norte Peruano'
  startDate: Date;
  endDate: Date;
  days: ItineraryDay[];
  generatedByAI: boolean;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

// Expense Tracking
export interface Expense {
  id: string;
  userId: string;
  itineraryId: string;
  date: Date;
  category: string; // 'Food', 'Transport', 'Accommodation', 'Activities', etc.
  amount: number; // In Peruvian Soles
  description: string;
  currency: string; // 'PEN' for Peruvian Soles
}

// Security Alert
export interface SecurityAlert {
  id: string;
  location: string; // e.g., 'Chiclayo', 'Carretera a Trujillo'
  severity: 'low' | 'medium' | 'high';
  message: string;
  affectedRegion: string;
  createdAt: Date;
}

// Local Experience (for authentic tourism)
export interface LocalExperience {
  id: string;
  name: string;
  description: string;
  category: 'craft' | 'food' | 'community' | 'agriculture' | 'cultural';
  tags: string[]; // 'authentic', 'sustainable', 'small-business', 'community-run'
  location: string;
  rating: number;
  price: number; // In Peruvian Soles
  imageUrl?: string;
}
