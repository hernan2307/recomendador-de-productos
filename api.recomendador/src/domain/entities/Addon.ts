/**
 * Entidad de dominio: Adicional.
 * Representa un adicional compatible con tipos de producto Tv o Internet.
 */

export type TipoCompatible = 'Tv' | 'Internet';

export interface AdicionalData {
  id: number;
  tipo_compatible: TipoCompatible;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;
}

export class Adicional {
  id: number;
  tipo_compatible: TipoCompatible;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;

  constructor({
    id,
    tipo_compatible,
    nombre,
    precio_lista,
    promo,
    id_promo,
    precio_final
  }: AdicionalData) {
    this.id = id;
    this.tipo_compatible = tipo_compatible;
    this.nombre = nombre;
    this.precio_lista = precio_lista;
    this.promo = promo ?? null;
    this.id_promo = id_promo ?? null;
    this.precio_final = precio_final;
  }
}
