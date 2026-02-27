/**
 * DTO para la respuesta de adicionales (add-ons).
 * Contrato de la API; independiente del modelo de dominio.
 */

/** Contrato de respuesta de la API para un adicional (camelCase). */
export interface AddonDTO {
  id: number;
  tipoCompatible: string;
  nombre: string;
  precioLista: number;
  promo: string | null;
  idPromo: string | null;
  precioFinal: number;
}

/**
 * Convierte una entidad adicional de dominio a AddonDTO (snake_case → camelCase).
 * @param adicional - Objeto con campos en snake_case.
 * @returns DTO para la respuesta HTTP.
 */
export function toAddonDTO(adicional: { id: number; tipo_compatible: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }): AddonDTO {
  return {
    id: adicional.id,
    tipoCompatible: adicional.tipo_compatible,
    nombre: adicional.nombre,
    precioLista: adicional.precio_lista,
    promo: adicional.promo,
    idPromo: adicional.id_promo,
    precioFinal: adicional.precio_final
  };
}

/**
 * Convierte un array de adicionales a array de AddonDTO.
 * @param adicionales - Lista de adicionales de dominio.
 * @returns Array de DTOs para la respuesta HTTP.
 */
export function toAddonsDTO(adicionales: Array<{ id: number; tipo_compatible: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }>): AddonDTO[] {
  return adicionales.map(toAddonDTO);
}
