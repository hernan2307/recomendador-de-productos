/**
 * Puerto de dominio (interfaz): Servicio de localidades.
 * Devuelve las localidades argentinas para el selector.
 * Cada localidad debe indicar disponibilidad: 'CABA' o 'Resto Pais'.
 */

import type { Localidad } from '../entities/Location';

export interface ILocationsService {
  listarLocalidades(): Promise<Localidad[]>;
}
