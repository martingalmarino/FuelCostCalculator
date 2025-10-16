import { Route } from './types';

/**
 * Calculadora de rutas que incluye rutas directas e indirectas
 */
export class RouteCalculator {
  private routes: Route[];
  private graph: Map<string, Map<string, number>> = new Map();

  constructor(routes: Route[]) {
    this.routes = routes;
    this.buildGraph();
  }

  /**
   * Construye el grafo de rutas para el algoritmo de Dijkstra
   */
  private buildGraph(): void {
    this.graph = new Map();

    // Agregar todas las rutas al grafo (bidireccional)
    this.routes.forEach(route => {
      // Ruta directa
      if (!this.graph.has(route.from)) {
        this.graph.set(route.from, new Map());
      }
      this.graph.get(route.from)!.set(route.to, route.km);

      // Ruta inversa
      if (!this.graph.has(route.to)) {
        this.graph.set(route.to, new Map());
      }
      this.graph.get(route.to)!.set(route.from, route.km);
    });
  }

  /**
   * Encuentra la distancia entre dos ciudades usando Dijkstra
   */
  findDistance(from: string, to: string): number | null {
    // Buscar ruta directa primero
    const directDistance = this.findDirectDistance(from, to);
    if (directDistance !== null) {
      return directDistance;
    }

    // Si no hay ruta directa, usar Dijkstra
    return this.findShortestPath(from, to);
  }

  /**
   * Busca ruta directa entre dos ciudades
   */
  private findDirectDistance(from: string, to: string): number | null {
    const fromRoutes = this.graph.get(from);
    return fromRoutes?.get(to) || null;
  }

  /**
   * Implementación del algoritmo de Dijkstra para encontrar la ruta más corta
   */
  private findShortestPath(from: string, to: string): number | null {
    if (!this.graph.has(from) || !this.graph.has(to)) {
      return null;
    }

    const distances = new Map<string, number>();
    const visited = new Set<string>();
    const queue: string[] = [];

    // Inicializar distancias
    this.graph.forEach((_, city) => {
      distances.set(city, city === from ? 0 : Infinity);
    });

    queue.push(from);

    while (queue.length > 0) {
      // Encontrar la ciudad con la distancia mínima no visitada
      let currentCity = queue[0];
      let minDistance = distances.get(currentCity)!;

      for (let i = 1; i < queue.length; i++) {
        const city = queue[i];
        const distance = distances.get(city)!;
        if (distance < minDistance) {
          minDistance = distance;
          currentCity = city;
        }
      }

      queue.splice(queue.indexOf(currentCity), 1);
      visited.add(currentCity);

      // Si llegamos al destino, devolver la distancia
      if (currentCity === to) {
        return distances.get(to) || null;
      }

      // Actualizar distancias de ciudades vecinas
      const neighbors = this.graph.get(currentCity);
      if (neighbors) {
        neighbors.forEach((distance, neighbor) => {
          if (!visited.has(neighbor)) {
            const newDistance = distances.get(currentCity)! + distance;
            const currentDistance = distances.get(neighbor)!;

            if (newDistance < currentDistance) {
              distances.set(neighbor, newDistance);
              if (!queue.includes(neighbor)) {
                queue.push(neighbor);
              }
            }
          }
        });
      }
    }

    return null;
  }

  /**
   * Obtiene todas las ciudades disponibles
   */
  getAllCities(): string[] {
    const cities = new Set<string>();
    this.routes.forEach(route => {
      cities.add(route.from);
      cities.add(route.to);
    });
    return Array.from(cities).sort();
  }

  /**
   * Verifica si existe una ruta entre dos ciudades
   */
  routeExists(from: string, to: string): boolean {
    return this.findDistance(from, to) !== null;
  }
}
