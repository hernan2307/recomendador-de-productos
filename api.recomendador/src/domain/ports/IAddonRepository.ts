/**
 * Domain port (interface): Add-ons repository.
 * Implemented by infrastructure (e.g. MySQL).
 */

import type { Adicional } from '../entities/Addon';
import type { TipoCompatible } from '../entities/Addon';

export interface IAddonRepository {
  obtenerPorTipoCompatible(tipo: TipoCompatible): Promise<Adicional[]>;
}
