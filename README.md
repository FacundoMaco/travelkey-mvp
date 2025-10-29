# 🌍 TravelKey MVP - Chiclayo, Perú Edition

**Itinerario Personalizado con Inteligencia Artificial para Viajeros Independientes Progresistas**

Una aplicación móvil revolucionaria que genera itinerarios inteligentes basados en tus intereses, presupuesto y preferencias de autenticidad, enfocada en experiencias locales auténticas en Perú.

## 📱 Características Principales

### ✅ Autenticación y Perfil
- Registro e inicio de sesión con Firebase
- Perfil personal: edad, intereses y presupuesto en Soles Peruanos
- Intereses específicos: Arqueología, Gastronomía Peruana, Aventura, Naturaleza, Artesanía, Cultura Local

### ✅ Itinerario Personalizado con IA
- Generación automática de itinerarios inteligentes
- Basado en tus preferencias y presupuesto
- Enfoque en experiencias auténticas y sostenibles

### ✅ Seguridad y Emergencias
- Botón SOS/Emergencia
- Alertas de seguridad en tiempo real
- Información sobre condiciones locales y rutas cerradas

### ✅ Gestor de Gastos
- Seguimiento de gastos en Soles Peruanos
- Resumen diario y presupuesto restante
- Moneda localizada para Perú

### ✅ Experiencias Locales Auténticas
- Filtros de autenticidad: Sostenible, Comunidad, Pequeño Negocio, Artesanía Local
- Experiencias destacadas:
  - Comunidades agrícolas locales
  - Talleres de artesanía tradicional
  - Clases de gastronomía peruana

### ✅ Mapa Interactivo
- Lugares turísticos en Chiclayo y alrededores
- Hospedajes y restaurantes con filtros de autenticidad
- Integración con geolocalización (próximo)

### ✅ Traductor Offline
- Frases comunes en Perú
- Traductor offline para comunicarse sin barreras de idioma
- Frases específicas como "¿Cuánto cuesta?", "Ceviche, por favor", etc.

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v20.19.4 o superior recomendado)
- npm o yarn
- Expo CLI instalado globalmente (opcional pero recomendado)

### Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/travelkey-mvp.git
cd travelkey-mvp
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Inicia el servidor de desarrollo:**
```bash
npm start
```

4. **Accede a la app:**

**Opción A: Tunnel Mode (Recomendado para colaboración a distancia)**
```bash
npm start -- --tunnel
```
- Escanea el código QR con Expo Go desde tu teléfono
- Funciona sin necesidad de estar en la misma red WiFi

**Opción B: Local Network (Misma red WiFi)**
```bash
npm start
```
- Escoge la opción local cuando se te pida
- Escanea el código QR desde tu teléfono en la misma red WiFi

**Opción C: Emulador/Simulador**
```bash
npm start
```
- Presiona `i` para iOS Simulator (macOS)
- Presiona `a` para Android Emulator

---

## 📁 Estructura del Proyecto

```
TakamuraMVPapp/
├── app/
│   ├── (auth)/              # Pantallas de autenticación
│   │   ├── login.tsx        # Login
│   │   ├── register.tsx     # Registro
│   │   ├── welcome.tsx      # Bienvenida
│   │   └── _layout.tsx      # Layout de auth
│   ├── (tabs)/              # Navegación principal
│   │   ├── itinerary.tsx    # Mi Itinerario
│   │   ├── profile.tsx      # Perfil Usuario
│   │   ├── map.tsx          # Mapa Interactivo
│   │   ├── translator.tsx   # Traductor
│   │   └── _layout.tsx      # Tab Navigation
│   ├── _layout.tsx          # Root Layout
│   └── index.tsx            # Home
├── lib/
│   ├── firebase.ts          # Configuración Firebase
│   ├── AuthContext.tsx      # Context de Autenticación
│   └── types.ts             # Tipos TypeScript
├── components/              # Componentes reutilizables
├── constants/               # Constantes (colores, etc)
├── assets/                  # Imágenes y fuentes
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Variables de Entorno

Actualmente, la configuración de Firebase está embebida en el código. Para mayor seguridad en producción, crea un archivo `.env`:

```env
# No crear en desarrollo, Firebase ya está configurado
```

---

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para apps móviles
- **Expo** - Plataforma para desarrollo de React Native
- **Expo Router** - Navegación basada en archivos
- **Firebase** - Autenticación y base de datos
- **TypeScript** - Tipado estático
- **Material Community Icons** - Iconografía

---

## 📋 Próximas Características

- [ ] Integración con Firestore para persistencia de datos
- [ ] API de IA para generación inteligente de itinerarios (OpenAI/Claude)
- [ ] Google Maps API para mapas interactivos
- [ ] Google Translate API para traductor completo
- [ ] Notificaciones push para alertas
- [ ] Sistema de comentarios y reseñas
- [ ] Compartir itinerarios con amigos
- [ ] Modo offline para datos críticos
- [ ] Versión web

---

## 🤝 Colaboración

Para colaborar en remoto:

1. **Amigo en otra red WiFi:**
   ```bash
   npm start -- --tunnel
   ```
   - Envía el código QR por WhatsApp/Email
   - Tu amigo escanea con Expo Go

2. **En la misma red WiFi:**
   ```bash
   npm start
   ```
   - Escoge "local" cuando se te pida
   - Tu amigo escanea el código QR

---

## 🐛 Troubleshooting

### "Port 8081 is running this app in another window"
```bash
# Mata el proceso anterior
npx expo start --clear
```

### La app se congela en carga
- Limpia la caché de Expo: `npm start -- --clear`
- Reinicia Expo Go en tu teléfono
- Asegúrate de que tienes conexión a internet

### Firebase error "auth/configuration-not-found"
- Verifica que el archivo `lib/firebase.ts` esté correctamente importado
- Recarga la app completamente

---

## 📞 Soporte

Para preguntas o issues:
1. Revisa el archivo `lib/firebase.ts` si hay problemas de autenticación
2. Verifica que Node.js v20+ esté instalado
3. Intenta con `npm install` nuevamente

---

## 📄 Licencia

Este proyecto es parte del MVP de TravelKey.

---

## ✨ Créditos

Desarrollado con ❤️ para viajeros independientes progresistas que buscan experiencias auténticas en Perú.

**Destination:** Chiclayo, Perú 🇵🇪
