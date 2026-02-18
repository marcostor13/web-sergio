# Plan de Implementación: Plataforma Sergio Nolasco

Este documento detalla la hoja de ruta para la construcción de la plataforma completa, integrando el frontend en Astro y el backend en NestJS.

## Objetivos
- Reflejar la marca personal de Sergio Nolasco.
- Permitir el seguimiento de metas "Futuros Imposibles".
- Garantizar seguridad con JWT y escalabilidad con MongoDB Atlas.

## Fases de Desarrollo

### 1. Refactorización y Modelos (Backend)
- **Modelos**: 
    - Renombrar `Meta` a `FuturoImposible`.
    - Expandir `User` con `imo`, `phone` y `role` (admin/user).
- **Admin Setup**: Asegurar que la cuenta `admin@admin.com` exista con permisos superiores.

### 2. Backend Evolucionado (API Routes)
- **API Futuros Imposibles**: 
    - Renombrar rutas a `/api/fis`.
    - Permitir edición completa (título, descripción, progreso).
- **API Admin**: Ruta protegida para ver todos los FIs de todos los usuarios con filtros de búsqueda.
- **Notificaciones**: Servicio centralizado de respuesta para el frontend.

### 3. Frontend: Mejora de Experiencia de Usuario
- **Servicio de Notificaciones**: Componente reutilizable para alertas de éxito/error.
- **Registro Extendido**: Agregar campos `IMO` y `Teléfono`. Corregir feedback visual.
- **Edición en Dashboard**: Modal o formulario para que el usuario actualice sus FIs y progreso.

### 4. Panel de Administración
- **Vista Admin**: Dashboard exclusivo para `admin@admin.com`.
- **Búsqueda y Filtros**: Localizar FIs por usuario o contenido.
