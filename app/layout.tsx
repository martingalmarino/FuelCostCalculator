import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
  metadataBase: new URL('https://fuelcostcalculator.nz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fuel Cost Calculator NZ | New Zealand Road Trip Planner',
    description: 'Calculate fuel costs for traveling between New Zealand cities. Free estimator to plan your road trip across NZ.',
    url: 'https://fuelcostcalculator.nz',
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
    google: 'your-google-verification-code',
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
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="container-mobile">
              <div className="flex justify-between items-center py-4 sm:py-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">🚗</span>
                  <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                    FuelCostCalculator.nz
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                  <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Home
                  </a>
                  <a href="#calculator" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Calculator
                  </a>
                </nav>
                <button className="md:hidden p-2 text-gray-600 hover:text-blue-600">
                  <span className="text-xl">☰</span>
                </button>
              </div>
            </div>
          </header>
          
          <main>
            {children}
          </main>
          
          <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-16">
            <div className="container-mobile py-8 sm:py-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl">🇳🇿</span>
                  <h3 className="text-lg font-semibold text-gray-800">FuelCostCalculator.nz</h3>
                </div>
                <p className="text-gray-600 text-responsive mb-4">
                  &copy; 2024 FuelCostCalculator.nz - New Zealand Fuel Cost Calculator
                </p>
                <p className="text-sm text-gray-500">
                  Plan your New Zealand road trip with our free fuel cost calculator.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
