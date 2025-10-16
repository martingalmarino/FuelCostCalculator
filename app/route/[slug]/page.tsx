import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FuelForm from '../../components/FuelForm';
import { Route } from '@/lib/types';
import { deslugify } from '@/lib/slugify';
import { calculateFuelCost, DEFAULT_VALUES } from '@/lib/calculateFuelCost';
import distancesData from '../../data/distances.json';

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
      <div className="space-y-8">
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fuel Cost from {from} to {to}
          </h1>
          <div className="text-xl text-gray-600 mb-2">
            Distance: {distance} km | Average consumption: {DEFAULT_VALUES.consumption} L/100 km | Price: NZD {DEFAULT_VALUES.price}/L
          </div>
          <div className="text-2xl font-bold text-primary-600">
            Estimated Cost: NZD {estimatedCost.toFixed(2)}
          </div>
        </div>


        {/* Calculator Section */}
        <section>
          <FuelForm 
            routes={routes} 
            initialFrom={from}
            initialTo={to}
          />
        </section>

        {/* Route Details */}
        <section className="mt-16">
          <div className="card-lg">
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
                    <span className="font-medium">NZD {DEFAULT_VALUES.price}/L</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-900 font-semibold">Total cost:</span>
                    <span className="font-bold text-primary-600">NZD {estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a
                href="/"
                className="btn-primary"
              >
                ← Back to Main Calculator
              </a>
            </div>
          </div>
        </section>

        {/* Related Routes */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Related Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes
              .filter(r => r.from === from || r.to === from || r.from === to || r.to === to)
              .filter(r => !(r.from === from && r.to === to) && !(r.from === to && r.to === from))
              .slice(0, 6)
              .map((route, index) => (
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

      </div>
    );
  } catch (error) {
    notFound();
  }
}
