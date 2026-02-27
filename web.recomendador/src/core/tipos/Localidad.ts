/**
 * Localidad tal como la devuelve la API.
 * Usada en el selector para filtrar ofertas por disponibilidad (CABA / Resto Pais).
 */
export interface Localidad {
  id: string
  nombre: string
  disponibilidad: 'CABA' | 'Resto Pais' | string
}

