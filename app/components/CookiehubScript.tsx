'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function CookiehubScript() {
  useEffect(() => {
    // Initialize CookieHub if needed, though the script itself might handle auto-initialization
    // You can also use the CookieHub JavaScript API events here (e.g., onInitialise)
    console.log('CookieHub component mounted');
  }, []);

  return (
    <Script
      id="cookiehub-script"
      strategy="afterInteractive"
      src="https://cookiehub.net/c2/f66471de.js"
    />
  );
}
