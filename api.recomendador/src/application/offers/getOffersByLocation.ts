/**
 * Caso de uso: Obtener ofertas (productos) por localidad del cliente.
 * Filtra por columna DISPONIBILIDAD: CABA o Resto Pais.
 */

import type { IProductRepository } from '../../domain/ports/IProductRepository';
import type { Producto } from '../../domain/entities/Product';
import type { Disponibilidad } from '../../domain/entities/Location';

/** Dependencias del caso de uso: repositorio de productos. */
interface Deps {
  repositorioProductos: IProductRepository;
}

const DISPONIBILIDADES_VALIDAS: Disponibilidad[] = ['CABA', 'Resto Pais'];

/**
 * Obtiene las ofertas (productos) disponibles para una zona geográfica.
 * Filtra por disponibilidad según la localidad del cliente (CABA o Resto Pais).
 *
 * @param deps - Objeto con el repositorio de productos inyectado.
 * @param disponibilidad - 'CABA' | 'Resto Pais'. Si es inválido o undefined, devuelve [].
 * @returns Lista de productos/ofertas para esa disponibilidad.
 */
export async function obtenerOfertasPorLocalidad(
  { repositorioProductos }: Deps,
  disponibilidad: string | undefined
): Promise<Producto[]> {
  if (
    !disponibilidad ||
    !(DISPONIBILIDADES_VALIDAS as readonly string[]).includes(disponibilidad)
  ) {
    return [];
  }
  return repositorioProductos.obtenerPorDisponibilidad(
    disponibilidad as Disponibilidad
  );
}
