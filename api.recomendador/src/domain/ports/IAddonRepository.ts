/**
 * Puerto de dominio (interfaz): Repositorio de adicionales.
 * Implementado por la infraestructura (ej. MySQL).
 */

import type { Adicional } from '../entities/Addon';
import type { TipoCompatible } from '../entities/Addon';

export interface IAddonRepository {
  obtenerPorTipoCompatible(tipo: TipoCompatible): Promise<Adicional[]>;
}
