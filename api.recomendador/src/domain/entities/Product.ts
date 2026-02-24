/**
 * Domain entity: Product (service offer).
 * Represents a Tv, Internet or Combo offer by geographic availability.
 */

import type { Disponibilidad } from './Location';

export type TipoProducto = 'Tv' | 'Internet' | 'Combo';

export interface ProductoData {
  id: number;
  disponibilidad: Disponibilidad;
  tipo: TipoProducto;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;
}

export class Producto {
  id: number;
  disponibilidad: Disponibilidad;
  tipo: TipoProducto;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;

  constructor({
    id,
    disponibilidad,
    tipo,
    nombre,
    precio_lista,
    promo,
    id_promo,
    precio_final
  }: ProductoData) {
    this.id = id;
    this.disponibilidad = disponibilidad;
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio_lista = precio_lista;
    this.promo = promo ?? null;
    this.id_promo = id_promo ?? null;
    this.precio_final = precio_final;
  }
}
