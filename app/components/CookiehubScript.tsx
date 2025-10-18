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
      
    </>
  );
}
