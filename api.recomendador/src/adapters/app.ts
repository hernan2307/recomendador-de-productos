/**
 * API entry point - Personal Services Recommender.
 * Express + Clean Architecture (domain, application, infrastructure, presentation).
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import locationsRoutes from './routes/locations';
import offersRoutes from './routes/offers';
import addonsRoutes from './routes/addons';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/localidades', locationsRoutes);
app.use('/api/ofertas', offersRoutes);
app.use('/api/adicionales', addonsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Personal Recommender API' });
});

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});

export default app;
