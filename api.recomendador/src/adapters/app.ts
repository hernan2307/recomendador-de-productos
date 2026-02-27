/**
 * Punto de entrada de la API - Recomendador de servicios personales.
 * Express + Arquitectura limpia (dominio, aplicación, infraestructura, presentación).
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import locationsRoutes from './routes/locations';
import offersRoutes from './routes/offers';
import addonsRoutes from './routes/addons';

dotenv.config();

const app = express();
/** Puerto del servidor; por defecto 3000. */
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/localidades', locationsRoutes);
app.use('/api/ofertas', offersRoutes);
app.use('/api/adicionales', addonsRoutes);

/**
 * Health check: GET /api/health
 * Responde con estado ok para verificar que la API está en ejecución.
 */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Personal Recommender API' });
});

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});

export default app;
