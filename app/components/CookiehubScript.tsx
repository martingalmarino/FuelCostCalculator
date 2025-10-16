'use client';

import Script from 'next/script';

export default function CookiehubScript() {
  return (
    <>
      <Script
        src="https://cdn.cookiehub.eu/c2/f66471de.js"
        strategy="afterInteractive"
      />
      <Script
        id="cookiehub-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function(event) {
              var cpm = {};
              window.cookiehub.load(cpm);
            });
          `,
        }}
      />
    </>
  );
}
