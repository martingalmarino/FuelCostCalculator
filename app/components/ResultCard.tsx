'use client';

import { CalculationResult } from '@/lib/types';

interface ResultCardProps {
  result: CalculationResult;
  from: string;
  to: string;
  onRecalculate?: () => void;
}

/**
 * Componente para mostrar los resultados del cálculo de combustible
 */
export default function ResultCard({ result, from, to, onRecalculate }: ResultCardProps) {
  return (
    <div className="card-lg mt-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Estimated Fuel Cost
        </h2>
        <div className="text-4xl font-bold text-primary-600 mb-4">
          NZD {result.totalCost.toFixed(2)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Distance</div>
            <div className="text-lg font-semibold">{result.distance} km</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Consumption</div>
            <div className="text-lg font-semibold">{result.consumption} L/100km</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Price</div>
            <div className="text-lg font-semibold">NZD {result.price}/L</div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-blue-800">
            <strong>Calculation details:</strong>
          </div>
          <div className="text-sm text-blue-700 mt-1">
            Fuel needed: {result.liters.toFixed(2)} liters
          </div>
          <div className="text-sm text-blue-700">
            Route: {from} → {to}
          </div>
        </div>
        
        {onRecalculate && (
          <button
            onClick={onRecalculate}
            className="btn-primary"
          >
            Recalculate
          </button>
        )}
      </div>
    </div>
  );
}
