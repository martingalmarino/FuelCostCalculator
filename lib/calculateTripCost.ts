import { TripCostResult } from './types';

/**
 * Calcula el costo total de un viaje incluyendo combustible, peajes y ferry
 */
export const calculateTripCost = (
  distanceKm: number,
  consumption: number,
  fuelPrice: number,
  includeTolls: boolean,
  includeFerry: boolean,
  tolls: number = 0,
  ferry: number = 0
): TripCostResult => {
  // Calcular costo de combustible
  const liters = (distanceKm * consumption) / 100;
  const fuelCost = liters * fuelPrice;
  
  // Calcular costo de peajes
  const tollCost = includeTolls ? tolls : 0;
  
  // Calcular costo de ferry
  const ferryCost = includeFerry ? ferry : 0;
  
  // Calcular costo total
  const totalCost = fuelCost + tollCost + ferryCost;

  return {
    distance: distanceKm,
    consumption,
    price: fuelPrice,
    liters: Math.round(liters * 100) / 100, // Redondear a 2 decimales
    fuelCost: Math.round(fuelCost * 100) / 100,
    tollCost: Math.round(tollCost * 100) / 100,
    ferryCost: Math.round(ferryCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
};

/**
 * Valores por defecto para la calculadora de costo total
 */
export const DEFAULT_TRIP_VALUES = {
  consumption: 7, // L/100 km
  price: 2.9, // NZD/L
  includeTolls: true,
  includeFerry: true,
};
