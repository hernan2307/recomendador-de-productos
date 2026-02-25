export type TipoProducto = 'Combo' | 'Tv' | 'Internet'

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

