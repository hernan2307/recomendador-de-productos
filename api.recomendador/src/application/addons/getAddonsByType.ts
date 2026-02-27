/**
 * Caso de uso: Obtener adicionales compatibles con el tipo de producto.
 * Cada oferta muestra solo adicionales por TIPO: Tv o Internet (Combo puede mostrar ambos).
 */

import type { IAddonRepository } from '../../domain/ports/IAddonRepository';
import type { Adicional, TipoCompatible } from '../../domain/entities/Addon';
import type { TipoProducto } from '../../domain/entities/Product';

/** Parámetro de tipo de producto o compatible para filtrar adicionales. */
export type TipoParam = TipoCompatible | TipoProducto;

/** Dependencias del caso de uso: repositorio de adicionales. */
interface Deps {
  repositorioAdicionales: IAddonRepository;
}

/**
 * Obtiene los adicionales compatibles con el tipo de producto indicado.
 * Para tipo "Combo" devuelve adicionales de Tv e Internet; para "Tv" o "Internet" solo los de ese tipo.
 *
 * @param deps - Objeto con el repositorio de adicionales inyectado.
 * @param tipo - 'Tv' | 'Internet' | 'Combo'. Si es undefined, devuelve array vacío.
 * @returns Lista de adicionales compatibles con el tipo.
 */
export async function obtenerAdicionalesPorTipo(
  { repositorioAdicionales }: Deps,
  tipo: TipoParam | undefined
): Promise<Adicional[]> {
  if (!tipo) return [];
  if (tipo === 'Combo') {
    const [addonsTv, addonsInternet] = await Promise.all([
      repositorioAdicionales.obtenerPorTipoCompatible('Tv'),
      repositorioAdicionales.obtenerPorTipoCompatible('Internet')
    ]);
    return [...addonsTv, ...addonsInternet];
  }
  if (tipo === 'Tv' || tipo === 'Internet') {
    return repositorioAdicionales.obtenerPorTipoCompatible(tipo);
  }
  return [];
}
