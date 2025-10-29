import { Accommodation, LocalExperience, Restaurant } from './types';

export const chiclayoAccommodations: Accommodation[] = [
  {
    id: 'hostal-1',
    name: 'Hostal Señor de Sipán',
    description: 'Alojamiento tradicional en el corazón de Chiclayo, cerca de museos arqueológicos',
    location: {
      address: 'Jr. Elías Aguirre 456',
      city: 'Chiclayo',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.7704,
        longitude: -79.8417
      }
    },
    contact: {
      phone: '+51 074 223456',
      email: 'reservas@hostalsipan.pe'
    },
    rating: 4.5,
    priceRange: 'low',
    tags: ['small-business', 'local', 'authentic', 'community'],
    imageUrl: 'https://example.com/hostal-sipan.jpg',
    type: 'hostel',
    amenities: ['WiFi', 'Desayuno', 'Recepción 24h'],
    roomTypes: ['Individual', 'Doble', 'Compartido'],
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    id: 'hotel-1',
    name: 'Hotel Boutique Moche',
    description: 'Experiencia de alojamiento que celebra la cultura moche de la región',
    location: {
      address: 'Av. Luis Gonzales 789',
      city: 'Chiclayo',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.7711,
        longitude: -79.8402
      }
    },
    contact: {
      phone: '+51 074 567890',
      website: 'www.hotelmoche.pe'
    },
    rating: 4.7,
    priceRange: 'medium',
    tags: ['sustainable', 'cultural', 'boutique'],
    imageUrl: 'https://example.com/hotel-moche.jpg',
    type: 'hotel',
    amenities: ['Piscina', 'Gimnasio', 'Restaurante', 'Spa'],
    roomTypes: ['Estándar', 'Superior', 'Suite'],
    checkIn: '15:00',
    checkOut: '12:00'
  }
];

export const chiclayoRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'La Casona del Pimentel',
    description: 'Restaurante tradicional que ofrece los mejores platos de la gastronomía norteña',
    location: {
      address: 'Calle Balta 123',
      city: 'Chiclayo',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.7694,
        longitude: -79.8436
      }
    },
    contact: {
      phone: '+51 074 345678',
      reservations: true
    },
    rating: 4.8,
    priceRange: 'medium',
    tags: ['local', 'traditional', 'authentic'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/travelkey-app-cc402.appspot.com/o/placeholders%2Frestaurant-1.jpg?alt=media&token=placeholder-url-1',
    cuisine: ['Peruana', 'Norteña'],
    specialties: ['Arroz con Pato', 'Ceviche', 'Seco de Cabrito'],
    openingHours: {
      open: '12:00',
      close: '22:00'
    },
    reservations: true
  },
  {
    id: 'rest-2',
    name: 'Sabores de Lambayeque',
    description: 'Cocina contemporánea que rescata recetas ancestrales',
    location: {
      address: 'Av. Grau 456',
      city: 'Chiclayo',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.7725,
        longitude: -79.8392
      }
    },
    contact: {
      phone: '+51 074 901234'
    },
    rating: 4.6,
    priceRange: 'high',
    tags: ['small-business', 'gourmet', 'local-ingredients'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/travelkey-app-cc402.appspot.com/o/placeholders%2Frestaurant-2.jpg?alt=media&token=placeholder-url-2',
    cuisine: ['Peruana', 'Fusión'],
    specialties: ['Causa Norteña', 'Tiradito de Pescado', 'Postres Tradicionales'],
    openingHours: {
      open: '18:00',
      close: '23:30'
    },
    reservations: true
  }
];

export const chiclayoExperiences: LocalExperience[] = [
  {
    id: 'exp-1',
    name: 'Taller de Cerámica de Lambayeque',
    description: 'Aprende técnicas ancestrales de cerámica moche con artesanos locales',
    location: {
      address: 'Pueblo de Túcume',
      city: 'Túcume',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.8897,
        longitude: -79.8272
      }
    },
    contact: {
      phone: '+51 074 567123',
      email: 'tallermoche@artesania.pe'
    },
    rating: 4.9,
    priceRange: 'low',
    tags: ['cultural', 'workshop', 'authentic', 'community'],
    imageUrl: 'https://example.com/taller-ceramica.jpg',
    category: 'workshop',
    duration: 180,
    groupSize: {
      min: 2,
      max: 10
    },
    language: ['Español', 'Inglés'],
    includedServices: ['Materiales', 'Guía Experto', 'Refrigerio']
  },
  {
    id: 'exp-2',
    name: 'Tour Gastronómico en Mercado de Moshoqueque',
    description: 'Descubre los sabores auténticos de Chiclayo con un recorrido por el mercado más tradicional',
    location: {
      address: 'Mercado de Moshoqueque',
      city: 'Chiclayo',
      region: 'Lambayeque',
      coordinates: {
        latitude: -6.7704,
        longitude: -79.8417
      }
    },
    contact: {
      phone: '+51 074 234567'
    },
    rating: 4.7,
    priceRange: 'medium',
    tags: ['food', 'local', 'authentic', 'cultural'],
    imageUrl: 'https://example.com/mercado-moshoqueque.jpg',
    category: 'tour',
    duration: 240,
    groupSize: {
      min: 4,
      max: 12
    },
    language: ['Español'],
    includedServices: ['Guía Local', 'Degustaciones', 'Transporte']
  }
];
