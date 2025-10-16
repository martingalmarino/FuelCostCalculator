import FuelForm from './components/FuelForm';
import { Route } from '@/lib/types';
import distancesData from './data/distances.json';

// Convertir el JSON a tipo Route
const routes: Route[] = distancesData;

/**
 * Página principal con la calculadora de combustible
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-mobile py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl sm:text-5xl">🚗</span>
            <h1 className="heading-responsive">
              <span className="gradient-text">Fuel Cost Calculator</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mt-2">
                New Zealand 🇳🇿
              </span>
            </h1>
          </div>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plan your next road trip across New Zealand with confidence. 
            Get instant fuel cost estimates between major cities like Auckland, 
            Wellington, Christchurch, and Queenstown.
          </p>
        </div>


        {/* Calculator Section */}
        <section id="calculator" className="mb-12 sm:mb-16">
          <FuelForm routes={routes} />
        </section>

        {/* Popular Routes Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">⭐</span>
              <h2 className="heading-responsive text-gray-800">Popular Routes</h2>
            </div>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Discover the most traveled routes in New Zealand and get detailed fuel cost breakdowns
            </p>
          </div>
          
          <div className="grid-responsive">
            {routes.slice(0, 6).map((route, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🗺️</span>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {route.from} → {route.to}
                    </h3>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-100">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium text-blue-700">Distance:</span>
                    <span className="text-lg font-bold text-blue-800">{route.km} km</span>
                  </div>
                </div>
                <a
                  href={`/route/${route.from.toLowerCase().replace(/\s+/g, '-')}-to-${route.to.toLowerCase().replace(/\s+/g, '-')}`}
                  className="btn-primary w-full text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Details
                    <span>→</span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">❓</span>
              <h2 className="heading-responsive text-gray-800">Frequently Asked Questions</h2>
            </div>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our fuel cost calculator
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">🔧</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    How does the calculator work?
                  </h3>
                  <p className="text-gray-600 text-responsive">
                    Our calculator uses the distance between cities, your vehicle&apos;s average consumption 
                    and current fuel prices to estimate the total cost of your trip.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">⛽</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    What fuel consumption should I use?
                  </h3>
                  <p className="text-gray-600 text-responsive">
                    The default value is 7 L/100 km, which is the average consumption for most vehicles. 
                    You can adjust this value based on your vehicle&apos;s specifications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">💰</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Is the fuel price up to date?
                  </h3>
                  <p className="text-gray-600 text-responsive">
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
  );
}
