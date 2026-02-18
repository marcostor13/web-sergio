# Buenas Prácticas de Desarrollo: Sergio Nolasco

Este documento establece los estándares técnicos y de diseño para asegurar la calidad y consistencia del proyecto.

## Desarrollo Frontend (Astro)

### 1. Componentización
- Utilizar componentes `.astro` para mejorar la reutilización.
- Mantener la lógica de negocio fuera de los componentes de UI siempre que sea posible.
- **Island Architecture**: Solo usar componentes interactivos (React/Vue/Svelte) cuando sea estrictamente necesario para reducir el bundle JS.

### 2. Estilos y Diseño
- Seguir estrictamente el [Manual de Marca](file:///c:/Marcos/Proyectos/Sergio/web-sergio/manualdemarca.md).
- **Tipografías**: 
  - `Louis George Café` para titulares.
  - `Made Outer Sans` para cuerpo de texto.
- **Colores**: Usar las variables CSS para el Verde Principal `#76B82A` y Gris `#808080`.
- **Responsive**: Priorizar el diseño *Mobile-First*.

### 3. SEO y Rendimiento
- Incluir etiquetas `ALT` en todas las imágenes.
- Usar el componente `<Image />` de Astro para optimización automática.
- Mantener una jerarquía de encabezados (`H1`, `H2`, `H3`) lógica.

## Desarrollo Backend (NestJS)

### 1. Estructura Modular
- Organizar el código por módulos (`auth`, `users`, `metas`).
- Cada módulo debe tener sus propios controladores, servicios y DTOs (Data Transfer Objects).

### 2. Seguridad
- **JWT**: No almacenar datos sensibles en el payload del token.
- **Validación**: Usar `class-validator` y `class-transformer` para validar todas las entradas de la API.
- **Variables de Entorno**: Nunca subir archivos `.env` al repositorio. Usar el sistema de configuración de NestJS.

### 3. Base de Datos (MongoDB)
- Definir esquemas claros usando Mongoose.
- Indexar campos de búsqueda frecuente (como `userId` en las metas) para mejorar el rendimiento.
- Validar la integridad de los datos antes de persistirlos.

## Gestión de Estado y Datos

- **Futuros Imposibles**: Asegurar que cada actualización de progreso (%) incluya una fecha de registro.
- **Evidencias**: Validar el tipo y tamaño de archivo antes de permitir la subida.

## Control de Versiones

- Usar mensajes de commit descriptivos y en español (ej: `feat: implementación de login con JWT`).
- Mantener la rama `main` siempre estable y lista para despliegue en Netlify.
