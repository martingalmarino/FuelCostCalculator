'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateFuelCost, DEFAULT_VALUES } from '@/lib/calculateFuelCost';
import { Route, CalculationResult } from '@/lib/types';
import { RouteCalculator } from '@/lib/routeCalculator';
import { MapPin, Target, Fuel, DollarSign } from 'lucide-react';
import ResultCard from './ResultCard';

interface FuelFormProps {
  routes: Route[];
  initialFrom?: string;
  initialTo?: string;
}

/**
 * Componente principal del formulario de cálculo de combustible
 */
export default function FuelForm({ routes, initialFrom, initialTo }: FuelFormProps) {
  const [from, setFrom] = useState(initialFrom || '');
  const [to, setTo] = useState(initialTo || '');
  const [consumption, setConsumption] = useState<number>(DEFAULT_VALUES.consumption);
  const [price, setPrice] = useState<number>(DEFAULT_VALUES.price);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  // Crear instancia del calculador de rutas
  const routeCalculator = useCallback(() => {
    return new RouteCalculator(routes);
  }, [routes]);

  // Obtener todas las ciudades únicas
  const cities = routeCalculator().getAllCities();


  // Calcular automáticamente cuando cambien los valores
  useEffect(() => {
    if (from && to && from !== to) {
      const calculator = routeCalculator();
      const distance = calculator.findDistance(from, to);
      if (distance) {
        const totalCost = calculateFuelCost(distance, consumption, price);
        const liters = (distance * consumption) / 100;

        setResult({
          distance,
          consumption,
          price,
          liters,
          totalCost
        });
        setError('');
      } else {
        setResult(null);
        setError(`No route found between ${from} and ${to}. Please try different cities or check our popular routes below.`);
      }
    } else if (from && to && from === to) {
      setResult(null);
      setError('Origin and destination cities must be different');
    } else {
      setResult(null);
      setError('');
    }
  }, [from, to, consumption, price, routeCalculator]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fuel Cost Calculator</h2>
          <p className="text-gray-600">Calculate your fuel costs between New Zealand cities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                From City
              </span>
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select origin city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                To City
              </span>
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select destination city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label htmlFor="consumption" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-blue-600" />
                Fuel Consumption (L/100 km)
              </span>
            </label>
            <input
              type="number"
              id="consumption"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              min="1"
              max="20"
              step="0.1"
              placeholder="7.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Fuel Price (NZD/L)
              </span>
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0.1"
              max="10"
              step="0.01"
              placeholder="2.90"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex items-center gap-2">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}
        
      </div>

      {result && (
        <ResultCard
          result={result}
          from={from}
          to={to}
          onRecalculate={() => {
            setFrom('');
            setTo('');
            setResult(null);
            setError('');
          }}
        />
      )}
    </div>
  );
}
