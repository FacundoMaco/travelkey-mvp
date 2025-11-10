# Guía de Configuración de Google Gemini API

## 🎯 Objetivo
Configurar Google Gemini API para generar itinerarios personalizados con IA en la app TakamuraMVP.

---

## 📋 Paso 1: Obtener API Key de Gemini

### 1.1 Crear cuenta en Google AI Studio
1. Ve a: https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Si es tu primera vez, acepta los términos de servicio

### 1.2 Generar API Key
1. Haz clic en **"Create API Key"** o **"Get API Key"**
2. Selecciona un proyecto existente o crea uno nuevo
3. Copia la API key que se genera (empieza con `AIza...`)

**⚠️ IMPORTANTE:** Guarda la API key de forma segura. No la compartas públicamente.

---

## 📋 Paso 2: Configurar en el Proyecto

### 2.1 Agregar API Key al archivo `.env`

Abre tu archivo `.env` en la raíz del proyecto y actualiza esta línea:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui
```

Reemplaza `tu_api_key_aqui` con tu API key real:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...tu_key_aqui
```

### 2.2 Verificar configuración

El archivo `.env` debería verse así:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyAkSSUfPrpCYk1lt_i-5Vy7-CtmcKs3gKQ
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=travelkey-app-cc402.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=travelkey-app-cc402
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=travelkey-app-cc402.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=230524118081
EXPO_PUBLIC_FIREBASE_APP_ID=1:230524118081:web:bff37008c785a4a437d2c0
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-N2JWHXFYY1
EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=AIzaSyBAhRKkYiQxbFPUWuZHP5vgv24tko5YsWg
EXPO_PUBLIC_GEMINI_API_KEY=TU_API_KEY_AQUI
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=tu_mapbox_token_aqui
```

---

## 📋 Paso 3: Reiniciar el Servidor

Después de agregar la API key, reinicia el servidor con caché limpia:

```bash
npx expo start -c
```

---

## 📋 Paso 4: Probar la Funcionalidad

### 4.1 Probar Generación de Itinerario

1. Abre la app en tu dispositivo/simulador
2. Ve a la pestaña **"Mi Itinerario"**
3. Haz clic en el botón **"Generar Itinerario con IA"**
4. Deberías ver:
   - Si Gemini está configurado: "Generando itinerario personalizado con Gemini..."
   - Si no está configurado: "API no configurada" y un itinerario de ejemplo

### 4.2 Verificar en Consola

Si quieres verificar que la API key se cargó correctamente, puedes agregar temporalmente:

```typescript
import Constants from 'expo-constants';
console.log('Gemini API Key:', Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_API_KEY?.substring(0, 20));
```

---

## 💰 Límites y Costos

### Tier Gratuito
- **15 RPM** (Requests Per Minute)
- **1,500 RPD** (Requests Per Day)
- **32,000 TPM** (Tokens Per Minute)

### Pagado
- Después del tier gratuito, los precios son por uso
- Consulta: https://ai.google.dev/pricing

**Nota:** Para un MVP, el tier gratuito es más que suficiente.

---

## 🔒 Seguridad

### ✅ Buenas Prácticas

1. **Nunca commits la API key** al repositorio
   - El archivo `.env` debería estar en `.gitignore`
   - Usa `env.example` como template

2. **Restringe la API key** en Google Cloud Console
   - Ve a: https://console.cloud.google.com/apis/credentials
   - Edita tu API key
   - Agrega restricciones de aplicación/HTTP referrer

3. **Monitorea el uso**
   - Revisa regularmente el uso en Google Cloud Console
   - Configura alertas si excedes límites

---

## 🐛 Troubleshooting

### Error: "Gemini API no está configurada"
- Verifica que `EXPO_PUBLIC_GEMINI_API_KEY` esté en `.env`
- Asegúrate de reiniciar el servidor con `-c`
- Verifica que no haya espacios antes/después del `=`

### Error: "API key inválida"
- Verifica que copiaste la key completa
- Asegúrate de que no haya espacios extra
- Verifica que la key esté activa en Google AI Studio

### Error: "Rate limit exceeded"
- Has excedido el límite de requests
- Espera unos minutos antes de intentar de nuevo
- Considera implementar caché para reducir llamadas

### Error: "Permission denied"
- Verifica que la API key tenga permisos para Gemini API
- Habilita "Generative Language API" en Google Cloud Console

---

## 📚 Recursos Adicionales

- **Documentación oficial:** https://ai.google.dev/docs
- **Pricing:** https://ai.google.dev/pricing
- **API Reference:** https://ai.google.dev/api

---

## ✅ Checklist de Configuración

- [ ] API key obtenida de Google AI Studio
- [ ] API key agregada al archivo `.env`
- [ ] Servidor reiniciado con `-c`
- [ ] Funcionalidad probada en la app
- [ ] Verificado que no hay errores en consola
- [ ] `.env` está en `.gitignore` (no en el repo)

---

**Última actualización:** Noviembre 2024

