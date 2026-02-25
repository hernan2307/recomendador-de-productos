import { type Adicional, type TipoCompatible } from '../tipos/Adicional'
import { type Localidad } from '../tipos/Localidad'
import { type Oferta } from '../tipos/Oferta'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

async function manejarRespuesta<T>(respuesta: Response): Promise<T> {
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`)
  }
  return (await respuesta.json()) as T
}

export async function obtenerLocalidades(): Promise<Localidad[]> {
  const res = await fetch(`${BASE_URL}/localidades`)
  return manejarRespuesta<Localidad[]>(res)
}

export async function obtenerOfertasPorDisponibilidad(
  disponibilidad: string | undefined,
): Promise<Oferta[]> {
  const parametro = disponibilidad ? `?disponibilidad=${encodeURIComponent(disponibilidad)}` : ''
  const res = await fetch(`${BASE_URL}/ofertas${parametro}`)
  return manejarRespuesta<Oferta[]>(res)
}

export async function obtenerAdicionalesPorTipo(tipo: TipoCompatible): Promise<Adicional[]> {
  const res = await fetch(`${BASE_URL}/adicionales?tipo=${encodeURIComponent(tipo)}`)
  return manejarRespuesta<Adicional[]>(res)
}

