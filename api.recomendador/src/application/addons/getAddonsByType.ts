/**
 * Caso de uso: Obtener adicionales compatibles con el tipo de producto.
 * Cada oferta muestra solo adicionales por TIPO: Tv o Internet (Combo puede mostrar ambos).
 */

import type { IAddonRepository } from '../../domain/ports/IAddonRepository';
import type { Adicional, TipoCompatible } from '../../domain/entities/Addon';
import type { TipoProducto } from '../../domain/entities/Product';

export type TipoParam = TipoCompatible | TipoProducto;

interface Deps {
  repositorioAdicionales: IAddonRepository;
}

/**
 * @param tipo - 'Tv' | 'Internet' | 'Combo' (para Combo se pueden devolver ambos tipos)
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
