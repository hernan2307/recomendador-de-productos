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

/**
 * Implementación de ILocationsService con datos estáticos de Argentina (JSON).
 * Resultado cacheado en memoria tras la primera carga.
 */
export const ArgentinaLocationsService: ILocationsService = {
  /** Devuelve todas las localidades; usa cache en memoria. */
  async listarLocalidades(): Promise<Localidad[]> {
    if (cache) return cache;
    cache = data.map((item) => new Localidad(item));
    return cache;
  }
};
