/**
 * Rutas HTTP: Ofertas (productos por localidad)
 */

import express from 'express';
import { obtenerPorLocalidad } from '../controllers/OffersController';

const router = express.Router();
router.get('/', obtenerPorLocalidad);

export default router;
