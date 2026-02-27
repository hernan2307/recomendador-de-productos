/**
 * Puerto de dominio (interfaz): Servicio de localidades.
 * Devuelve las localidades argentinas para el selector.
 * Cada localidad debe indicar disponibilidad: 'CABA' o 'Resto Pais'.
 */

import type { Localidad } from '../entities/Location';

/** Contrato del servicio de localidades; devuelve localidades para el selector. */
export interface ILocationsService {
  /**
   * Lista todas las localidades argentinas con su disponibilidad (CABA / Resto Pais).
   * @returns Lista de localidades.
   */
  listarLocalidades(): Promise<Localidad[]>;
}
