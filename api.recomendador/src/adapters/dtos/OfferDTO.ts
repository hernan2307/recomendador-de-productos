/**
 * DTO para la respuesta de ofertas (productos).
 * Contrato de la API; independiente del modelo de dominio.
 */

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

export function toOffersDTO(productos: Array<{ id: number; disponibilidad: string; tipo: string; nombre: string; precio_lista: number; promo: string | null; id_promo: string | null; precio_final: number }>): OfferDTO[] {
  return productos.map(toOfferDTO);
}
