'use client';

import { CalculationResult } from '@/lib/types';
import { Calculator, MapPin, Fuel, DollarSign, ArrowRight } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Estimated Fuel Cost</h2>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            NZD ${result.totalCost.toFixed(2)}
          </div>
          <p className="text-gray-600">
            Total cost for your journey from {from} to {to}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <div className="text-sm font-medium text-gray-700">Distance</div>
            </div>
            <div className="text-xl font-bold text-gray-900">{result.distance} km</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Fuel className="h-5 w-5 text-orange-600" />
              <div className="text-sm font-medium text-gray-700">Consumption</div>
            </div>
            <div className="text-xl font-bold text-gray-900">{result.consumption} L/100km</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div className="text-sm font-medium text-gray-700">Price</div>
            </div>
            <div className="text-xl font-bold text-gray-900">NZD ${result.price}/L</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <div className="text-sm font-semibold text-gray-800">Calculation Details</div>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <div>Fuel needed: <span className="font-semibold">{result.liters.toFixed(2)} liters</span></div>
            <div>Route: <span className="font-semibold">{from} → {to}</span></div>
          </div>
        </div>
        
        {onRecalculate && (
          <button
            onClick={onRecalculate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Recalculate
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
