/**
 * DTO para la respuesta de localidades.
 * Contrato de la API; independiente del modelo de dominio.
 */

/** Contrato de respuesta de la API para una localidad. */
export interface LocationDTO {
  id: string;
  nombre: string;
  disponibilidad: string;
}

/**
 * Convierte una entidad Localidad de dominio a LocationDTO.
 * @param localidad - Objeto con id, nombre y disponibilidad.
 * @returns DTO para la respuesta HTTP.
 */
export function toLocationDTO(localidad: { id: string; nombre: string; disponibilidad: string }): LocationDTO {
  return {
    id: localidad.id,
    nombre: localidad.nombre,
    disponibilidad: localidad.disponibilidad
  };
}

/**
 * Convierte un array de localidades a array de LocationDTO.
 * @param localidades - Lista de localidades de dominio.
 * @returns Array de DTOs para la respuesta HTTP.
 */
export function toLocationsDTO(localidades: Array<{ id: string; nombre: string; disponibilidad: string }>): LocationDTO[] {
  return localidades.map(toLocationDTO);
}
