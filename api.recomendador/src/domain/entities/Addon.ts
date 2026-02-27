/**
 * Entidad de dominio: Adicional.
 * Representa un adicional compatible con tipos de producto Tv o Internet.
 */

/** Tipo de producto con el que es compatible el adicional (Tv o Internet). */
export type TipoCompatible = 'Tv' | 'Internet';

/** Datos planos para construir un Adicional (ej. fila de BD). */
export interface AdicionalData {
  id: number;
  tipo_compatible: TipoCompatible;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;
}

/**
 * Entidad de dominio: adicional compatible con Tv o Internet.
 * Usada en casos de uso y repositorios.
 */
export class Adicional {
  id: number;
  tipo_compatible: TipoCompatible;
  nombre: string;
  precio_lista: number;
  promo: string | null;
  id_promo: string | null;
  precio_final: number;

  /** Crea un Adicional a partir de AdicionalData (snake_case). */
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
