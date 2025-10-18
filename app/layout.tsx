import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Car } from 'lucide-react';
import './globals.css';
import CookiehubScript from './components/CookiehubScript';
import CookiehubDebug from './components/CookiehubDebug';
import CookiehubForceInit from './components/CookiehubForceInit';
import CookiehubConfig from './components/CookiehubConfig';
import CookiehubNetworkTest from './components/CookiehubNetworkTest';
import CookiehubScriptLoader from './components/CookiehubScriptLoader';
import CookiehubAlternative from './components/CookiehubAlternative';
import CustomCookieBanner from './components/CustomCookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator NZ | New Zealand Road Trip Planner',
  description: 'Calculate fuel costs for traveling between New Zealand cities. Free estimator to plan your road trip across NZ.',
  keywords: 'fuel calculator, travel cost, New Zealand, Auckland, Wellington, Christchurch, Queenstown, road trip',
  authors: [{ name: 'Fuel Cost Calculator NZ' }],
  creator: 'Fuel Cost Calculator NZ',
  publisher: 'Fuel Cost Calculator NZ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.fuelcostnz.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Fuel Cost Calculator NZ | New Zealand Road Trip Planner',
    description: 'Calculate fuel costs for traveling between New Zealand cities. Free estimator to plan your road trip across NZ.',
    url: 'https://www.fuelcostnz.com',
    siteName: 'Fuel Cost Calculator NZ',
    locale: 'en_NZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Cost Calculator NZ | New Zealand Road Trip Planner',
    description: 'Calculate fuel costs for traveling between New Zealand cities. Free estimator to plan your road trip across NZ.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'RLnS09vnVD5h4ryZX9pbG_3ZqLl9ozcJPZwk0lUSLdk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        {/* CookieHub Script - Carga directa en head como respaldo */}
        <script
          src="https://cookiehub.net/c2/f66471de.js"
          async
        />
        {/* Script de respaldo adicional */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Verificar carga del script principal y cargar respaldo si falla
              setTimeout(() => {
                if (!window.CookieHub) {
                  console.log('🔄 Loading CookieHub fallback script...');
                  
                  // Intentar múltiples URLs de respaldo
                  const fallbackUrls = [
                    'https://cdn.cookiehub.eu/c2/f66471de.js',
                    'https://cookiehub.com/c2/f66471de.js'
                  ];
                  
                  let currentIndex = 0;
                  
                  const tryLoadFallback = () => {
                    if (currentIndex >= fallbackUrls.length) {
                      console.error('❌ All CookieHub fallback URLs failed');
                      return;
                    }
                    
                    const script = document.createElement('script');
                    script.src = fallbackUrls[currentIndex];
                    script.async = true;
                    script.onload = () => {
                      console.log('✅ CookieHub fallback loaded from:', fallbackUrls[currentIndex]);
                    };
                    script.onerror = () => {
                      console.log('❌ Failed to load from:', fallbackUrls[currentIndex]);
                      currentIndex++;
                      tryLoadFallback();
                    };
                    document.head.appendChild(script);
                  };
                  
                  tryLoadFallback();
                }
              }, 3000);
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <CookiehubConfig />
        <CookiehubNetworkTest />
        <CookiehubScriptLoader />
        <CookiehubScript />
        <CookiehubAlternative />
        <CookiehubDebug />
        <CookiehubForceInit />
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-2">
                  <Car className="h-6 w-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">
                  Fuelcostnz.com
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Home
                  </a>
                  <a href="#calculator" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Fuel Calculator
                  </a>
                  <a href="/total-trip-cost-calculator" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Total Trip Cost
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main>
            {children}
          </main>
          
          <footer className="bg-white border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2025 FuelCostCalculator.nz - New Zealand Fuel Cost Calculator</p>
                <p className="text-sm mt-2">
                  Plan your New Zealand road trip with our free fuel cost calculator.
                </p>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Banner de cookies personalizado como respaldo */}
        <CustomCookieBanner />
      </body>
    </html>
  );
}
