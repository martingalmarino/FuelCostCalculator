/**
 * Tipos para el sistema de cálculo de combustible
 */

export interface Route {
  from: string;
  to: string;
  km: number;
}

export interface ExtendedRoute {
  from: string;
  to: string;
  km: number;
  tolls: number;
  ferry: number;
  region: string;
}

export interface CalculationParams {
  from: string;
  to: string;
  consumption: number;
  price: number;
}

export interface TripCostParams {
  from: string;
  to: string;
  consumption: number;
  price: number;
  includeTolls: boolean;
  includeFerry: boolean;
}

export interface CalculationResult {
  distance: number;
  consumption: number;
  price: number;
  liters: number;
  totalCost: number;
}

export interface TripCostResult {
  distance: number;
  consumption: number;
  price: number;
  liters: number;
  fuelCost: number;
  tollCost: number;
  ferryCost: number;
  totalCost: number;
}

export interface CityOption {
  value: string;
  label: string;
}
