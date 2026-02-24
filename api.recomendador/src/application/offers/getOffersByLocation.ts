/**
 * Use case: Get offers (products) by client location.
 * Filters by DISPONIBILIDAD column: CABA or Resto Pais.
 */

import type { IProductRepository } from '../../domain/ports/IProductRepository';
import type { Producto } from '../../domain/entities/Product';
import type { Disponibilidad } from '../../domain/entities/Location';

interface Deps {
  repositorioProductos: IProductRepository;
}

const DISPONIBILIDADES_VALIDAS: Disponibilidad[] = ['CABA', 'Resto Pais'];

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
