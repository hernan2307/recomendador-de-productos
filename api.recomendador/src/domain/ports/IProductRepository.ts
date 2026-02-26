/**
 * Puerto de dominio (interfaz): Repositorio de productos.
 * Implementado por la infraestructura (ej. MySQL).
 */

import type { Producto } from '../entities/Product';
import type { Disponibilidad } from '../entities/Location';

export interface IProductRepository {
  obtenerPorDisponibilidad(disponibilidad: Disponibilidad): Promise<Producto[]>;
}
