'use client';

import { useEffect } from 'react';

export default function CookiehubScriptLoader() {
  useEffect(() => {
    const loadCookieHubScript = () => {
      console.log('🔄 CookieHub Script Loader iniciado...');
      
      // Verificar si ya está cargado
      if (typeof window !== 'undefined' && (window as any).CookieHub) {
        console.log('✅ CookieHub ya está disponible');
        return;
      }
      
      // URLs a probar en orden
      const urls = [
        'https://cookiehub.net/c2/f66471de.js',
        'https://cdn.cookiehub.eu/c2/f66471de.js',
        'https://cookiehub.com/c2/f66471de.js'
      ];
      
      let currentIndex = 0;
      
      const tryLoadScript = () => {
        if (currentIndex >= urls.length) {
          console.error('❌ Todas las URLs de CookieHub fallaron');
          return;
        }
        
        const url = urls[currentIndex];
        console.log(`🔄 Intentando cargar desde: ${url}`);
        
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log(`✅ CookieHub cargado exitosamente desde: ${url}`);
          
          // Verificar que realmente se cargó
          setTimeout(() => {
            if ((window as any).CookieHub) {
              console.log('✅ CookieHub está disponible en window.CookieHub');
            } else {
              console.log('⚠️ Script cargado pero CookieHub no está disponible');
            }
          }, 1000);
        };
        
        script.onerror = (error) => {
          console.log(`❌ Falló al cargar desde: ${url}`, error);
          currentIndex++;
          tryLoadScript();
        };
        
        document.head.appendChild(script);
      };
      
      // Esperar un poco antes de intentar cargar
      setTimeout(tryLoadScript, 1000);
    };
    
    // Ejecutar inmediatamente
    loadCookieHubScript();
    
    // También ejecutar después de que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadCookieHubScript);
    }
    
    return () => {
      document.removeEventListener('DOMContentLoaded', loadCookieHubScript);
    };
  }, []);

  return null;
}
