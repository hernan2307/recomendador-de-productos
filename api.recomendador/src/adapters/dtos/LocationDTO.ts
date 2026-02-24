/**
 * DTO para la respuesta de localidades.
 * Contrato de la API; independiente del modelo de dominio.
 */

export interface LocationDTO {
  id: string;
  nombre: string;
  disponibilidad: string;
}

export function toLocationDTO(localidad: { id: string; nombre: string; disponibilidad: string }): LocationDTO {
  return {
    id: localidad.id,
    nombre: localidad.nombre,
    disponibilidad: localidad.disponibilidad
  };
}

export function toLocationsDTO(localidades: Array<{ id: string; nombre: string; disponibilidad: string }>): LocationDTO[] {
  return localidades.map(toLocationDTO);
}
