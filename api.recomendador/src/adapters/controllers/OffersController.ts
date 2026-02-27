/**
 * Controlador HTTP: Ofertas (productos).
 * Filtra ofertas por disponibilidad según la localidad del cliente.
 */

import type { Request, Response } from 'express';
import { obtenerOfertasPorLocalidad } from '../../application/offers/getOffersByLocation';
import * as container from '../config/container';
import { toOffersDTO } from '../dtos/OfferDTO';

/**
 * GET /api/ofertas?disponibilidad=CABA
 * Lista ofertas filtradas por disponibilidad según la localidad. Query: disponibilidad = 'CABA' | 'Resto Pais'.
 *
 * @param req - Request de Express; se usa req.query.disponibilidad.
 * @param res - Response; envía JSON con array de OfferDTO o 500 en error.
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
