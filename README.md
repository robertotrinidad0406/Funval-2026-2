# 🚀 Express + TypeScript Template con Swagger

¡Bienvenido! Este es un template inicial (plantilla) para proyectos de Node.js orientado a estudiantes. Está configurado con **Express**, **TypeScript** y tiene **Swagger** preintegrado para generar la documentación de tu API de manera automática.

## 🛠️ ¿Cómo usar este template?

La forma más fácil de empezar es usando GitHub:
1. En la página de este repositorio en GitHub, busca el botón verde **"Use this template"** (Usar esta plantilla) en la parte superior derecha.
2. Selecciona **"Create a new repository"** y dale un nombre a tu nuevo proyecto.
3. Clona *tu nuevo* repositorio en tu computadora:
   ```bash
   git clone <url-de-tu-nuevo-repositorio>
   ```

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (Se recomienda la versión 22 o superior)
- [pnpm](https://pnpm.io/) (Este proyecto está configurado para usar `pnpm`, pero puedes usar `npm` si lo prefieres)

## 💻 Instalación y Configuración local

1. Entra a la carpeta de tu proyecto e instala las dependencias:
   ```bash
   pnpm install
   ```

2. Configura las variables de entorno:
   Copia `env.example` como `.env` en la raíz del proyecto y configura las credenciales de tu PostgreSQL local:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=rincon_del_sabor_db
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña_aqui
   ```
   Reemplaza `tu_contraseña_aqui` por tu contraseña real. `.env` está excluido de Git; no publiques tus credenciales.

## 🏃‍♂️ Ejecución

Para iniciar el servidor en modo de desarrollo:
```bash
pnpm run dev
```

> **Nota Mágica 🪄:** Al ejecutar el comando de desarrollo `pnpm dev` o hagas cambios en tu codigo, se analiza tu código de manera automática para generar y actualiza el archivo `swagger-output.json` con las últimas rutas de tu API antes de levantar el servidor.

## 📖 Documentación de la API (Swagger)

Una vez que el servidor esté en funcionamiento, puedes ver y probar los endpoints directamente desde tu navegador gracias a la interfaz gráfica de Swagger:

👉 **http://localhost:3000/api/docs** *(Ajusta el puerto si configuraste uno diferente en tu archivo `.env`)*

### Endpoints principales

- `GET /api/menu?maxPrice=50&page=1&limit=10`: filtra productos por precio y pagina los resultados. `page` y `limit` son enteros positivos; por defecto se usan `1` y `10`.
- `GET/POST/PUT/DELETE /api/customers`: CRUD de clientes. El cuerpo usa `first_name`, `last_name`, `email`, `phone` y `address`.
- `GET /api/sales`, `GET /api/sales/:id` y `POST /api/sales`: consulta ventas con el nombre del cliente y registra una venta. El cuerpo de creación usa `customer_id`, `product_id`, `quantity` y `total`.

Las rutas de productos siguen disponibles bajo `/api/menu`.

Para documentar tus propias rutas, la librería `swagger-autogen` leerá tus endpoints automáticamente. Puedes mejorar la documentación agregando comentarios especiales dentro de tus rutas. Por ejemplo:
```typescript
app.get("/usuarios", (req, res) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.description = 'Obtiene la lista de todos los usuarios registrados.' */
    res.json([]);
});
```

## 📂 Estructura del Proyecto

- `src/index.ts`: Archivo principal y punto de entrada donde se levanta el servidor Express.
- `src/config/db.ts`: Pool de conexiones de PostgreSQL.
- `src/models/product.model.ts`: Consultas a PostgreSQL para los productos.
- `src/controllers/product.controller.ts`: Lógica de las peticiones de productos.
- `src/routes/product.routes.ts`: Rutas CRUD de productos.
- `src/models/customer.model.ts`, `src/controllers/customer.controller.ts` y `src/routes/customer.routes.ts`: CRUD de clientes.
- `src/models/sale.model.ts`, `src/controllers/sale.controller.ts` y `src/routes/sale.routes.ts`: consultas y creación de ventas.
- `src/middlewares/`: validación de cuerpos de productos, clientes y ventas con Zod.
- `src/libs/swagger.lib.ts`: Configuración para la generación automática de Swagger.
- `src/routes/swagger.router.ts`: Archivo que expone la ruta `/api/docs` usando `swagger-ui-express`.
- `swagger-output.json`: Archivo autogenerado con la especificación de tu proyecto **(No editar manualmente)**.
- `tsconfig.json`: Configuración estricta y moderna de TypeScript con soporte para ESM (`nodenext`).

## 🛠️ Scripts disponibles en el proyecto

- `pnpm run dev`: Ejecuta el proyecto en modo desarrollo con recarga automática usando `tsx`.
- `pnpm run build`: Transpila el código TypeScript a JavaScript en la carpeta `dist`.
- `pnpm start`: Ejecuta el código ya transpilado, ideal para entornos de producción.

---
*Creado con fines educativos para facilitar el desarrollo ágil de APIs.*