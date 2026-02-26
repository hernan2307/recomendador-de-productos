/**
 * Implementación del servicio de localidades: lista Argentina.
 * Fuente de datos: JSON estático (puede reemplazarse por API externa, ej. GeoRef).
 */

import { Localidad } from '../../domain/entities/Location';
import type { ILocationsService } from '../../domain/ports/ILocationsService';
import type { LocalidadData } from '../../domain/entities/Location';
import locationsData from './data/argentinaLocations.json';

let cache: Localidad[] | null = null;

const data = locationsData as LocalidadData[];

export const ArgentinaLocationsService: ILocationsService = {
  async listarLocalidades(): Promise<Localidad[]> {
    if (cache) return cache;
    cache = data.map((item) => new Localidad(item));
    return cache;
  }
};
