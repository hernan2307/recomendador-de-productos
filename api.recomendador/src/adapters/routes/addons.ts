/**
 * Rutas HTTP: Adicionales (por tipo de producto).
 * Montadas en app bajo /api/adicionales.
 * GET /?tipo=Tv|Internet|Combo → adicionales compatibles.
 */

import express from 'express';
import { obtenerPorTipo } from '../controllers/AddonsController';

const router = express.Router();
/** GET / - Adicionales filtrados por query tipo. */
router.get('/', obtenerPorTipo);

export default router;
