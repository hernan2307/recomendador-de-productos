/**
 * Rutas HTTP: Localidades.
 * Montadas en app bajo /api/localidades.
 * GET / → listar localidades.
 */

import express from 'express';
import { listar } from '../controllers/LocationsController';

const router = express.Router();
/** GET / - Lista todas las localidades argentinas. */
router.get('/', listar);

export default router;
