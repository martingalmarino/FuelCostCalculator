'use client';

import Script from 'next/script';

export default function CookiehubScript() {
  return (
    <>
      <Script
        src="https://cdn.cookiehub.eu/c2/f66471de.js"
        strategy="beforeInteractive"
      />
      <Script
        id="cookiehub-init"
        strategy="beforeInteractive"
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
