/**
 * Domain port (interface): Locations service.
 * Returns Argentine locations for the selector.
 * Each location must indicate availability: 'CABA' or 'Resto Pais'.
 */

import type { Localidad } from '../entities/Location';

export interface ILocationsService {
  listarLocalidades(): Promise<Localidad[]>;
}
