/**
 * Entidad de dominio: Localidad.
 * Representa una localidad argentina (para filtrado geográfico).
 * La disponibilidad del producto se mapea a "CABA" o "Resto Pais" según la localidad.
 */

/** Zona de disponibilidad del producto: CABA o Resto Pais. */
export type Disponibilidad = 'CABA' | 'Resto Pais';

/** Datos planos para construir una Localidad. */
export interface LocalidadData {
  id: string;
  nombre: string;
  disponibilidad: Disponibilidad;
}

/**
 * Entidad de dominio: localidad argentina para filtrado geográfico.
 * La disponibilidad determina qué ofertas se muestran (CABA vs Resto Pais).
 */
export class Localidad {
  id: string;
  nombre: string;
  disponibilidad: Disponibilidad;

  /** Crea una Localidad a partir de LocalidadData. */
  constructor({ id, nombre, disponibilidad }: LocalidadData) {
    this.id = id;
    this.nombre = nombre;
    this.disponibilidad = disponibilidad;
  }
}
