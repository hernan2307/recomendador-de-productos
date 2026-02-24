/**
 * Dependency container (composition).
 * Wires use cases to infrastructure implementations.
 */

import { ProductRepositoryMySQL } from '../../infrastructure/repositories/mysql/ProductRepositoryMySQL';
import { AddonRepositoryMySQL } from '../../infrastructure/repositories/mysql/AddonRepositoryMySQL';
import { ArgentinaLocationsService } from '../../infrastructure/services/ArgentinaLocationsService';

export const repositorioProductos = ProductRepositoryMySQL;
export const repositorioAdicionales = AddonRepositoryMySQL;
export const servicioLocalidades = ArgentinaLocationsService;
