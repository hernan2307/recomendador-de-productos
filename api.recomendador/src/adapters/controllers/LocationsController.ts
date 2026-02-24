/**
 * HTTP controller: Locations.
 * Exposes Argentine locations list for the frontend selector.
 */

import type { Request, Response } from 'express';
import { obtenerLocalidades } from '../../application/locations/getLocations';
import * as container from '../config/container';
import { toLocationsDTO } from '../dtos/LocationDTO';

/**
 * GET /api/localidades
 * List all locations (CABA + Rest of country / provinces).
 */
export async function listar(req: Request, res: Response): Promise<void> {
  try {
    const locations = await obtenerLocalidades({
      servicioLocalidades: container.servicioLocalidades
    });
    res.json(toLocationsDTO(locations));
  } catch (error) {
    console.error('Error listing locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
}
