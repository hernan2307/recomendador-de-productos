/**
 * Controlador HTTP: Localidades.
 * Expone la lista de localidades argentinas para el selector del frontend.
 */

import type { Request, Response } from 'express';
import { obtenerLocalidades } from '../../application/locations/getLocations';
import * as container from '../config/container';
import { toLocationsDTO } from '../dtos/LocationDTO';

/**
 * GET /api/localidades
 * Lista todas las localidades (CABA + resto del país / provincias).
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
