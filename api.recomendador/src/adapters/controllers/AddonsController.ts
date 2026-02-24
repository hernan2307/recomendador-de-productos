/**
 * HTTP controller: Add-ons.
 * Lists add-ons compatible with product type (Tv, Internet, Combo).
 */

import type { Request, Response } from 'express';
import { obtenerAdicionalesPorTipo, type TipoParam } from '../../application/addons/getAddonsByType';
import * as container from '../config/container';
import { toAddonsDTO } from '../dtos/AddonDTO';

const TIPOS_VALIDOS: TipoParam[] = ['Tv', 'Internet', 'Combo'];

/**
 * GET /api/adicionales?tipo=Tv
 * Query: tipo = 'Tv' | 'Internet' | 'Combo'
 */
export async function obtenerPorTipo(req: Request, res: Response): Promise<void> {
  try {
    const { tipo } = req.query;
    const tipoParam =
      typeof tipo === 'string' && (TIPOS_VALIDOS as readonly string[]).includes(tipo)
        ? (tipo as TipoParam)
        : undefined;
    const addons = await obtenerAdicionalesPorTipo(
      { repositorioAdicionales: container.repositorioAdicionales },
      tipoParam
    );
    res.json(toAddonsDTO(addons));
  } catch (error) {
    console.error('Error fetching add-ons:', error);
    res.status(500).json({ error: 'Failed to fetch add-ons' });
  }
}
