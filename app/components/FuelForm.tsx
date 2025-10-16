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
    <div className="space-responsive">
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="heading-responsive gradient-text mb-2">Fuel Cost Calculator</h2>
          <p className="text-responsive text-gray-600">Calculate your fuel costs between New Zealand cities</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="space-y-2">
            <label htmlFor="from" className="label-text">
              <span className="flex items-center gap-2">
                🚗 From City
              </span>
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="select-field"
            >
              <option value="">Select origin city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="to" className="label-text">
              <span className="flex items-center gap-2">
                🎯 To City
              </span>
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="select-field"
            >
              <option value="">Select destination city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="space-y-2">
            <label htmlFor="consumption" className="label-text">
              <span className="flex items-center gap-2">
                ⛽ Fuel Consumption (L/100 km)
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
              className="input-field"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="label-text">
              <span className="flex items-center gap-2">
                💰 Fuel Price (NZD/L)
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
              className="input-field"
            />
          </div>
        </div>
        
        {error && (
          <div className="error-message mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <p>{error}</p>
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
