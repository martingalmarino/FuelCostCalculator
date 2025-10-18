'use client';

import { useEffect } from 'react';

export default function CookiehubForceInit() {
  useEffect(() => {
    // Helper function para manejar className de manera segura
    const getClassNameString = (element: Element): string => {
      if (!element.className) return '';
      if (typeof element.className === 'string') return element.className;
      if (typeof element.className === 'object') return element.className.toString();
      return '';
    };

    // Función para intentar inicializar CookieHub de diferentes maneras
    const forceInitCookieHub = () => {
      console.log('🔄 Intentando inicializar CookieHub forzadamente...');

      // Método 1: Verificar si CookieHub está disponible y llamar métodos
      if (typeof window !== 'undefined' && (window as any).CookieHub) {
        const cookieHub = (window as any).CookieHub;
        console.log('CookieHub disponible:', cookieHub);

        // Intentar diferentes métodos de inicialización
        const methods = ['init', 'show', 'initialize', 'load', 'start'];
        
        methods.forEach(method => {
          if (typeof cookieHub[method] === 'function') {
            try {
              console.log(`Intentando ${method}...`);
              cookieHub[method]();
              console.log(`✅ ${method} ejecutado exitosamente`);
            } catch (error) {
              console.log(`❌ Error en ${method}:`, error);
            }
          }
        });
      }

      // Método 2: Disparar eventos que CookieHub podría estar escuchando
      const events = ['DOMContentLoaded', 'load', 'cookiehub:init', 'cookiehub:show'];
      events.forEach(eventName => {
        try {
          const event = new Event(eventName);
          window.dispatchEvent(event);
          console.log(`✅ Evento ${eventName} disparado`);
        } catch (error) {
          console.log(`❌ Error disparando ${eventName}:`, error);
        }
      });

      // Método 3: Verificar si hay elementos ocultos y hacerlos visibles
      const possibleBanners = document.querySelectorAll('[id*="cookie"], [data-cookiehub]');
      
      // También buscar por className de manera segura
      const allElements = document.querySelectorAll('*');
      const classNameBanners = Array.from(allElements).filter(el => 
        getClassNameString(el).toLowerCase().includes('cookie')
      );
      
      const allBanners = [...possibleBanners, ...classNameBanners];
      
      allBanners.forEach((banner, index) => {
        console.log(`Banner ${index + 1}:`, banner);
        const style = getComputedStyle(banner);
        console.log(`  - Display: ${style.display}`);
        console.log(`  - Visibility: ${style.visibility}`);
        console.log(`  - Opacity: ${style.opacity}`);
        console.log(`  - Z-index: ${style.zIndex}`);
        
        // Si está oculto, intentar hacerlo visible
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          console.log(`  - Intentando hacer visible banner ${index + 1}`);
          (banner as HTMLElement).style.display = 'block';
          (banner as HTMLElement).style.visibility = 'visible';
          (banner as HTMLElement).style.opacity = '1';
          (banner as HTMLElement).style.zIndex = '9999';
        }
      });

      // Método 4: Buscar en el localStorage/sessionStorage por configuraciones
      const storageKeys = ['cookiehub', 'cookieconsent', 'cookie_consent'];
      storageKeys.forEach(key => {
        const localValue = localStorage.getItem(key);
        const sessionValue = sessionStorage.getItem(key);
        if (localValue) console.log(`localStorage.${key}:`, localValue);
        if (sessionValue) console.log(`sessionStorage.${key}:`, sessionValue);
      });
    };

    // Ejecutar inmediatamente
    forceInitCookieHub();

    // Ejecutar después de un delay para asegurar que todo esté cargado
    const timer1 = setTimeout(forceInitCookieHub, 1000);
    const timer2 = setTimeout(forceInitCookieHub, 3000);
    const timer3 = setTimeout(forceInitCookieHub, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return null; // Este componente no renderiza nada
}
