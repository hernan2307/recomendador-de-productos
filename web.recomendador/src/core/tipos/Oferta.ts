/** Tipo de producto: Combo, Tv (Flow) o Internet (Personal). */
export type TipoProducto = 'Combo' | 'Tv' | 'Internet'

/**
 * Oferta tal como la devuelve la API (camelCase).
 * Representa un producto disponible para una zona (CABA / Resto Pais).
 */
export interface Oferta {
  id: number
  disponibilidad: string
  tipo: TipoProducto | string
  nombre: string
  precioLista: number
  promo: string | null
  idPromo: string | null
  precioFinal: number
}

