/**
 * DTO para la respuesta de ofertas (productos).
 * Contrato de la API; independiente del modelo de dominio.
 */

/** Contrato de respuesta de la API para una oferta (camelCase). */
export interface OfferDTO {
  id: number;
  disponibilidad: string;
  tipo: string;
  nombre: string;
  precioLista: number;
  promo: string | null;
  idPromo: string | null;
  precioFinal: number;
}

/**
 * Convierte una entidad/producto de dominio a OfferDTO (snake_case → camelCase).
 * @param producto - Objeto con campos en snake_case (dominio o fila BD).
 * @returns DTO para la respuesta HTTP.
 */
export function toOfferDTO(producto: { id: number; disponibilidad: string; tipo: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }): OfferDTO {
  return {
    id: producto.id,
    disponibilidad: producto.disponibilidad,
    tipo: producto.tipo,
    nombre: producto.nombre,
    precioLista: producto.precio_lista,
    promo: producto.promo,
    idPromo: producto.id_promo,
    precioFinal: producto.precio_final
  };
}

/**
 * Convierte un array de productos a array de OfferDTO.
 * @param productos - Lista de productos (dominio o filas BD).
 * @returns Array de DTOs para la respuesta HTTP.
 */
export function toOffersDTO(productos: Array<{ id: number; disponibilidad: string; tipo: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }>): OfferDTO[] {
  return productos.map(toOfferDTO);
}
