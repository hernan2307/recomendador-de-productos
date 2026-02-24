/**
 * HTTP controller: Offers (products).
 * Filters offers by availability according to client location.
 */

import type { Request, Response } from 'express';
import { obtenerOfertasPorLocalidad } from '../../application/offers/getOffersByLocation';
import * as container from '../config/container';
import { toOffersDTO } from '../dtos/OfferDTO';

/**
 * GET /api/ofertas?disponibilidad=CABA
 * Query: disponibilidad = 'CABA' | 'Resto Pais' (based on selected location).
 */
export async function obtenerPorLocalidad(req: Request, res: Response): Promise<void> {
  try {
    const { disponibilidad } = req.query;
    const offers = await obtenerOfertasPorLocalidad(
      { repositorioProductos: container.repositorioProductos },
      disponibilidad as string | undefined
    );
    res.json(toOffersDTO(offers));
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
}
