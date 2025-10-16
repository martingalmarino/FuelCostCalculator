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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Fuel Cost Calculator
          <span className="text-primary-600 block">New Zealand</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Plan your next road trip across New Zealand. 
          Estimate how much fuel you&apos;ll need between major cities 
          like Christchurch, Queenstown, or Auckland in just one click.
        </p>
      </div>


      {/* Calculator Section */}
      <section id="calculator">
        <FuelForm routes={routes} />
      </section>

      {/* Popular Routes Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Popular Routes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.slice(0, 6).map((route, index) => (
            <div key={index} className="card hover:shadow-card-lg transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {route.from} → {route.to}
              </h3>
              <p className="text-gray-600 mb-4">{route.km} km</p>
              <a
                href={`/route/${route.from.toLowerCase().replace(/\s+/g, '-')}-to-${route.to.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View details →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="card">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How does the calculator work?
            </h3>
            <p className="text-gray-600">
              Our calculator uses the distance between cities, your vehicle&apos;s average consumption 
              and current fuel prices to estimate the total cost of your trip.
            </p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              What fuel consumption should I use?
            </h3>
            <p className="text-gray-600">
              The default value is 7 L/100 km, which is the average consumption for most vehicles. 
              You can adjust this value based on your vehicle&apos;s specifications.
            </p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Is the fuel price up to date?
            </h3>
            <p className="text-gray-600">
              We use an average price of NZD 2.90 per liter. Prices can vary by location 
              and time. We recommend checking local prices before traveling.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
