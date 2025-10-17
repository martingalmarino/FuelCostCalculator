import { TripCostResult } from '@/lib/types';

interface ResultBreakdownProps {
  result: TripCostResult | null;
  includeTolls: boolean;
  includeFerry: boolean;
}

export default function ResultBreakdown({ result, includeTolls, includeFerry }: ResultBreakdownProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Trip Cost Breakdown</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Distance:</span>
          <span className="font-medium text-gray-900">{result.distance} km</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fuel needed:</span>
          <span className="font-medium text-gray-900">{result.liters} liters</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fuel cost:</span>
          <span className="font-medium text-gray-900">NZD ${result.fuelCost.toFixed(2)}</span>
        </div>
        
        {includeTolls && result.tollCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tolls:</span>
            <span className="font-medium text-gray-900">NZD ${result.tollCost.toFixed(2)}</span>
          </div>
        )}
        
        {includeFerry && result.ferryCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ferry:</span>
            <span className="font-medium text-gray-900">NZD ${result.ferryCost.toFixed(2)}</span>
          </div>
        )}
        
        <hr className="my-3 border-gray-200" />
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total cost:</span>
          <span className="text-xl font-bold text-blue-600">NZD ${result.totalCost.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700">
          <strong>Calculation:</strong> ({result.distance} km × {result.consumption} L/100 km × NZD ${result.price}/L)
          {includeTolls && result.tollCost > 0 && ` + NZD $${result.tollCost.toFixed(2)} tolls`}
          {includeFerry && result.ferryCost > 0 && ` + NZD $${result.ferryCost.toFixed(2)} ferry`}
        </p>
      </div>
    </div>
  );
}
