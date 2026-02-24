# Personal Recommender API

Node.js (TypeScript + Express) API with Clean Architecture for the Personal services recommender. MySQL database.

## Requirements

- Node.js 18+
- MySQL 8 (or compatible)

## Installation

```bash
cd api.recomendador
npm install
```

## Database

1. Create the database and tables by running the SQL script:

```bash
mysql -u root -p < src/infrastructure/persistence/scripts/schema.sql
```

Or from the MySQL client:

```sql
source full/path/api.recomendador/src/infrastructure/persistence/scripts/schema.sql
```

2. Configure environment variables. Copy `.env.example` to `.env` and adjust:

```bash
cp .env.example .env
```

Edit `.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=recomendador_personal
PORT=3000
```

## Running

Build TypeScript:

```bash
npm run build
```

Start the API:

```bash
npm start
```

Development mode (compile on change):

```bash
npm run dev
```

Development with hot reload (ts-node-dev):

```bash
npm run dev:ts-node
```

API is available at `http://localhost:3000`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/localidades` | List Argentine locations (selector) |
| GET | `/api/ofertas?disponibilidad=CABA` | Offers by availability (CABA or Resto Pais) |
| GET | `/api/adicionales?tipo=Tv` | Add-ons by type (Tv, Internet, Combo) |

### Examples

- Locations: `GET http://localhost:3000/api/localidades`
- CABA offers: `GET http://localhost:3000/api/ofertas?disponibilidad=CABA`
- Rest of country offers: `GET http://localhost:3000/api/ofertas?disponibilidad=Resto%20Pais`
- Tv add-ons: `GET http://localhost:3000/api/adicionales?tipo=Tv`
- Combo add-ons: `GET http://localhost:3000/api/adicionales?tipo=Combo`

## Structure (Clean Architecture)

```
src/
├── domain/            # Entities and ports (interfaces)
│   ├── entities/      # Product, Addon, Location
│   └── ports/         # IProductRepository, IAddonRepository, ILocationsService
├── application/       # Use cases
│   ├── locations/     # getLocations (obtenerLocalidades)
│   ├── offers/        # getOffersByLocation (obtenerOfertasPorLocalidad)
│   └── addons/        # getAddonsByType (obtenerAdicionalesPorTipo)
├── infrastructure/    # Implementations
│   ├── persistence/mysql/  # Repositories and connection
│   └── services/      # ArgentinaLocationsService (locations data)
└── presentation/      # HTTP (Express)
    ├── controllers/
    ├── routes/
    ├── config/container.ts
    └── app.ts
```

## Code standards

- TypeScript strict mode. Interfaces for ports (repositories, services).
- Function names in Spanish, camelCase (e.g. `obtenerOfertasPorLocalidad`).
- Code documented with JSDoc on modules and relevant functions.
