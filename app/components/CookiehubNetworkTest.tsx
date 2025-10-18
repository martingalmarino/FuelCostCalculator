'use client';

import { useEffect } from 'react';

export default function CookiehubNetworkTest() {
  useEffect(() => {
    const testCookieHubConnectivity = async () => {
      console.log('🌐 Testing CookieHub connectivity...');
      
      const testUrls = [
        'https://cookiehub.net/c2/f66471de.js',
        'https://cdn.cookiehub.eu/c2/f66471de.js',
        'https://cookiehub.com/c2/f66471de.js'
      ];
      
      for (const url of testUrls) {
        try {
          console.log(`Testing: ${url}`);
          const response = await fetch(url, { 
            method: 'HEAD',
            mode: 'no-cors' // Para evitar problemas de CORS
          });
          console.log(`✅ ${url} - Accessible`);
        } catch (error) {
          console.log(`❌ ${url} - Failed:`, error);
        }
      }
      
      // Probar con fetch directo
      try {
        const response = await fetch('https://cookiehub.net/c2/f66471de.js');
        const text = await response.text();
        console.log(`📊 Script size: ${text.length} bytes`);
        if (text.length === 0) {
          console.log('⚠️ Script is empty - possible server issue');
        } else if (text.includes('CookieHub')) {
          console.log('✅ Script contains CookieHub code');
        } else {
          console.log('⚠️ Script loaded but may not contain expected code');
        }
      } catch (error) {
        console.log('❌ Direct fetch failed:', error);
      }
    };
    
    // Ejecutar test después de un delay
    setTimeout(testCookieHubConnectivity, 1000);
  }, []);

  return null;
}
