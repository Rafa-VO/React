# Cine Rafael - Gestor de Películas

## Autor

**Rafael** - Desarrollador del proyecto.

## Descripción del Proyecto

Una aplicación React con TypeScript que permite gestionar y visualizar una colección personal de películas. Incluye autenticación de usuarios, gestión de películas, y funcionalidades como filtrado, marcado de vistas y notas personales.

## Pasos de Instalación

1. **Clona el repositorio:**

   ```
   git clone https://github.com/tu-usuario/ProyectoFinalReact.git
   cd ProyectoFinalReact
   ```
2. **Instala dependencias del frontend:**

   ```
   npm install
   ```
3. **Instala dependencias del backend:**

   ```
   cd backend
   npm install
   cd ..
   ```
4. **Ejecuta la aplicación:**

   ```
   docker-compose up
   ```

   Esto iniciará el backend en el puerto 3000 y el frontend en el puerto por defecto de Vite.

## Variables de Entorno

Las siguientes variables de entorno se configuran en `docker-compose.yml`:

- `PORT`: 3000 (puerto en el que corre el servidor backend)
- `JWT_SECRET`: dev-secret (secreto para la generación de tokens JWT)

## Usuario de Prueba

Para probar la aplicación, puedes usar el siguiente usuario de prueba:

- **Email:** admin@gmail.com
- **Contraseña:** admin
- **Rol:** Admin

Otros usuarios disponibles en `backend/db.json` con la misma contraseña.

## Checklist Final de Requisitos Mínimos Cumplidos

### Requisitos Funcionales (Mínimos Obligatorios)
- ✅ Página pública de inicio o presentación.
- ✅ Página pública de login para obtener el JWT.
- ✅ Almacenamiento del JWT de forma adecuada.
- ✅ Rutas protegidas: Impedir el acceso a páginas privadas sin autenticación. Redirigir correctamente al login cuando sea necesario.
- ✅ Página 404 para rutas inexistentes.
- ✅ Listado de elementos de la entidad (GET).
- ✅ Consulta de detalles de un elemento (GET).
- ✅ Alta de un nuevo elemento (POST).
- ✅ Edición de un elemento existente (PUT o PATCH).
- ✅ Eliminación de elementos (DELETE).
- ✅ Gestión visible de errores de la API.
- ✅ Estados de carga (loading).
- ✅ Estados vacíos (cuando no hay datos).

### Requisitos Técnicos (React)
- ✅ React + TypeScript (salvo indicación contraria).
- ✅ Uso de React Router con: Rutas públicas. Rutas privadas. Ruta comodín (*) para la página 404.
- ✅ Uso de hooks: useState, useEffect y otros cuando proceda.
- ✅ Manejo explícito de eventos: onClick, onSubmit, onChange.
- ✅ Comunicación asíncrona cliente-servidor: Uso correcto de async / await. Separación de la lógica de acceso a la API en servicios. Consumo de la API REST mediante Axios o fetch.
- ✅ Diseño basado en componentes reutilizables: Layout, Páginas, Componentes UI.
