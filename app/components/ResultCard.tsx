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
    <div className="card-elevated">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">💰</span>
          <h2 className="heading-responsive gradient-text">Estimated Fuel Cost</h2>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border-2 border-blue-100">
          <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
            NZD ${result.totalCost.toFixed(2)}
          </div>
          <p className="text-responsive text-gray-600">
            Total cost for your journey from {from} to {to}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🛣️</span>
              <div className="text-sm font-medium text-green-700">Distance</div>
            </div>
            <div className="text-xl font-bold text-green-800">{result.distance} km</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">⛽</span>
              <div className="text-sm font-medium text-orange-700">Consumption</div>
            </div>
            <div className="text-xl font-bold text-orange-800">{result.consumption} L/100km</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">💵</span>
              <div className="text-sm font-medium text-purple-700">Price</div>
            </div>
            <div className="text-xl font-bold text-purple-800">NZD ${result.price}/L</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">📊</span>
            <div className="text-sm font-semibold text-blue-800">Calculation Details</div>
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>Fuel needed: <span className="font-semibold">{result.liters.toFixed(2)} liters</span></div>
            <div>Route: <span className="font-semibold">{from} → {to}</span></div>
          </div>
        </div>
        
        {onRecalculate && (
          <button
            onClick={onRecalculate}
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              🔄 Recalculate
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
