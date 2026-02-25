export type TipoCompatible = 'Tv' | 'Internet' | 'Combo'

export interface Adicional {
  id: number
  tipoCompatible: TipoCompatible | string
  nombre: string
  precioLista: number
  promo: string | null
  idPromo: string | null
  precioFinal: number
}

