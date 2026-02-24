/**
 * Domain port (interface): Product repository.
 * Implemented by infrastructure (e.g. MySQL).
 */

import type { Producto } from '../entities/Product';
import type { Disponibilidad } from '../entities/Location';

export interface IProductRepository {
  obtenerPorDisponibilidad(disponibilidad: Disponibilidad): Promise<Producto[]>;
}
