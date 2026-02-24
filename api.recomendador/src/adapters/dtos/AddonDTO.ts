/**
 * DTO para la respuesta de adicionales (add-ons).
 * Contrato de la API; independiente del modelo de dominio.
 */

export interface AddonDTO {
  id: number;
  tipoCompatible: string;
  nombre: string;
  precioLista: number;
  promo: string | null;
  idPromo: string | null;
  precioFinal: number;
}

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

export function toAddonsDTO(adicionales: Array<{ id: number; tipo_compatible: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }>): AddonDTO[] {
  return adicionales.map(toAddonDTO);
}
