'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateFuelCost, DEFAULT_VALUES } from '@/lib/calculateFuelCost';
import { Route, CalculationResult } from '@/lib/types';
import { RouteCalculator } from '@/lib/routeCalculator';
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
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Fuel Cost Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              From City
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-field"
            >
              <option value="">Select city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To City
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-field"
            >
              <option value="">Select city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              max="20"
              step="0.1"
              className="input-field"
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
              step="0.01"
              className="input-field"
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
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
