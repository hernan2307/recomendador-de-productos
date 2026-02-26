/**
 * Implementación del repositorio de adicionales sobre MySQL.
 */

import { pool } from './connection';
import { Adicional } from '../../../domain/entities/Addon';
import type { AdicionalData } from '../../../domain/entities/Addon';
import type { IAddonRepository } from '../../../domain/ports/IAddonRepository';
import type { TipoCompatible } from '../../../domain/entities/Addon';

export const AddonRepositoryMySQL: IAddonRepository = {
  async obtenerPorTipoCompatible(tipo: TipoCompatible): Promise<Adicional[]> {
    const [rows] = await pool.execute(
      'SELECT id, tipo_compatible, nombre, precio_lista, promo, id_promo, precio_final FROM adicionales WHERE tipo_compatible = ? ORDER BY nombre',
      [tipo]
    );
    return (rows as AdicionalData[]).map((row) => new Adicional(row));
  }
};
