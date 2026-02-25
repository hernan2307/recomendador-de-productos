## Recomendador de productos

Desafío técnico para un **recomendador de servicios de Personal** compuesto por:

- **`api.recomendador`**: API REST en Node.js + TypeScript + Express con Clean Architecture y MySQL.
- **`web.recomendador`**: frontend en React + TypeScript + Vite que consume la API y permite cotizar ofertas y adicionales.

### Estructura del repositorio

- `api.recomendador`: código fuente de la API, casos de uso y acceso a datos (MySQL).
- `web.recomendador`: aplicación web SPA para operadores/usuarios finales.

Cada carpeta tiene su propio `README.md` con más detalle de instalación y uso.

### Requerimientos generales

- **Node.js 18+**
- **MySQL 8** (o compatible) para la API

### Puesta en marcha rápida

1. **Clonar el repositorio** y situarse en la raíz:

   ```bash
   git clone <url-del-repo>
   cd recomendador-de-productos
   ```

2. **Configurar y levantar la API** (`api.recomendador`):

   - Crear la base de datos ejecutando el script `src/infrastructure/repositories/scripts/schema.sql`.
   - Configurar el archivo `.env` según lo indicado en `api.recomendador/README.md`.
   - Instalar dependencias y ejecutar:

     ```bash
     cd api.recomendador
     npm install
     npm run dev:ts-node   # o npm run build && npm start
     ```

   La API debería quedar disponible en `http://localhost:3000/api`.

3. **Levantar el frontend** (`web.recomendador`):

   - Crear un `.env` con `VITE_API_URL=http://localhost:3000/api` (o la URL que corresponda).
   - Instalar dependencias y ejecutar:

     ```bash
     cd ../web.recomendador
     npm install
     npm run dev
     ```

   La web se abrirá en `http://localhost:5173/` (o el puerto configurado por Vite).

4. **Flujo de uso**:

   - En la web, seleccionar **segmento** y **localidad**.
   - Traer ofertas disponibles (según `CABA` / `Resto Pais`).
   - Agregar ofertas y adicionales al carrito para ver **primera factura** y **ahorro**.

Para detalles más finos (endpoints, arquitectura, componentes UI), revisar los `README.md` específicos de `api.recomendador` y `web.recomendador`.
