/**
 * Puerto de dominio (interfaz): Repositorio de productos.
 * Implementado por la infraestructura (ej. MySQL).
 */

import type { Producto } from '../entities/Product';
import type { Disponibilidad } from '../entities/Location';

/** Contrato del repositorio de productos; implementado por infraestructura (ej. MySQL). */
export interface IProductRepository {
  /**
   * Obtiene todos los productos disponibles para una zona (CABA o Resto Pais).
   * @param disponibilidad - Zona geográfica de disponibilidad.
   * @returns Lista de productos (ofertas) para esa zona.
   */
  obtenerPorDisponibilidad(disponibilidad: Disponibilidad): Promise<Producto[]>;
}
