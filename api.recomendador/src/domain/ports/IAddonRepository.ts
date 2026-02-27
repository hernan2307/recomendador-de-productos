/**
 * Puerto de dominio (interfaz): Repositorio de adicionales.
 * Implementado por la infraestructura (ej. MySQL).
 */

import type { Adicional } from '../entities/Addon';
import type { TipoCompatible } from '../entities/Addon';

/** Contrato del repositorio de adicionales; implementado por infraestructura (ej. MySQL). */
export interface IAddonRepository {
  /**
   * Obtiene los adicionales compatibles con un tipo (Tv o Internet).
   * @param tipo - Tipo compatible: 'Tv' o 'Internet'.
   * @returns Lista de adicionales para ese tipo.
   */
  obtenerPorTipoCompatible(tipo: TipoCompatible): Promise<Adicional[]>;
}
