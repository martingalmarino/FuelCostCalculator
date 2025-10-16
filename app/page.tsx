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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Fuel Cost Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your next road trip across New Zealand with confidence. 
            Get instant fuel cost estimates between major cities like Auckland, 
            Wellington, Christchurch, and Queenstown.
          </p>
        </div>


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
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
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
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center"
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
  );
}
