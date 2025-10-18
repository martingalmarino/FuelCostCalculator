'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function CookiehubScript() {
  useEffect(() => {
    console.log('CookieHub component mounted');
    
    // Verificar si CookieHub se cargó correctamente
    const checkCookieHub = () => {
      if (typeof window !== 'undefined' && (window as any).CookieHub) {
        console.log('CookieHub loaded successfully');
        return true;
      }
      return false;
    };

    // Verificar inmediatamente y después de un delay
    if (!checkCookieHub()) {
      const timer = setTimeout(() => {
        if (!checkCookieHub()) {
          console.warn('CookieHub failed to load after 3 seconds');
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Script con estrategia beforeInteractive para cargar antes */}
      <Script
        id="cookiehub-script"
        strategy="beforeInteractive"
        src="https://cookiehub.net/c2/f66471de.js"
        onLoad={() => {
          console.log('✅ CookieHub script loaded successfully');
        }}
        onError={(e) => {
          console.error('❌ CookieHub script failed to load:', e);
        }}
      />
      
      {/* Script de respaldo con afterInteractive */}
      <Script
        id="cookiehub-script-fallback"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Verificar si CookieHub no se cargó y intentar cargarlo manualmente
            setTimeout(() => {
              if (typeof window !== 'undefined' && !window.CookieHub) {
                console.log('🔄 Attempting to load CookieHub manually...');
                
                // Intentar diferentes URLs
                const urls = [
                  'https://cookiehub.net/c2/f66471de.js',
                  'https://cdn.cookiehub.eu/c2/f66471de.js',
                  'https://cookiehub.com/c2/f66471de.js'
                ];
                
                let currentUrlIndex = 0;
                
                const tryLoadScript = () => {
                  if (currentUrlIndex >= urls.length) {
                    console.error('❌ All CookieHub URLs failed to load');
                    return;
                  }
                  
                  const script = document.createElement('script');
                  script.src = urls[currentUrlIndex];
                  script.async = true;
                  script.onload = function() {
                    console.log('✅ CookieHub loaded manually from:', urls[currentUrlIndex]);
                  };
                  script.onerror = function() {
                    console.log('❌ Failed to load from:', urls[currentUrlIndex]);
                    currentUrlIndex++;
                    tryLoadScript();
                  };
                  document.head.appendChild(script);
                };
                
                tryLoadScript();
              }
            }, 2000);
          `
        }}
      />
    </>
  );
}
