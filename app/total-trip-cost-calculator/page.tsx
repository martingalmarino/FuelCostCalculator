import { Metadata } from 'next';
import TripCostForm from '../components/TripCostForm';
import { ExtendedRoute } from '@/lib/types';
import routesExtendedData from '../data/routes_extended.json';
import { Calculator, MapPin, DollarSign, HelpCircle, Star } from 'lucide-react';

// Convertir el JSON a tipo ExtendedRoute
const routes: ExtendedRoute[] = routesExtendedData;

export const metadata: Metadata = {
  title: 'Total Trip Cost Calculator NZ | Fuel + Tolls + Ferry',
  description: 'Estimate total travel costs across New Zealand including fuel, tolls, and ferry charges. Compare routes like Auckland–Wellington and Christchurch–Queenstown instantly.',
  keywords: 'total trip cost, fuel calculator, tolls, ferry, New Zealand, travel cost, road trip, Auckland, Wellington, Christchurch, Queenstown',
  openGraph: {
    title: 'Total Trip Cost Calculator NZ | Fuel + Tolls + Ferry',
    description: 'Estimate total travel costs across New Zealand including fuel, tolls, and ferry charges.',
    url: 'https://www.fuelcostnz.com/total-trip-cost-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Total Trip Cost Calculator NZ',
    description: 'Estimate total travel costs including fuel, tolls, and ferry charges.',
  },
  alternates: {
    canonical: '/total-trip-cost-calculator',
  },
};

/**
 * Página de calculadora de costo total de viaje
 */
export default function TotalTripCostCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section section-spacing">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <div className="hero-badge mb-6">
              <Calculator className="h-4 w-4" />
              Complete Travel Cost Planning
            </div>
            <h1 className="mb-6">
              <span className="hero-title">Total Trip Cost </span>
              <span className="hero-title-accent">Calculator</span>
            </h1>
            <p className="hero-description">
              Get a complete cost breakdown for your New Zealand road trip including fuel, tolls, and ferry charges. Plan your journey with confidence knowing all your travel expenses upfront.
            </p>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="max-w-7xl mx-auto container-spacing py-8">

          {/* Calculator Section */}
          <section className="mb-16">
            <div className="content-section">
              <TripCostForm routes={routes} />
            </div>
          </section>

          {/* Popular Routes Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Routes with Total Costs</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the most traveled routes in New Zealand with complete cost breakdowns including tolls and ferry charges
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {routes.slice(0, 12).map((route, index) => (
                <div key={index} className="feature-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      {route.from} → {route.to}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="text-center">
                        <span className="text-sm font-medium text-blue-700">Distance: </span>
                        <span className="text-lg font-bold text-blue-800">{route.km} km</span>
                      </div>
                    </div>
                    
                    {route.tolls > 0 && (
                      <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-100">
                        <div className="text-center">
                          <span className="text-sm font-medium text-yellow-700">Tolls: </span>
                          <span className="text-sm font-bold text-yellow-800">NZD ${route.tolls}</span>
                        </div>
                      </div>
                    )}
                    
                    {route.ferry > 0 && (
                      <div className="bg-green-50 rounded-lg p-2 border border-green-100">
                        <div className="text-center">
                          <span className="text-sm font-medium text-green-700">Ferry: </span>
                          <span className="text-sm font-bold text-green-800">NZD ${route.ferry}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {route.region}
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href="/total-trip-cost-calculator"
                    className="btn-primary w-full text-center justify-center"
                  >
                    Calculate Total Cost
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our total trip cost calculator
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="feature-card">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      What costs are included in the total?
                    </h3>
                    <p className="text-gray-600">
                      Our calculator includes fuel costs, toll road charges, and ferry fees. You can toggle tolls and ferry costs on or off depending on your route preferences.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      How accurate are the toll and ferry prices?
                    </h3>
                    <p className="text-gray-600">
                      Toll and ferry prices are based on current rates, but these can change. We recommend checking the latest prices directly with toll operators and ferry companies before traveling.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Can I calculate costs for routes not listed?
                    </h3>
                    <p className="text-gray-600">
                      While we cover the most popular routes, you can still use our calculator with any distance. Simply enter your custom fuel consumption and price to get fuel cost estimates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
