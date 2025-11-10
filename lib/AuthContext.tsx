import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let isMounted = true;

    // Verificar que auth esté disponible
    if (!auth) {
      setIsLoading(false);
      return;
    }

    // Timeout muy corto para carga rápida (500ms máximo)
    timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 500);

    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!isMounted) return;
        
        // Limpiar timeout si recibimos respuesta
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });
    } catch (error) {
      // Si hay error, no bloquear la app
      if (isMounted) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
