// Configuración de Firebase para TravelKey (MODO DEMO)
// Para producción, reemplazar con credenciales reales

// Mock de Firebase para demostración
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Simular que no hay usuario autenticado inicialmente
    callback(null);
    return () => {}; // unsubscribe function
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Simular login exitoso
    const mockUser = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Usuario Demo'
    };
    return { user: mockUser };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    // Simular registro exitoso
    const mockUser = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Usuario Demo'
    };
    return { user: mockUser };
  },
  signOut: async () => {
    // Simular logout
    return Promise.resolve();
  }
};

export const db = null; // No se usa en modo demo

export default null;
