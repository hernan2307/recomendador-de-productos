/**
 * Contexto de React para el carrito de cotización.
 * Expone ítems, totales (primera factura, ahorro) y acciones (agregar, quitar, vaciar).
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Adicional } from '../tipos/Adicional'
import type { Oferta } from '../tipos/Oferta'

/** Discriminante de ítem: oferta o adicional. */
export type TipoItemCarrito = 'OFERTA' | 'ADICIONAL'

/** Campos comunes de un ítem en el carrito. */
export interface ItemCarritoBase {
  id: string
  tipo: TipoItemCarrito
  titulo: string
  descripcion: string
  precioLista: number
  precioFinal: number
}

/** Ítem que representa una oferta agregada al carrito. */
export interface ItemCarritoOferta extends ItemCarritoBase {
  tipo: 'OFERTA'
  ofertaId: number
}

/** Ítem que representa un adicional agregado al carrito (opcionalmente asociado a una oferta). */
export interface ItemCarritoAdicional extends ItemCarritoBase {
  tipo: 'ADICIONAL'
  adicionalId: number
  ofertaAsociadaId?: number
}

export type ItemCarrito = ItemCarritoOferta | ItemCarritoAdicional

/** Valor del contexto: estado del carrito y funciones para modificarlo. */
export interface CarritoContextoValor {
  items: ItemCarrito[]
  primeraFactura: number
  ahorroTotal: number
  cantidadItems: number
  agregarOfertaAlCarrito(oferta: Oferta): void
  agregarAdicionalAlCarrito(adicional: Adicional, ofertaId?: number): void
  eliminarItemDelCarrito(id: string): void
  vaciarCarrito(): void
}

const CarritoContexto = createContext<CarritoContextoValor | undefined>(undefined)

/** Proveedor del contexto de carrito; debe envolver la parte de la app que use useCarrito. */
export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([])

  const valor = useMemo<CarritoContextoValor>(() => {
    const primeraFactura = items.reduce((acum, item) => acum + (Number(item.precioFinal)), 0)
    const ahorroTotal = items.reduce(
      (acum, item) => acum + (item.precioLista - item.precioFinal),
      0,
    )

    function agregarOfertaAlCarrito(oferta: Oferta): void {
      setItems((actual) => {
        const id = `oferta-${oferta.id}-${Date.now()}`
        const nuevo: ItemCarritoOferta = {
          id,
          tipo: 'OFERTA',
          ofertaId: oferta.id,
          titulo: oferta.nombre,
          descripcion: oferta.tipo,
          precioLista: oferta.precioLista,
          precioFinal: oferta.precioFinal,
        }
        return [...actual, nuevo]
      })
    }

    function agregarAdicionalAlCarrito(adicional: Adicional, ofertaId?: number): void {
      setItems((actual) => {
        const id = `adicional-${adicional.id}-${Date.now()}`
        const nuevo: ItemCarritoAdicional = {
          id,
          tipo: 'ADICIONAL',
          adicionalId: adicional.id,
          ofertaAsociadaId: ofertaId,
          titulo: adicional.nombre,
          descripcion: ofertaId ? `Adicional para oferta #${ofertaId}` : 'Adicional',
          precioLista: adicional.precioLista,
          precioFinal: adicional.precioFinal,
        }
        return [...actual, nuevo]
      })
    }

    function eliminarItemDelCarrito(id: string): void {
      setItems((actual) => actual.filter((item) => item.id !== id))
    }

    function vaciarCarrito(): void {
      setItems([])
    }

    return {
      items,
      primeraFactura,
      ahorroTotal,
      cantidadItems: items.length,
      agregarOfertaAlCarrito,
      agregarAdicionalAlCarrito,
      eliminarItemDelCarrito,
      vaciarCarrito,
    }
  }, [items])

  return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>
}

/**
 * Hook para acceder al carrito. Debe usarse dentro de CarritoProvider.
 * @returns Valor del contexto (items, totales, acciones).
 * @throws Error si se usa fuera de CarritoProvider.
 */
export function useCarrito(): CarritoContextoValor {
  const ctx = useContext(CarritoContexto)
  if (ctx == null) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  }
  return ctx
}

