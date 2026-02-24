/**
 * Use case: Get list of Argentine locations.
 * For the client location selector (data source to filter offers).
 */

import type { ILocationsService } from '../../domain/ports/ILocationsService';
import type { Localidad } from '../../domain/entities/Location';

interface Deps {
  servicioLocalidades: ILocationsService;
}

export async function obtenerLocalidades({
  servicioLocalidades
}: Deps): Promise<Localidad[]> {
  return servicioLocalidades.listarLocalidades();
}
