-- Database schema for Personal Services Recommender
-- Run this script in MySQL to create the database and tables

CREATE DATABASE IF NOT EXISTS recomendador_personal;
USE recomendador_personal;

-- Products table (offers: Tv, Internet, Combo)
CREATE TABLE productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disponibilidad ENUM('CABA', 'Resto Pais') NOT NULL COMMENT 'CABA or Resto Pais by coverage',
  tipo ENUM('Tv', 'Internet', 'Combo') NOT NULL COMMENT 'Tv, Internet or Combo (Tv+Internet)',
  nombre VARCHAR(255) NOT NULL,
  precio_lista DECIMAL(10, 2) NOT NULL,
  promo VARCHAR(100) DEFAULT NULL COMMENT 'e.g. 6M X 67%',
  id_promo VARCHAR(50) DEFAULT NULL,
  precio_final DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add-ons table (compatible by type: Tv or Internet)
CREATE TABLE adicionales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_compatible ENUM('Tv', 'Internet') NOT NULL COMMENT 'Product type it is compatible with',
  nombre VARCHAR(255) NOT NULL,
  precio_lista DECIMAL(10, 2) NOT NULL,
  promo VARCHAR(100) DEFAULT NULL,
  id_promo VARCHAR(50) DEFAULT NULL,
  precio_final DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common filters
CREATE INDEX idx_productos_disponibilidad ON productos(disponibilidad);
CREATE INDEX idx_productos_tipo ON productos(tipo);
CREATE INDEX idx_adicionales_tipo_compatible ON adicionales(tipo_compatible);

-- Datos: productos (CABA, RESTO PAIS = una fila por cada disponibilidad)
INSERT INTO productos (disponibilidad, tipo, nombre, precio_lista, promo, id_promo, precio_final) VALUES
('CABA', 'Tv', 'Flow Full con Deco', 33070.00, '6M X 37%', 'VTA_TV_1', 20834.00),
('Resto Pais', 'Tv', 'Flow Full con Deco', 33070.00, '6M X 37%', 'VTA_TV_1', 20834.00),
('CABA', 'Tv', 'Flow Full sin Deco', 33400.00, '6M X 60%', 'VTA_TV_2', 13360.00),
('Resto Pais', 'Tv', 'Flow Full sin Deco', 33400.00, '6M X 60%', 'VTA_TV_2', 13360.00),
('CABA', 'Internet', 'Internet 300 MB', 75260.00, '6M X 67%', 'VTA_INT_300', 24836.00),
('Resto Pais', 'Internet', 'Internet 300 MB', 75260.00, '6M X 67%', 'VTA_INT_300', 24836.00),
('CABA', 'Combo', 'Flow Full sin Deco + Internet 300 MB', 108660.00, '6M X 67%', 'VTA_COMBO_1_300', 35858.00),
('Resto Pais', 'Combo', 'Flow Full sin Deco + Internet 300 MB', 108660.00, '6M X 67%', 'VTA_COMBO_1_300', 35858.00),
('CABA', 'Combo', 'Flow Full con Deco + Internet 300 MB', 110850.00, '6M X 62%', 'VTA_COMBO_2_300', 42123.00),
('Resto Pais', 'Combo', 'Flow Full con Deco + Internet 300 MB', 110850.00, '6M X 62%', 'VTA_COMBO_2_300', 42123.00),
('CABA', 'Internet', 'Internet 600 MB', 88240.00, '6M X 67%', 'VTA_INT_600', 29119.00),
('CABA', 'Combo', 'Flow Full sin Deco + Internet 600 MB', 123830.00, '6M X 62%', 'VTA_COMBO_1_600', 47055.00),
('CABA', 'Combo', 'Flow Full con Deco + Internet 600 MB', 121640.00, '6M X 67%', 'VTA_COMBO_2_600', 40141.00);

-- Datos: adicionales
INSERT INTO adicionales (tipo_compatible, nombre, precio_lista, promo, id_promo, precio_final) VALUES
('Tv', 'Fútbol', 22135.00, NULL, NULL, 22135.00),
('Tv', 'HBO', 11080.00, '3M X 50%', 'ADICIONAL_HBO', 5540.00),
('Tv', 'Universal', 10499.00, '3M X 100%', 'ADICIONAL_UNIVERSAL', 0.00),
('Tv', 'Paramount', 4635.00, '3M X 100%', 'ADICIONAL_PARAMOUNT', 0.00),
('Tv', 'Hot Pack', 11870.00, '3M X 50%', 'ADICIONAL_HOT_PACK', 5935.00),
('Internet', 'Extensor Wifi', 2500.00, NULL, NULL, 2500.00),
('Internet', 'Personal Fiber Security', 3298.00, NULL, NULL, 3298.00);
