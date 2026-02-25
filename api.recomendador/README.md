## API Recomendador Personal

API REST en **Node.js + TypeScript + Express** con enfoque de **Clean Architecture** para un recomendador de servicios (ofertas y adicionales) de Personal. Usa **MySQL** como base de datos.

### Requerimientos

- **Node.js 18+**
- **MySQL 8** (o compatible)
- npm (incluido con Node)

### Instalación

```bash
cd api.recomendador
npm install
```

### Base de datos

1. Crear la base y tablas ejecutando el script SQL:

```bash
mysql -u root -p < src/infrastructure/repositories/scripts/schema.sql
```

O bien, desde el cliente de MySQL:

```sql
source /ruta/completa/a/api.recomendador/src/infrastructure/repositories/scripts/schema.sql
```

2. Configurar variables de entorno. Copiar `.env.example` a `.env` (si existe) o crearlo manualmente:

```bash
cp .env.example .env   # en Windows PowerShell: copy .env.example .env
```

Contenido esperado de `.env` (valores de ejemplo):

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=recomendador_personal
PORT=3000
```

Si no se define `PORT`, la API levanta por defecto en **3000**.

### Scripts npm

- **`npm run build`**: compila TypeScript a JavaScript en `dist/`.
- **`npm start`**: levanta la API usando `dist/adapters/app.js`.
- **`npm run dev`**: compila en modo *watch* (útil junto con `nodemon` si se desea).
- **`npm run dev:ts-node`**: ejecuta la API directamente desde TypeScript con `ts-node-dev` (hot reload).

### Ejecución

Compilar y ejecutar en modo producción:

```bash
npm run build
npm start
```

Modo desarrollo con recarga en caliente:

```bash
npm run dev:ts-node
```

La API quedará disponible en:

- **URL base**: `http://localhost:3000`
- **Base REST utilizada por el frontend**: `http://localhost:3000/api`

### Endpoints principales

| Método | Path | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check de la API |
| GET | `/api/localidades` | Lista de localidades argentinas (para el selector del cliente) |
| GET | `/api/ofertas?disponibilidad=CABA` | Ofertas por disponibilidad (`CABA` o `Resto Pais`) |
| GET | `/api/ofertas?disponibilidad=Resto%20Pais` | Ofertas para el resto del país |
| GET | `/api/adicionales?tipo=Tv` | Adicionales por tipo (`Tv`, `Internet`, `Combo`) |

#### Ejemplos de llamadas

- Localidades: `GET http://localhost:3000/api/localidades`
- Ofertas CABA: `GET http://localhost:3000/api/ofertas?disponibilidad=CABA`
- Ofertas resto país: `GET http://localhost:3000/api/ofertas?disponibilidad=Resto%20Pais`
- Adicionales TV: `GET http://localhost:3000/api/adicionales?tipo=Tv`
- Adicionales Combo (trae Tv + Internet): `GET http://localhost:3000/api/adicionales?tipo=Combo`

### Estructura (Clean Architecture)

```text
src/
├── domain/                         # Entidades de negocio y puertos (interfaces)
│   ├── entities/                   # Product, Addon, Location
│   └── ports/                      # IProductRepository, IAddonRepository, ILocationsService
├── application/                    # Casos de uso (lógica de aplicación)
│   ├── locations/                  # obtenerLocalidades
│   ├── offers/                     # obtenerOfertasPorLocalidad
│   └── addons/                     # obtenerAdicionalesPorTipo
├── infrastructure/                 # Implementaciones técnicas
│   ├── repositories/mysql/         # Repositorios MySQL y pool de conexión
│   ├── repositories/scripts/       # Script SQL schema.sql
│   └── services/                   # ArgentinaLocationsService (datos de localidades)
└── adapters/                       # Capa HTTP (Express)
    ├── controllers/
    ├── routes/
    ├── dtos/
    ├── config/container.ts
    └── app.ts                      # Punto de entrada de la API
```

### Estándares de código

- **TypeScript en modo estricto**, con interfaces para puertos (repositorios, servicios).
- **Funciones de dominio y aplicación en español**, en `camelCase` (ej: `obtenerOfertasPorLocalidad`).
- **Separación clara de capas** (domain / application / infrastructure / adapters) respetando la inversión de dependencias.
