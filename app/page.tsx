import FuelForm from './components/FuelForm';
import { Route } from '@/lib/types';
import distancesData from './data/distances.json';
import { Car, Star, HelpCircle, MapPin } from 'lucide-react';

// Convertir el JSON a tipo Route
const routes: Route[] = distancesData;

/**
 * Página principal con la calculadora de combustible
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section section-spacing">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <div className="hero-badge mb-6">
              <Star className="h-4 w-4" />
              Plan Your Journey with Confidence
            </div>
            <h1 className="mb-6">
              <span className="hero-title">Calculate Your </span>
              <span className="hero-title-accent">Fuel Costs Instantly</span>
            </h1>
            <p className="hero-description">
              Get accurate fuel cost estimates between major New Zealand cities. Save money and plan better trips.
            </p>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="max-w-7xl mx-auto container-spacing py-8">


          {/* Calculator Section */}
          <section id="calculator" className="mb-16">
            <FuelForm routes={routes} />
          </section>

          {/* Popular Routes Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Routes</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most traveled routes in New Zealand and get detailed fuel cost breakdowns
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
                  <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
                    <div className="text-center">
                      <span className="text-sm font-medium text-blue-700">Distance: </span>
                      <span className="text-lg font-bold text-blue-800">{route.km} km</span>
                    </div>
                  </div>
                  <a
                    href={`/route/${route.from.toLowerCase().replace(/\s+/g, '-')}-to-${route.to.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn-primary w-full text-center justify-center"
                  >
                    View Details
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
                Everything you need to know about our fuel cost calculator
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
                      How does the calculator work?
                    </h3>
                    <p className="text-gray-600">
                      Our calculator uses the distance between cities, your vehicle&apos;s average consumption 
                      and current fuel prices to estimate the total cost of your trip.
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
                      What fuel consumption should I use?
                    </h3>
                    <p className="text-gray-600">
                      The default value is 7 L/100 km, which is the average consumption for most vehicles. 
                      You can adjust this value based on your vehicle&apos;s specifications.
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
                      Is the fuel price up to date?
                    </h3>
                    <p className="text-gray-600">
                      We use an average price of NZD $2.90 per liter. Prices can vary by location 
                      and time. We recommend checking local prices before traveling.
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
