'use client';

import { useEffect } from 'react';

export default function CookiehubAlternative() {
  useEffect(() => {
    const tryAlternativeApproaches = () => {
      console.log('🔄 Intentando enfoques alternativos para CookieHub...');
      
      // Enfoque 1: Verificar si el problema es de dominio
      const currentDomain = window.location.hostname;
      console.log(`📍 Dominio actual: ${currentDomain}`);
      
      if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
        console.log('⚠️ PROBLEMA DETECTADO: CookieHub no funciona en localhost');
        console.log('💡 SOLUCIÓN: Prueba en el dominio de producción o usa un túnel como ngrok');
        
        // Crear un banner temporal para desarrollo
        createTemporaryBanner();
        return;
      }
      
      // Enfoque 2: Verificar si hay bloqueadores de anuncios
      const adBlockDetected = detectAdBlocker();
      if (adBlockDetected) {
        console.log('⚠️ PROBLEMA DETECTADO: Bloqueador de anuncios activo');
        console.log('💡 SOLUCIÓN: Desactiva el bloqueador de anuncios temporalmente');
      }
      
      // Enfoque 3: Verificar CSP (Content Security Policy)
      checkCSP();
      
      // Enfoque 4: Probar carga con diferentes métodos
      testDifferentLoadingMethods();
    };
    
    const detectAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-999px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);
        return isBlocked;
      }, 100);
      
      return false;
    };
    
    const checkCSP = () => {
      console.log('🔍 Verificando Content Security Policy...');
      
      // Verificar si hay errores de CSP en la consola
      const originalError = console.error;
      console.error = (...args) => {
        if (args[0] && args[0].includes && args[0].includes('Content Security Policy')) {
          console.log('⚠️ PROBLEMA DETECTADO: CSP bloqueando CookieHub');
          console.log('💡 SOLUCIÓN: Añade cookiehub.net a tu CSP');
        }
        originalError.apply(console, args);
      };
    };
    
    const testDifferentLoadingMethods = () => {
      console.log('🧪 Probando diferentes métodos de carga...');
      
      // Método 1: Fetch + eval (no recomendado pero funcional)
      fetch('https://cookiehub.net/c2/f66471de.js')
        .then(response => response.text())
        .then(code => {
          if (code.length > 0) {
            console.log('✅ Script descargado correctamente via fetch');
            console.log(`📊 Tamaño: ${code.length} bytes`);
            
            // Intentar ejecutar el código
            try {
              eval(code);
              console.log('✅ Script ejecutado via eval');
            } catch (error) {
              console.log('❌ Error ejecutando script:', error);
            }
          } else {
            console.log('❌ Script vacío via fetch');
          }
        })
        .catch(error => {
          console.log('❌ Error en fetch:', error);
        });
    };
    
    const createTemporaryBanner = () => {
      console.log('🏗️ Creando banner temporal para desarrollo...');
      
      const banner = document.createElement('div');
      banner.id = 'temp-cookie-banner';
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #333;
        color: white;
        padding: 15px;
        text-align: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      
      banner.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto;">
          <p style="margin: 0 0 10px 0;">
            🍪 This site uses cookies. CookieHub doesn't work on localhost.
          </p>
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            Accept
          </button>
        </div>
      `;
      
      document.body.appendChild(banner);
    };
    
    // Ejecutar después de un delay
    setTimeout(tryAlternativeApproaches, 2000);
  }, []);

  return null;
}
