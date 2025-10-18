'use client';

import { useEffect } from 'react';

export default function CookiehubConfig() {
  useEffect(() => {
    // Configuración adicional para CookieHub
    const configureCookieHub = () => {
      console.log('🔧 Configurando CookieHub...');

      // Verificar si estamos en localhost (problema común)
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost');

      if (isLocalhost) {
        console.log('⚠️ Detectado localhost - CookieHub podría no funcionar correctamente');
        console.log('💡 Sugerencia: Prueba en el dominio de producción o usa un túnel como ngrok');
      }

      // Configurar variables de entorno para CookieHub si es necesario
      if (typeof window !== 'undefined') {
        // Asegurar que no hay conflictos con otros scripts de cookies
        const existingCookieScripts = document.querySelectorAll('script[src*="cookie"]');
        if (existingCookieScripts.length > 1) {
          console.log('⚠️ Detectados múltiples scripts de cookies - podría haber conflictos');
        }

        // Verificar si hay bloqueadores de anuncios activos
        const adBlockDetected = () => {
          const testAd = document.createElement('div');
          testAd.innerHTML = '&nbsp;';
          testAd.className = 'adsbox';
          testAd.style.position = 'absolute';
          testAd.style.left = '-999px';
          document.body.appendChild(testAd);
          
          setTimeout(() => {
            const isBlocked = testAd.offsetHeight === 0;
            if (isBlocked) {
              console.log('⚠️ Bloqueador de anuncios detectado - podría estar bloqueando CookieHub');
            }
            document.body.removeChild(testAd);
          }, 100);
        };

        adBlockDetected();

        // Configurar CSP headers si es necesario (solo para desarrollo)
        if (process.env.NODE_ENV === 'development') {
          console.log('💡 Para desarrollo, asegúrate de que tu CSP permita:');
          console.log('   - script-src: https://cookiehub.net');
          console.log('   - connect-src: https://cookiehub.net');
        }
      }
    };

    // Ejecutar configuración
    configureCookieHub();

    // También ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', configureCookieHub);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', configureCookieHub);
    };
  }, []);

  return null; // Este componente no renderiza nada
}
