/**
 * Calcula el costo de combustible para un viaje
 * @param distanceKm - Distancia en kilómetros
 * @param consumptionLPer100 - Consumo en litros por cada 100 km
 * @param fuelPriceNZD - Precio del combustible en NZD por litro
 * @returns Costo total en NZD
 */
export const calculateFuelCost = (
  distanceKm: number,
  consumptionLPer100: number,
  fuelPriceNZD: number
): number => {
  const liters = (distanceKm * consumptionLPer100) / 100;
  return Number((liters * fuelPriceNZD).toFixed(2));
};

/**
 * Valores por defecto para el cálculo
 */
export const DEFAULT_VALUES = {
  consumption: 7, // L/100 km
  price: 2.90, // NZD/L
} as const;
