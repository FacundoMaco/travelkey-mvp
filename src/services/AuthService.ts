// Servicio de autenticación para TravelKey
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { auth } from './firebase';
import { User } from '../types';

export class AuthService {
  // Registrar nuevo usuario
  static async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Crear objeto User personalizado
      const user: User = {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email || email,
        preferences: {
          interests: [],
          budget: 'medium',
          travelStyle: 'cultural'
        }
      };
      
      return user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Iniciar sesión
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Crear objeto User personalizado
      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Usuario',
        email: firebaseUser.email || email,
        preferences: {
          interests: [],
          budget: 'medium',
          travelStyle: 'cultural'
        }
      };
      
      return user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Cerrar sesión
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Error al cerrar sesión');
    }
  }

  // Obtener usuario actual
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Convertir FirebaseUser a User personalizado
  static firebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Usuario',
      email: firebaseUser.email || '',
      preferences: {
        interests: [],
        budget: 'medium',
        travelStyle: 'cultural'
      }
    };
  }

  // Manejo de errores de Firebase
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta más tarde';
      default:
        return 'Error de autenticación';
    }
  }
}
