/**
 * Servicio centralizado para manejo de errores
 * Proporciona un formato consistente para mostrar errores a través de la app
 */

export interface AppError {
  code: string;
  message: string;
  details?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export class ErrorHandler {
  /**
   * Formatea un error de traducción
   */
  static formatTranslationError(error: any): AppError {
    if (error.message?.includes('API no está configurada')) {
      return {
        code: 'TRANSLATION_API_NOT_CONFIGURED',
        message: 'Servicio de traducción no configurado',
        details: 'Por favor, configura EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY en tu archivo .env',
        severity: 'warning',
      };
    }

    if (error.message?.includes('403') || error.message?.includes('401')) {
      return {
        code: 'TRANSLATION_AUTH_ERROR',
        message: 'Error de autenticación',
        details: 'Verifica que tu API key sea válida',
        severity: 'error',
      };
    }

    if (error.message?.includes('429')) {
      return {
        code: 'TRANSLATION_RATE_LIMIT',
        message: 'Demasiadas solicitudes',
        details: 'Intenta más tarde',
        severity: 'warning',
      };
    }

    return {
      code: 'TRANSLATION_ERROR',
      message: 'Error al traducir',
      details: error.message || 'Error desconocido',
      severity: 'error',
    };
  }

  /**
   * Formatea un error de autenticación
   */
  static formatAuthError(error: any): AppError {
    const message = error?.message || '';

    if (message.includes('user-not-found')) {
      return {
        code: 'AUTH_USER_NOT_FOUND',
        message: 'Usuario no encontrado',
        details: 'Verifica tu correo electrónico',
        severity: 'error',
      };
    }

    if (message.includes('wrong-password')) {
      return {
        code: 'AUTH_WRONG_PASSWORD',
        message: 'Contraseña incorrecta',
        details: 'Verifica tu contraseña',
        severity: 'error',
      };
    }

    if (message.includes('email-already-in-use')) {
      return {
        code: 'AUTH_EMAIL_IN_USE',
        message: 'El email ya está registrado',
        details: 'Intenta con otro correo o inicia sesión',
        severity: 'warning',
      };
    }

    return {
      code: 'AUTH_ERROR',
      message: 'Error de autenticación',
      details: message,
      severity: 'error',
    };
  }

  /**
   * Formatea un error de ubicación
   */
  static formatLocationError(error: any): AppError {
    const message = error?.message || '';

    if (message.includes('permission')) {
      return {
        code: 'LOCATION_PERMISSION_DENIED',
        message: 'Permiso de ubicación denegado',
        details: 'Activa el permiso de ubicación en la configuración',
        severity: 'warning',
      };
    }

    return {
      code: 'LOCATION_ERROR',
      message: 'Error al obtener ubicación',
      details: message,
      severity: 'error',
    };
  }

  /**
   * Formatea un error genérico
   */
  static formatGenericError(error: any, context?: string): AppError {
    const message = typeof error === 'string' ? error : error?.message || 'Error desconocido';

    return {
      code: 'GENERIC_ERROR',
      message: context ? `Error en ${context}` : 'Error inesperado',
      details: message,
      severity: 'error',
    };
  }

  /**
   * Obtiene el mensaje de usuario amigable
   */
  static getUserMessage(error: AppError): string {
    return error.details || error.message;
  }

  /**
   * Registra el error en consola (para desarrollo)
   */
  static log(error: AppError): void {
    console.error(`[${error.severity.toUpperCase()}] ${error.code}:`, error.details || error.message);
  }
}
