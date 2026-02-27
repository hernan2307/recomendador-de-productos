/**
 * Rutas HTTP: Ofertas (productos por localidad).
 * Montadas en app bajo /api/ofertas.
 * GET /?disponibilidad=CABA|Resto Pais → ofertas para esa zona.
 */

import express from 'express';
import { obtenerPorLocalidad } from '../controllers/OffersController';

const router = express.Router();
/** GET / - Ofertas filtradas por query disponibilidad. */
router.get('/', obtenerPorLocalidad);

export default router;
