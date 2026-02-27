/**
 * Caso de uso: Obtener lista de localidades argentinas.
 * Para el selector de localidad del cliente (fuente de datos para filtrar ofertas).
 */

import type { ILocationsService } from '../../domain/ports/ILocationsService';
import type { Localidad } from '../../domain/entities/Location';

/** Dependencias del caso de uso: servicio de localidades. */
interface Deps {
  servicioLocalidades: ILocationsService;
}

/**
 * Obtiene la lista de localidades argentinas para el selector del cliente.
 *
 * @param deps - Objeto con el servicio de localidades inyectado.
 * @returns Lista de localidades con id, nombre y disponibilidad (CABA / Resto Pais).
 */
export async function obtenerLocalidades({
  servicioLocalidades
}: Deps): Promise<Localidad[]> {
  return servicioLocalidades.listarLocalidades();
}
