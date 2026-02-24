/**
 * Use case: Get add-ons compatible with product type.
 * Each offer shows only add-ons by TYPE: Tv or Internet (Combo can show both).
 */

import type { IAddonRepository } from '../../domain/ports/IAddonRepository';
import type { Adicional, TipoCompatible } from '../../domain/entities/Addon';
import type { TipoProducto } from '../../domain/entities/Product';

export type TipoParam = TipoCompatible | TipoProducto;

interface Deps {
  repositorioAdicionales: IAddonRepository;
}

/**
 * @param tipo - 'Tv' | 'Internet' | 'Combo' (for Combo both types can be returned)
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
