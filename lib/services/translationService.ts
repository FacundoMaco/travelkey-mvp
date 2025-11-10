// Servicio de traducción usando Google Translate API
// Para usar este servicio, necesitas configurar una API key de Google Cloud Translate
// La API tiene un tier gratuito generoso: 500,000 caracteres/mes gratis

import Constants from 'expo-constants';

// Cachear el acceso a las variables de entorno para evitar accesos repetidos
const envVars = Constants.expoConfig?.extra || {};
const GOOGLE_TRANSLATE_API_KEY = envVars.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY || '';

// Mapeo de nombres de idiomas a códigos de Google Translate
const LANGUAGE_CODES: Record<string, string> = {
  'Español': 'es',
  'Inglés': 'en',
  'Francés': 'fr',
  'Alemán': 'de',
  'Italiano': 'it',
  'Portugués': 'pt',
};

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/**
 * Traduce texto usando Google Translate API
 * @param text - Texto a traducir
 * @param sourceLang - Idioma origen (nombre completo, ej: "Español")
 * @param targetLang - Idioma destino (nombre completo, ej: "Inglés")
 * @returns Promise con el texto traducido
 */
export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  if (!text.trim()) {
    throw new Error('El texto a traducir no puede estar vacío');
  }

  const sourceCode = LANGUAGE_CODES[sourceLang] || 'es';
  const targetCode = LANGUAGE_CODES[targetLang] || 'en';

  if (!GOOGLE_TRANSLATE_API_KEY) {
    // Si no hay API key configurada, retornar un mensaje de error amigable
    throw new Error(
      'Google Translate API no está configurada. Por favor, configura EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY en tu archivo .env'
    );
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceCode,
          target: targetCode,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Error en la traducción: ${response.status}`
      );
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || text;

    return {
      translatedText,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    };
  } catch (error: any) {
    // Si es un error de red o API, retornar un mensaje útil
    if (error.message.includes('API no está configurada')) {
      throw error;
    }
    throw new Error(`Error al traducir: ${error.message}`);
  }
}

/**
 * Obtiene la lista de idiomas disponibles
 */
export function getAvailableLanguages(): string[] {
  return Object.keys(LANGUAGE_CODES);
}

/**
 * Obtiene el código de idioma para Google Translate
 */
export function getLanguageCode(languageName: string): string {
  return LANGUAGE_CODES[languageName] || 'es';
}

