'use client';

import { useEffect, useState } from 'react';

export default function CookiehubDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Helper function para manejar className de manera segura
  const getClassNameString = (element: Element): string => {
    if (!element.className) return '';
    if (typeof element.className === 'string') return element.className;
    if (typeof element.className === 'object') return element.className.toString();
    return '';
  };

  useEffect(() => {
    const logs: string[] = [];
    
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      logs.push('❌ Ejecutándose en servidor (SSR)');
      setDebugInfo(logs);
      return;
    }

    logs.push('✅ Ejecutándose en cliente (CSR)');

    // Verificar si CookieHub está disponible
    if ((window as any).CookieHub) {
      logs.push('✅ CookieHub está disponible en window.CookieHub');
    } else {
      logs.push('❌ CookieHub NO está disponible en window.CookieHub');
    }

    // Verificar si el script está en el DOM
    const script = document.querySelector('script[src*="cookiehub.net"]');
    if (script) {
      logs.push('✅ Script de CookieHub encontrado en DOM');
    } else {
      logs.push('❌ Script de CookieHub NO encontrado en DOM');
    }

    // Verificar si hay elementos del banner
    const banner = document.querySelector('[data-cookiehub]') || 
                   document.querySelector('.cookiehub-banner') ||
                   document.querySelector('#cookiehub-banner') ||
                   document.querySelector('[id*="cookiehub"]') ||
                   document.querySelector('[class*="cookiehub"]');
    
    if (banner) {
      logs.push('✅ Banner de CookieHub encontrado en DOM');
      logs.push(`   - Elemento: ${banner.tagName}`);
      logs.push(`   - Visible: ${banner.offsetHeight > 0 ? 'Sí' : 'No'}`);
      logs.push(`   - Estilo display: ${getComputedStyle(banner).display}`);
    } else {
      logs.push('❌ Banner de CookieHub NO encontrado en DOM');
      
      // Buscar todos los elementos que podrían ser el banner
      const allElements = document.querySelectorAll('*');
      const possibleBanners = Array.from(allElements).filter(el => 
        el.id?.toLowerCase().includes('cookie') ||
        el.className?.toLowerCase().includes('cookie') ||
        el.getAttribute('data-cookiehub')
      );
      
      if (possibleBanners.length > 0) {
        logs.push(`   - Elementos relacionados encontrados: ${possibleBanners.length}`);
        possibleBanners.forEach((el, i) => {
          logs.push(`     ${i + 1}. ${el.tagName} - ${el.id || getClassNameString(el) || 'sin id/class'}`);
        });
      }
    }

    // Verificar errores de red
    const checkNetworkErrors = () => {
      const performanceEntries = performance.getEntriesByType('resource');
      const cookiehubEntries = performanceEntries.filter(entry => 
        entry.name.includes('cookiehub.net')
      );
      
      if (cookiehubEntries.length > 0) {
        const entry = cookiehubEntries[0];
        if (entry.transferSize > 0) {
          logs.push(`✅ Script de CookieHub cargado correctamente (${entry.transferSize} bytes)`);
        } else {
          logs.push('❌ Script de CookieHub falló al cargar (0 bytes)');
        }
      } else {
        logs.push('❌ No se encontraron entradas de red para CookieHub');
      }
    };

    // Esperar un poco para que se carguen los recursos
    setTimeout(checkNetworkErrors, 2000);

    // Verificar si CookieHub tiene métodos de inicialización
    setTimeout(() => {
      if ((window as any).CookieHub) {
        const cookieHub = (window as any).CookieHub;
        logs.push('🔍 Métodos disponibles en CookieHub:');
        logs.push(`   - ${Object.getOwnPropertyNames(cookieHub).join(', ')}`);
        
        // Intentar inicializar manualmente si es posible
        if (typeof cookieHub.init === 'function') {
          logs.push('🔄 Intentando inicializar CookieHub manualmente...');
          try {
            cookieHub.init();
            logs.push('✅ Inicialización manual exitosa');
          } catch (error) {
            logs.push(`❌ Error en inicialización manual: ${error}`);
          }
        }
        
        if (typeof cookieHub.show === 'function') {
          logs.push('🔄 Intentando mostrar banner manualmente...');
          try {
            cookieHub.show();
            logs.push('✅ Mostrar banner manual exitoso');
          } catch (error) {
            logs.push(`❌ Error al mostrar banner: ${error}`);
          }
        }
      }
      
      setDebugInfo([...logs]);
    }, 3000);

    setDebugInfo(logs);
  }, []);

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const forceShowBanner = () => {
    console.log('🔄 Forzando mostrar banner...');
    
    // Limpiar cualquier consentimiento previo
    localStorage.removeItem('cookiehub');
    localStorage.removeItem('cookieconsent');
    localStorage.removeItem('cookie_consent');
    localStorage.removeItem('cookie-consent');
    sessionStorage.removeItem('cookiehub');
    sessionStorage.removeItem('cookieconsent');
    sessionStorage.removeItem('cookie_consent');
    
    // Recargar la página para forzar la aparición del banner
    window.location.reload();
  };

  const showCustomBanner = () => {
    console.log('🔄 Mostrando banner personalizado...');
    
    // Limpiar consentimiento personalizado
    localStorage.removeItem('cookie-consent');
    
    // Disparar evento para que el banner personalizado aparezca
    window.dispatchEvent(new CustomEvent('show-cookie-banner'));
    
    // También recargar para asegurar que aparezca
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const checkCookieHubConfig = () => {
    console.log('🔍 Verificando configuración de CookieHub...');
    
    // Verificar el script en el DOM
    const scripts = document.querySelectorAll('script[src*="cookiehub"]');
    console.log(`Scripts de CookieHub encontrados: ${scripts.length}`);
    scripts.forEach((script, i) => {
      console.log(`Script ${i + 1}:`, script.src);
    });
    
    // Verificar si el dominio está configurado correctamente
    const currentDomain = window.location.hostname;
    console.log(`Dominio actual: ${currentDomain}`);
    console.log('¿Es localhost?', currentDomain === 'localhost' || currentDomain === '127.0.0.1');
    
    // Verificar si hay elementos de banner ocultos
    const allElements = document.querySelectorAll('*');
    const cookieElements = Array.from(allElements).filter(el => 
      el.id?.toLowerCase().includes('cookie') ||
      getClassNameString(el).toLowerCase().includes('cookie') ||
      el.getAttribute('data-cookiehub')
    );
    
    console.log(`Elementos relacionados con cookies: ${cookieElements.length}`);
    cookieElements.forEach((el, i) => {
      const style = getComputedStyle(el);
      console.log(`Elemento ${i + 1}:`, {
        tag: el.tagName,
        id: el.id,
        className: getClassNameString(el),
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex
      });
    });
  };

  const testNetworkConnectivity = async () => {
    console.log('🌐 Testing network connectivity to CookieHub...');
    
    const testUrls = [
      'https://cookiehub.net/c2/f66471de.js',
      'https://cdn.cookiehub.eu/c2/f66471de.js'
    ];
    
    for (const url of testUrls) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`✅ ${url} - Status: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${url} - Error:`, error);
      }
    }
    
    // Probar carga directa del script
    try {
      const response = await fetch('https://cookiehub.net/c2/f66471de.js');
      const text = await response.text();
      console.log(`📊 Script content length: ${text.length} bytes`);
      if (text.length > 0) {
        console.log('✅ Script content is not empty');
        if (text.includes('CookieHub')) {
          console.log('✅ Script contains CookieHub code');
        }
      } else {
        console.log('❌ Script content is empty');
      }
    } catch (error) {
      console.log('❌ Failed to fetch script content:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-md text-sm z-50">
      <h3 className="font-bold mb-2">🐛 CookieHub Debug Info</h3>
      <div className="space-y-1 mb-3">
        {debugInfo.map((info, index) => (
          <div key={index}>{info}</div>
        ))}
      </div>
      
      <div className="space-y-2">
        <button
          onClick={forceShowBanner}
          className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
        >
          🔄 Forzar Mostrar Banner
        </button>
        <button
          onClick={checkCookieHubConfig}
          className="w-full bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
        >
          🔍 Verificar Configuración
        </button>
        <button
          onClick={testNetworkConnectivity}
          className="w-full bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-xs"
        >
          🌐 Test Conectividad
        </button>
        <button
          onClick={showCustomBanner}
          className="w-full bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-xs"
        >
          🍪 Mostrar Banner Personalizado
        </button>
      </div>
    </div>
  );
}
