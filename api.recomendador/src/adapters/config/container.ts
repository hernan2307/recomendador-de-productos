/**
 * Contenedor de dependencias (composición).
 * Conecta los casos de uso con las implementaciones de infraestructura.
 */

import { ProductRepositoryMySQL } from '../../infrastructure/repositories/mysql/ProductRepositoryMySQL';
import { AddonRepositoryMySQL } from '../../infrastructure/repositories/mysql/AddonRepositoryMySQL';
import { ArgentinaLocationsService } from '../../infrastructure/services/ArgentinaLocationsService';

/** Repositorio de productos (MySQL); inyectado en casos de uso de ofertas. */
export const repositorioProductos = ProductRepositoryMySQL;
/** Repositorio de adicionales (MySQL); inyectado en casos de uso de adicionales. */
export const repositorioAdicionales = AddonRepositoryMySQL;
/** Servicio de localidades (datos estáticos Argentina); inyectado en getLocations. */
export const servicioLocalidades = ArgentinaLocationsService;
