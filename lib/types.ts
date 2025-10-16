/**
 * Tipos para el sistema de cálculo de combustible
 */

export interface Route {
  from: string;
  to: string;
  km: number;
}

export interface CalculationParams {
  from: string;
  to: string;
  consumption: number;
  price: number;
}

export interface CalculationResult {
  distance: number;
  consumption: number;
  price: number;
  liters: number;
  totalCost: number;
}

export interface CityOption {
  value: string;
  label: string;
}
