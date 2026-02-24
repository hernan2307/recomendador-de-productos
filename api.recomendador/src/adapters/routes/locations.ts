/**
 * HTTP routes: Locations
 */

import express from 'express';
import { listar } from '../controllers/LocationsController';

const router = express.Router();
router.get('/', listar);

export default router;
