/** Tipo con el que es compatible el adicional (Tv, Internet o Combo para listar ambos). */
export type TipoCompatible = 'Tv' | 'Internet' | 'Combo'

/**
 * Adicional tal como lo devuelve la API (camelCase).
 * Compatible con ofertas Tv o Internet (Combo puede mostrar ambos).
 */
export interface Adicional {
  id: number
  tipoCompatible: TipoCompatible | string
  nombre: string
  precioLista: number
  promo: string | null
  idPromo: string | null
  precioFinal: number
}

