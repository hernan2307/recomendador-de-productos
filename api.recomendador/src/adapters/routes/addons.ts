/**
 * HTTP routes: Add-ons (by product type)
 */

import express from 'express';
import { obtenerPorTipo } from '../controllers/AddonsController';

const router = express.Router();
router.get('/', obtenerPorTipo);

export default router;
