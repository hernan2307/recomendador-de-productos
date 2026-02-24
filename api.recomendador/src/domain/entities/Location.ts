/**
 * Domain entity: Location.
 * Represents an Argentine location (for geographic filtering).
 * Product availability is mapped to "CABA" or "Resto Pais" based on location.
 */

export type Disponibilidad = 'CABA' | 'Resto Pais';

export interface LocalidadData {
  id: string;
  nombre: string;
  disponibilidad: Disponibilidad;
}

export class Localidad {
  id: string;
  nombre: string;
  disponibilidad: Disponibilidad;

  constructor({ id, nombre, disponibilidad }: LocalidadData) {
    this.id = id;
    this.nombre = nombre;
    this.disponibilidad = disponibilidad;
  }
}
