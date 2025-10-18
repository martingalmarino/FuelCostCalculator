'use client';

import { useState } from 'react';
import { ExtendedRoute, TripCostResult } from '@/lib/types';
import { calculateTripCost, DEFAULT_TRIP_VALUES } from '@/lib/calculateTripCost';
import { MapPin, Calculator, DollarSign, Fuel, Target } from 'lucide-react';
import CalculatorCard from './ui/CalculatorCard';
import FormField from './ui/FormField';
import ToggleSwitch from './ui/ToggleSwitch';
import ResultDisplay from './ui/ResultDisplay';

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

    // Normalize city names for comparison (trim whitespace, handle case)
    const normalizeCity = (city: string) => city.trim();
    
    const selectedRoute = routes.find(route => {
      const routeFrom = normalizeCity(route.from);
      const routeTo = normalizeCity(route.to);
      const searchFrom = normalizeCity(from);
      const searchTo = normalizeCity(to);
      
      return (routeFrom === searchFrom && routeTo === searchTo) || 
             (routeFrom === searchTo && routeTo === searchFrom);
    });

    if (!selectedRoute) {
      console.log('Route not found. Available routes:', routes.map(r => `${r.from} → ${r.to}`));
      alert(`Route not found in our database. Please try a different combination. Available routes: ${routes.slice(0, 5).map(r => `${r.from} → ${r.to}`).join(', ')}...`);
      return;
    }

    console.log('Found route:', selectedRoute);

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
    <div className="space-y-6">
      <CalculatorCard
        title="Total Trip Cost Calculator"
        description="Calculate complete travel costs including fuel, tolls, and ferry charges"
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
              <option value="">Select origin city</option>
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
              <option value="">Select destination city</option>
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
              max="50"
              step="0.1"
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
              step="0.1"
              className="form-input"
            />
          </FormField>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <ToggleSwitch
            label="Include Tolls"
            icon={MapPin}
            checked={includeTolls}
            onChange={setIncludeTolls}
          />
          
          <ToggleSwitch
            label="Include Ferry"
            icon={DollarSign}
            checked={includeFerry}
            onChange={setIncludeFerry}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="btn-calculate"
          >
            <Calculator className="h-4 w-4" />
            Calculate Total Cost
          </button>
          <button
            onClick={handleReset}
            className="btn-reset"
          >
            Reset
          </button>
        </div>
      </CalculatorCard>

      {/* Result */}
      {result && (
        <ResultDisplay
          title="Trip Cost Breakdown"
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
            <span className="result-label">Fuel cost:</span>
            <span className="result-value">NZD ${result.fuelCost.toFixed(2)}</span>
          </div>
          {includeTolls && result.tollCost > 0 && (
            <div className="result-row">
              <span className="result-label">Tolls:</span>
              <span className="result-value">NZD ${result.tollCost.toFixed(2)}</span>
            </div>
          )}
          {includeFerry && result.ferryCost > 0 && (
            <div className="result-row">
              <span className="result-label">Ferry:</span>
              <span className="result-value">NZD ${result.ferryCost.toFixed(2)}</span>
            </div>
          )}
          <div className="result-total">
            <span className="result-total-label">Total cost:</span>
            <span className="result-total-value">NZD ${result.totalCost.toFixed(2)}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <button
              onClick={handleReset}
              className="btn-reset w-full"
            >
              Calculate New Trip
            </button>
          </div>
        </ResultDisplay>
      )}
    </div>
  );
}
