// Servicio para generar itinerarios usando Google Gemini API
// Documentación: https://ai.google.dev/docs

import Constants from 'expo-constants';

// Cachear el acceso a las variables de entorno para evitar accesos repetidos
const envVars = Constants.expoConfig?.extra || {};
const GEMINI_API_KEY = envVars.EXPO_PUBLIC_GEMINI_API_KEY || '';
// Intentar con diferentes modelos y versiones de API
// Modelos disponibles actualmente (actualizado 2024)
const GEMINI_MODELS = [
  'gemini-1.5-pro-latest',  // Versión más reciente
  'gemini-1.5-flash-latest', // Versión más reciente
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro',
];
const GEMINI_API_VERSIONS = ['v1', 'v1beta'];

export interface GeminiItineraryRequest {
  destination: string;
  days: number;
  interests?: string[];
  budget?: 'low' | 'medium' | 'high';
  region?: string;
}

export interface ActivityTimeline {
  time: string; // "09:00", "14:30", etc.
  name: string;
  category: string;
  description: string;
  estimatedCost: number; // En soles peruanos
  duration: number; // En minutos
  location?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: ActivityTimeline[];
  totalEstimatedCost: number;
  notes?: string;
}

export interface GeminiItineraryResponse {
  destination: string;
  days: number;
  dayItineraries: DayItinerary[];
  totalEstimatedCost: number;
}

/**
 * Genera un itinerario usando Google Gemini API
 * Intenta múltiples modelos y versiones hasta encontrar uno que funcione
 */
export async function generateItineraryWithGemini(
  request: GeminiItineraryRequest
): Promise<GeminiItineraryResponse> {
  // Si no hay API key configurada, usar fallback inmediatamente
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'tu_gemini_api_key_aqui') {
    console.warn('Gemini API no configurada. Usando itinerario de ejemplo.');
    return generateFallbackItinerary(request, '');
  }

  // Construir el prompt para Gemini
  const prompt = buildItineraryPrompt(request);

  // Intentar con diferentes combinaciones de modelos y versiones
  let lastError: Error | null = null;
  let attempts = 0;
  
  for (const version of GEMINI_API_VERSIONS) {
    for (const model of GEMINI_MODELS) {
      attempts++;
      const apiUrl = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent`;
      
      try {
        const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error?.message || `Error ${response.status}`;
          
          // Log del intento fallido (solo en desarrollo)
          if (__DEV__) {
            console.log(`Intento ${attempts}: ${version}/${model} - ${errorMessage}`);
          }
          
          // Si el modelo no existe, continuar con el siguiente (sin lanzar error)
          if (errorMessage.includes('not found') || errorMessage.includes('not supported')) {
            lastError = new Error(errorMessage);
            continue; // Intentar siguiente modelo
          }
          
          // Para otros errores, también continuar con el siguiente modelo
          lastError = new Error(errorMessage);
          continue;
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
          lastError = new Error('Respuesta vacía de Gemini');
          continue; // Intentar siguiente modelo
        }

        // Éxito - log del modelo que funcionó
        if (__DEV__) {
          console.log(`✅ Modelo funcionando: ${version}/${model}`);
        }

        // Parsear la respuesta de Gemini y convertirla al formato esperado
        return parseGeminiResponse(generatedText, request);
      } catch (error: any) {
        // Cualquier error, continuar con el siguiente modelo
        lastError = error;
        if (__DEV__) {
          console.log(`Intento ${attempts}: ${version}/${model} - Error: ${error.message}`);
        }
        continue;
      }
    }
  }

  // Si llegamos aquí, ningún modelo funcionó
  // Usar fallback con itinerario básico (NO lanzar error)
  console.warn(`⚠️ Se intentaron ${attempts} combinaciones de modelos/versiones. Ninguna funcionó. Usando itinerario de ejemplo.`);
  if (lastError) {
    console.warn('Último error:', lastError.message);
  }
  return generateFallbackItinerary(request, '');
}

/**
 * Construye el prompt para Gemini basado en la solicitud
 */
function buildItineraryPrompt(request: GeminiItineraryRequest): string {
  const { destination, days, interests = [], budget = 'medium', region = 'Perú' } = request;

  const interestsText = interests.length > 0 ? `Intereses específicos: ${interests.join(', ')}.` : 'Intereses generales en turismo auténtico.';
  const budgetText = 
    budget === 'low' ? 'Presupuesto económico: máximo S/. 80-100 por día' :
    budget === 'high' ? 'Presupuesto alto: S/. 300-500 por día' :
    'Presupuesto medio: S/. 150-250 por día';

  return `Eres un experto en turismo auténtico y responsable en ${region}. Genera un itinerario detallado y coherente de ${days} días para visitar ${destination}.

CONTEXTO Y REQUISITOS:
- ${interestsText}
- ${budgetText}
- Enfócate en experiencias auténticas, locales y sostenibles
- Prioriza pequeños negocios, comunidades locales y restaurantes familiares
- Considera tiempos realistas de transporte entre lugares
- Crea una narrativa coherente día a día
- Incluye horarios realistas para cada actividad
- Estima costos realistas en soles peruanos (S/.)

ESTRUCTURA REQUERIDA:
Para cada día, incluye:
- Un título descriptivo del día
- Actividades organizadas por horario (desde temprano hasta tarde)
- Descripción breve de cada actividad
- Costo estimado por actividad
- Duración estimada en minutos
- Categoría (Atracción, Comida, Experiencia Local, Arqueología, Naturaleza, etc.)

FORMATO DE RESPUESTA (JSON estricto):
{
  "destination": "${destination}",
  "days": ${days},
  "dayItineraries": [
    {
      "day": 1,
      "title": "Título descriptivo del día 1",
      "activities": [
        {
          "time": "08:00",
          "name": "Nombre de la actividad",
          "category": "Categoría",
          "description": "Descripción detallada de la actividad",
          "estimatedCost": 50,
          "duration": 120,
          "location": "Ubicación específica"
        }
      ],
      "totalEstimatedCost": 150,
      "notes": "Notas adicionales del día (opcional)"
    }
  ],
  "totalEstimatedCost": 450
}

IMPORTANTE:
- Usa horarios realistas y secuenciales (09:00, 11:30, 14:00, etc.)
- Cada día debe tener al menos 3-4 actividades principales
- Los costos deben sumar aproximadamente el presupuesto por día
- Mantén coherencia geográfica (no saltar entre lugares lejanos en el mismo día)
- Incluye tiempo para almuerzo y descanso

Responde SOLO con el JSON válido, sin texto adicional ni markdown.`;
}

/**
 * Parsea la respuesta de Gemini y la convierte al formato esperado
 */
function parseGeminiResponse(
  geminiText: string,
  request: GeminiItineraryRequest
): GeminiItineraryResponse {
  try {
    // Limpiar el texto de posibles markdown o código
    let cleanedText = geminiText.trim();
    
    // Remover bloques de código markdown si existen
    cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Intentar extraer JSON de la respuesta
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validar estructura
      if (parsed.dayItineraries && Array.isArray(parsed.dayItineraries)) {
        return {
          destination: parsed.destination || request.destination,
          days: parsed.days || request.days,
          dayItineraries: parsed.dayItineraries.map((day: any) => ({
            day: day.day,
            title: day.title || `Día ${day.day}`,
            activities: (day.activities || []).map((act: any) => ({
              time: act.time || '09:00',
              name: act.name || 'Actividad',
              category: act.category || 'General',
              description: act.description || '',
              estimatedCost: act.estimatedCost || 0,
              duration: act.duration || 60,
              location: act.location || '',
            })),
            totalEstimatedCost: day.totalEstimatedCost || 0,
            notes: day.notes,
          })),
          totalEstimatedCost: parsed.totalEstimatedCost || 0,
        };
      }
    }

    // Si no hay JSON válido, generar un itinerario básico basado en el texto
    return generateFallbackItinerary(request, geminiText);
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    // Si falla el parsing, usar fallback
    return generateFallbackItinerary(request, geminiText);
  }
}

/**
 * Genera un itinerario básico cuando Gemini no retorna JSON válido
 */
function generateFallbackItinerary(
  request: GeminiItineraryRequest,
  geminiText: string
): GeminiItineraryResponse {
  const budgetPerDay = request.budget === 'low' ? 100 : request.budget === 'high' ? 300 : 200;
  
  // Generar días con actividades estructuradas
  const dayItineraries: DayItinerary[] = [];
  
  for (let day = 1; day <= request.days; day++) {
    const activities: ActivityTimeline[] = [
      {
        time: '09:00',
        name: day === 1 ? 'Llegada y Check-in' : 'Desayuno en lugar local',
        category: day === 1 ? 'Llegada' : 'Comida',
        description: day === 1 ? 'Llegada al destino y acomodación' : 'Desayuno típico de la región',
        estimatedCost: day === 1 ? 0 : 25,
        duration: day === 1 ? 60 : 60,
        location: request.destination,
      },
      {
        time: '11:00',
        name: day === 1 ? 'Museo Túmulo Real' : day === 2 ? 'Chan Chan (Trujillo)' : 'Mercado Artesanal',
        category: 'Arqueología',
        description: 'Visita a sitio arqueológico importante',
        estimatedCost: 30,
        duration: 120,
        location: request.destination,
      },
      {
        time: '14:00',
        name: 'Almuerzo en Restaurante Local',
        category: 'Comida',
        description: 'Almuerzo de comida típica peruana',
        estimatedCost: 45,
        duration: 90,
        location: request.destination,
      },
      {
        time: '16:00',
        name: day === request.days ? 'Compras y Despedida' : 'Experiencia Cultural Local',
        category: 'Experiencia Local',
        description: 'Actividad cultural auténtica',
        estimatedCost: 40,
        duration: 120,
        location: request.destination,
      },
    ];

    dayItineraries.push({
      day,
      title: `Día ${day}: Exploración de ${request.destination}`,
      activities,
      totalEstimatedCost: activities.reduce((sum, act) => sum + act.estimatedCost, 0),
      notes: day === 1 ? 'Día de llegada y orientación' : undefined,
    });
  }

  return {
    destination: request.destination,
    days: request.days,
    dayItineraries,
    totalEstimatedCost: dayItineraries.reduce((sum, day) => sum + day.totalEstimatedCost, 0),
  };
}

/**
 * Verifica si Gemini API está configurada
 */
export function isGeminiConfigured(): boolean {
  return !!(GEMINI_API_KEY && GEMINI_API_KEY !== 'tu_gemini_api_key_aqui');
}

