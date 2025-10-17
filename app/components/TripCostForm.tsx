'use client';

import { useState } from 'react';
import { ExtendedRoute, TripCostResult } from '@/lib/types';
import { calculateTripCost, DEFAULT_TRIP_VALUES } from '@/lib/calculateTripCost';
import { MapPin, Calculator, DollarSign } from 'lucide-react';

interface TripCostFormProps {
  routes: ExtendedRoute[];
}

export default function TripCostForm({ routes }: TripCostFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [consumption, setConsumption] = useState(DEFAULT_TRIP_VALUES.consumption);
  const [price, setPrice] = useState(DEFAULT_TRIP_VALUES.price);
  const [includeTolls, setIncludeTolls] = useState(DEFAULT_TRIP_VALUES.includeTolls);
  const [includeFerry, setIncludeFerry] = useState(DEFAULT_TRIP_VALUES.includeFerry);
  const [result, setResult] = useState<TripCostResult | null>(null);

  // Obtener ciudades únicas para los dropdowns
  const cities = Array.from(new Set([
    ...routes.map(route => route.from),
    ...routes.map(route => route.to)
  ])).sort();

  const handleCalculate = () => {
    if (!from || !to) {
      alert('Please select both origin and destination cities');
      return;
    }

    const selectedRoute = routes.find(route => 
      (route.from === from && route.to === to) || 
      (route.from === to && route.to === from)
    );

    if (!selectedRoute) {
      alert('Route not found in our database');
      return;
    }

    const calculationResult = calculateTripCost(
      selectedRoute.km,
      consumption,
      price,
      includeTolls,
      includeFerry,
      selectedRoute.tolls,
      selectedRoute.ferry
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    setConsumption(DEFAULT_TRIP_VALUES.consumption);
    setPrice(DEFAULT_TRIP_VALUES.price);
    setIncludeTolls(DEFAULT_TRIP_VALUES.includeTolls);
    setIncludeFerry(DEFAULT_TRIP_VALUES.includeFerry);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Total Trip Cost Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Route Selection */}
          <div className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select origin city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select destination city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Settings */}
          <div className="space-y-4">
            <div>
              <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Consumption (L/100 km)
              </label>
              <input
                type="number"
                id="consumption"
                value={consumption}
                onChange={(e) => setConsumption(Number(e.target.value))}
                min="1"
                max="50"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Price (NZD/L)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0.1"
                max="10"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Include Tolls</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeTolls}
                onChange={(e) => setIncludeTolls(e.target.checked)}
                className="sr-only peer"
                aria-label="Include tolls in calculation"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Include Ferry</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeFerry}
                onChange={(e) => setIncludeFerry(e.target.checked)}
                className="sr-only peer"
                aria-label="Include ferry in calculation"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            Calculate Total Cost
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Trip Cost Breakdown</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Fuel:</span>
                  <span className="font-medium text-blue-900">NZD ${result.fuelCost.toFixed(2)}</span>
                </div>
                {includeTolls && result.tollCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tolls:</span>
                    <span className="font-medium text-blue-900">NZD ${result.tollCost.toFixed(2)}</span>
                  </div>
                )}
                {includeFerry && result.ferryCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Ferry:</span>
                    <span className="font-medium text-blue-900">NZD ${result.ferryCost.toFixed(2)}</span>
                  </div>
                )}
                <hr className="border-blue-200" />
                <div className="flex justify-between font-bold">
                  <span className="text-blue-800">Total:</span>
                  <span className="text-blue-900 text-lg">NZD ${result.totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
