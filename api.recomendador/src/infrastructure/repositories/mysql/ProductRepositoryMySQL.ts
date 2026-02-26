/**
 * Implementación del repositorio de productos sobre MySQL.
 */

import { pool } from './connection';
import { Producto } from '../../../domain/entities/Product';
import type { ProductoData } from '../../../domain/entities/Product';
import type { IProductRepository } from '../../../domain/ports/IProductRepository';
import type { Disponibilidad } from '../../../domain/entities/Location';

export const ProductRepositoryMySQL: IProductRepository = {
  async obtenerPorDisponibilidad(
    disponibilidad: Disponibilidad
  ): Promise<Producto[]> {
    const [rows] = await pool.execute(
      'SELECT id, disponibilidad, tipo, nombre, precio_lista, promo, id_promo, precio_final FROM productos WHERE disponibilidad = ? ORDER BY tipo, nombre',
      [disponibilidad]
    );
    return (rows as ProductoData[]).map((row) => new Producto(row));
  }
};
