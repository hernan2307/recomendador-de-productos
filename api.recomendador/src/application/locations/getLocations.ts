/**
 * Caso de uso: Obtener lista de localidades argentinas.
 * Para el selector de localidad del cliente (fuente de datos para filtrar ofertas).
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
