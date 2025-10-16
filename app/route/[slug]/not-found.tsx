import Link from 'next/link';

/**
 * Página 404 personalizada para rutas no encontradas
 */
export default function NotFound() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Route Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the route you&apos;re looking for. 
          Check the URL or use our main calculator to find your route.
        </p>
        <div className="space-y-4">
          <Link href="/" className="btn-primary inline-block">
            Back to Home
          </Link>
          <div>
            <Link href="/#calculator" className="btn-secondary inline-block">
              Go to Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
