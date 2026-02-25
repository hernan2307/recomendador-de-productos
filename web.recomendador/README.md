## Web Recomendador Personal (Frontend)

Aplicación **React + TypeScript + Vite** que consume la API del Recomendador Personal y permite:

- Seleccionar **segmento** (Individuo / Soho-SMB).
- Elegir **localidad / provincia** y obtener la **disponibilidad** (CABA / Resto País).
- Ver **ofertas** en pestañas (Combos, Flow, Personal).
- Agregar **ofertas y adicionales** a un carrito y ver:
  - Primera factura estimada.
  - Ahorro total vs. precio de lista.

### Requerimientos

- **Node.js 18+**
- npm (incluido con Node)

### Instalación

Desde la raíz del proyecto:

```bash
cd web.recomendador
npm install
```

### Configuración de entorno

La aplicación necesita la URL base de la API. Por defecto, en `src/core/servicios/apiCliente.ts` se usa:

```ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
```

1. Crear un archivo `.env` en la carpeta `web.recomendador` (junto al `package.json`).
2. Definir la variable:

```bash
VITE_API_URL=http://localhost:3000/api
```

> Si la API corre en otra URL o puerto, actualizar `VITE_API_URL` en consecuencia.

### Scripts npm

- **`npm run dev`**: levanta el servidor de desarrollo de Vite (HMR).
- **`npm run build`**: genera el build de producción en `dist/`.
- **`npm run preview`**: sirve el build de producción localmente.
- **`npm run lint`**: ejecuta ESLint sobre el proyecto.

### Ejecución en desarrollo

1. Asegurarse de que la **API** está corriendo (por defecto en `http://localhost:3000/api`).
2. Iniciar el frontend:

```bash
cd web.recomendador
npm run dev
```

Por defecto, Vite abrirá la aplicación en algo similar a:

- `http://localhost:5173/`

### Flujo de uso (alto nivel)

1. El usuario selecciona un **segmento** (Individuo / Soho-SMB).
2. Elige una **localidad**, que define la disponibilidad (`CABA` o `Resto Pais`).
3. Presiona **"Traer oferta"**, lo que dispara:
   - `GET /api/localidades` (carga inicial de localidades).
   - `GET /api/ofertas?disponibilidad=...` (ofertas según la localidad).
   - `GET /api/adicionales?tipo=...` para distintos tipos de producto.
4. Navega entre pestañas **Combos / Flow / Personal** para ver ofertas filtradas.
5. Agrega ofertas y adicionales al carrito y visualiza:
   - **Primera factura**.
   - **Ahorro total**.
6. Puede **vaciar** el carrito o quitar ítems individuales.
