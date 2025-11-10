import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado para debounce
 * Demora la ejecución de una función hasta que el usuario deje de realizar acciones
 * @param callback - Función a ejecutar
 * @param delay - Tiempo de espera en ms (default: 300ms)
 */
export function useDebounce<T>(callback: (value: T) => void, delay: number = 300) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = (value: T) => {
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Establecer nuevo timeout
    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);
  };

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook personalizado para debounce de valores
 * Retrasa la actualización de un valor hasta que el usuario deje de escribir
 * @param value - Valor a debounce
 * @param delay - Tiempo de espera en ms (default: 300ms)
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
