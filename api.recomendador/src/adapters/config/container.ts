/**
 * Contenedor de dependencias (composición).
 * Conecta los casos de uso con las implementaciones de infraestructura.
 */

import { ProductRepositoryMySQL } from '../../infrastructure/repositories/mysql/ProductRepositoryMySQL';
import { AddonRepositoryMySQL } from '../../infrastructure/repositories/mysql/AddonRepositoryMySQL';
import { ArgentinaLocationsService } from '../../infrastructure/services/ArgentinaLocationsService';

export const repositorioProductos = ProductRepositoryMySQL;
export const repositorioAdicionales = AddonRepositoryMySQL;
export const servicioLocalidades = ArgentinaLocationsService;
