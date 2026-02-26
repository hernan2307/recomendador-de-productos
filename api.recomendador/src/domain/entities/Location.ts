/**
 * Entidad de dominio: Localidad.
 * Representa una localidad argentina (para filtrado geográfico).
 * La disponibilidad del producto se mapea a "CABA" o "Resto Pais" según la localidad.
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
