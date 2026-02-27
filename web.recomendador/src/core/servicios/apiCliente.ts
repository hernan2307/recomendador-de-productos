import { type Adicional, type TipoCompatible } from '../tipos/Adicional'
import { type Localidad } from '../tipos/Localidad'
import { type Oferta } from '../tipos/Oferta'

/** URL base de la API; se configura con VITE_API_URL (por defecto localhost:3000/api). */
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

/**
 * Verifica que la respuesta sea ok y parsea el JSON.
 * @param respuesta - Response de fetch.
 * @returns JSON parseado como T.
 * @throws Error si respuesta.ok es false.
 */
async function manejarRespuesta<T>(respuesta: Response): Promise<T> {
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`)
  }
  return (await respuesta.json()) as T
}

/**
 * Obtiene la lista de localidades desde la API (GET /api/localidades).
 * @returns Lista de localidades con id, nombre y disponibilidad.
 */
export async function obtenerLocalidades(): Promise<Localidad[]> {
  const res = await fetch(`${BASE_URL}/localidades`)
  return manejarRespuesta<Localidad[]>(res)
}

/**
 * Obtiene ofertas filtradas por disponibilidad (GET /api/ofertas?disponibilidad=...).
 * @param disponibilidad - 'CABA' | 'Resto Pais' o undefined (trae sin filtrar por zona).
 * @returns Lista de ofertas para esa zona.
 */
export async function obtenerOfertasPorDisponibilidad(
  disponibilidad: string | undefined,
): Promise<Oferta[]> {
  const parametro = disponibilidad ? `?disponibilidad=${encodeURIComponent(disponibilidad)}` : ''
  const res = await fetch(`${BASE_URL}/ofertas${parametro}`)
  return manejarRespuesta<Oferta[]>(res)
}

/**
 * Obtiene adicionales compatibles con un tipo (GET /api/adicionales?tipo=...).
 * @param tipo - 'Tv' | 'Internet' | 'Combo' (Combo devuelve ambos).
 * @returns Lista de adicionales compatibles.
 */
export async function obtenerAdicionalesPorTipo(tipo: TipoCompatible): Promise<Adicional[]> {
  const res = await fetch(`${BASE_URL}/adicionales?tipo=${encodeURIComponent(tipo)}`)
  return manejarRespuesta<Adicional[]>(res)
}

