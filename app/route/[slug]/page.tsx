import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FuelForm from '../../components/FuelForm';
import { Route } from '@/lib/types';
import { deslugify } from '@/lib/slugify';
import { calculateFuelCost, DEFAULT_VALUES } from '@/lib/calculateFuelCost';
import distancesData from '../../data/distances.json';
import { ArrowLeft, MapPin } from 'lucide-react';

// Convertir el JSON a tipo Route
const routes: Route[] = distancesData;

interface RoutePageProps {
  params: {
    slug: string;
  };
}

/**
 * Genera metadatos SEO para cada página de ruta
 */
export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  try {
    const { from, to } = deslugify(params.slug);
    const route = routes.find(r => 
      (r.from === from && r.to === to) || (r.from === to && r.to === from)
    );

    if (!route) {
      return {
        title: 'Ruta No Encontrada | Fuel Cost Calculator NZ',
        description: 'La ruta solicitada no fue encontrada en nuestra base de datos.',
      };
    }

    const distance = route.km;
    const estimatedCost = calculateFuelCost(distance, DEFAULT_VALUES.consumption, DEFAULT_VALUES.price);

    return {
      title: `Fuel Cost from ${from} to ${to} | NZ Trip Calculator`,
      description: `Calculate how much fuel you'll need to travel from ${from} to ${to} in New Zealand. Distance: ${distance} km. Estimated cost: NZD ${estimatedCost}.`,
      keywords: `fuel, ${from}, ${to}, New Zealand, travel cost, calculator, ${distance} km`,
      openGraph: {
        title: `Fuel Cost from ${from} to ${to} | NZ Trip Calculator`,
        description: `Calculate how much fuel you'll need to travel from ${from} to ${to} in New Zealand. Distance: ${distance} km.`,
        url: `https://fuelcostcalculator.nz/route/${params.slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Fuel Cost from ${from} to ${to}`,
        description: `Distance: ${distance} km | Estimated cost: NZD ${estimatedCost}`,
      },
      alternates: {
        canonical: `/route/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Route Not Found | Fuel Cost Calculator NZ',
      description: 'The requested route was not found in our database.',
    };
  }
}

/**
 * Genera parámetros estáticos para todas las rutas
 */
export async function generateStaticParams() {
  return routes.map((route) => ({
    slug: `${route.from.toLowerCase().replace(/\s+/g, '-')}-to-${route.to.toLowerCase().replace(/\s+/g, '-')}`,
  }));
}

/**
 * Página de ruta individual con SEO optimizado
 */
export default function RoutePage({ params }: RoutePageProps) {
  try {
    const { from, to } = deslugify(params.slug);
    const route = routes.find(r => 
      (r.from === from && r.to === to) || (r.from === to && r.to === from)
    );

    if (!route) {
      notFound();
    }

    const distance = route.km;
    const estimatedCost = calculateFuelCost(distance, DEFAULT_VALUES.consumption, DEFAULT_VALUES.price);
    const liters = (distance * DEFAULT_VALUES.consumption) / 100;

    // Schema JSON-LD para SEO
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `How do I calculate fuel cost from ${from} to ${to}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `To calculate fuel cost from ${from} to ${to}, you need to know the distance (${distance} km), your vehicle's consumption (average 7 L/100 km) and fuel price (NZD ${DEFAULT_VALUES.price}/L). The formula is: (distance × consumption ÷ 100) × price. For this route, the estimated cost is NZD ${estimatedCost}.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the distance between ${from} and ${to}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The distance between ${from} and ${to} is ${distance} kilometers. This is the most direct road distance between the two cities.`
          }
        }
      ]
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Fuel Cost from {from} to {to}
            </h1>
            <div className="text-lg text-gray-600 mb-4">
              Distance: {distance} km | Average consumption: {DEFAULT_VALUES.consumption} L/100 km | Price: NZD {DEFAULT_VALUES.price}/L
            </div>
            <div className="text-2xl font-bold text-blue-600">
              Estimated Cost: NZD ${estimatedCost.toFixed(2)}
            </div>
          </div>

          {/* Calculator Section */}
          <section className="mb-16">
            <FuelForm 
              routes={routes} 
              initialFrom={from}
              initialTo={to}
            />
          </section>

          {/* Route Details */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Route Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Trip Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium">{from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium">{to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium">{distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel needed:</span>
                      <span className="font-medium">{liters.toFixed(2)} liters</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cost Calculation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consumption:</span>
                      <span className="font-medium">{DEFAULT_VALUES.consumption} L/100 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel price:</span>
                      <span className="font-medium">NZD ${DEFAULT_VALUES.price}/L</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-900 font-semibold">Total cost:</span>
                      <span className="font-bold text-blue-600">NZD ${estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Main Calculator
                </a>
              </div>
            </div>
          </section>

          {/* Related Routes */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              Related Routes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes
                .filter(r => r.from === from || r.to === from || r.from === to || r.to === to)
                .filter(r => !(r.from === from && r.to === to) && !(r.from === to && r.to === from))
                .slice(0, 6)
                .map((route, index) => (
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
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
