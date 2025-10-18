'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateFuelCost, DEFAULT_VALUES } from '@/lib/calculateFuelCost';
import { Route, CalculationResult } from '@/lib/types';
import { RouteCalculator } from '@/lib/routeCalculator';
import { MapPin, Target, Fuel, DollarSign, Calculator } from 'lucide-react';
import CalculatorCard from './ui/CalculatorCard';
import FormField from './ui/FormField';
import ResultDisplay from './ui/ResultDisplay';

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
      <CalculatorCard
        title="Fuel Cost Calculator"
        description="Calculate your fuel costs between New Zealand cities"
        icon={Calculator}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="From City" icon={MapPin}>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="form-select"
            >
              <option value="">Select origin city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </FormField>
          
          <FormField label="To City" icon={Target}>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="form-select"
            >
              <option value="">Select destination city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </FormField>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Fuel Consumption (L/100 km)" icon={Fuel}>
            <input
              type="number"
              id="consumption"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              min="1"
              max="20"
              step="0.1"
              placeholder="7.0"
              className="form-input"
            />
          </FormField>
          
          <FormField label="Fuel Price (NZD/L)" icon={DollarSign}>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0.1"
              max="10"
              step="0.01"
              placeholder="2.90"
              className="form-input"
            />
          </FormField>
        </div>
        
        {error && (
          <div className="error-message">
            <p className="error-text">{error}</p>
          </div>
        )}
      </CalculatorCard>

      {result && (
        <ResultDisplay
          title="Fuel Cost Breakdown"
          icon={DollarSign}
        >
          <div className="result-row">
            <span className="result-label">Route:</span>
            <span className="result-value">{from} → {to}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Distance:</span>
            <span className="result-value">{result.distance} km</span>
          </div>
          <div className="result-row">
            <span className="result-label">Fuel needed:</span>
            <span className="result-value">{result.liters.toFixed(2)} liters</span>
          </div>
          <div className="result-row">
            <span className="result-label">Consumption:</span>
            <span className="result-value">{result.consumption} L/100 km</span>
          </div>
          <div className="result-row">
            <span className="result-label">Price per liter:</span>
            <span className="result-value">NZD ${result.price}</span>
          </div>
          <div className="result-total">
            <span className="result-total-label">Total fuel cost:</span>
            <span className="result-total-value">NZD ${result.totalCost.toFixed(2)}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <button
              onClick={() => {
                setFrom('');
                setTo('');
                setResult(null);
                setError('');
              }}
              className="btn-reset w-full"
            >
              Calculate New Route
            </button>
          </div>
        </ResultDisplay>
      )}
    </div>
  );
}
