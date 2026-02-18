# Guía de Gestión: Agentes y Skills (AI)

Este documento describe cómo configurar y gestionar instrucciones personalizadas (Agents) y herramientas especializadas (Skills) para maximizar la eficiencia de asistentes de IA como **Antigravity** y **Cursor** dentro de este proyecto.

## 1. Agentes (Agents)

Los Agentes son archivos de instrucciones que definen el comportamiento, tono y reglas específicas para el asistente de IA en diferentes contextos.

### Ubicación Recomendada
- `.agent/workflows/`: Para flujos de trabajo específicos (ej. `deploy.md`, `testing.md`).
- `.cursorrules` (en la raíz): Para reglas globales de Cursor.

### Estructura de un Agent Workflow (`.md`)
```markdown
---
description: [Título corto del workflow]
---
1. [Paso 1 del workflow]
// turbo (indica que el comando puede ejecutarse automáticamente si es seguro)
2. [Paso 2: Ejecutar comando de terminal]
3. [Paso 3: Verificación]
```

## 2. Skills (Habilidades)

Las Skills son conjuntos de instrucciones y scripts que extienden las capacidades base de la IA para tareas complejas.

### Ubicación
- `scripts/`: Scripts ejecutables (JS, Python, Shell).
- `docs/skills/`: O dentro de la estructura nativa que el asistente reconozca.

### Estructura de una Skill (`SKILL.md`)
Cada skill debe contener un archivo `SKILL.md` con:
- **Frontmatter YAML**: Nombre y descripción.
- **Instrucciones**: Guía detallada de uso.
- **Recursos**: Referencias a scripts o plantillas dentro de la misma carpeta de la skill.

## 3. Compatibilidad con Antigravity

Antigravity busca automáticamente archivos de contexto y workflows para adaptarse al proyecto. Para asegurar el funcionamiento:

1.  **Mantener `task.md` actualizado**: Es la fuente de verdad para el progreso de la IA.
2.  **Referenciar Documentación**: Los agentes deben saber leer `arquitectura.md` y `buenas_practicas.md` para no violar las reglas del proyecto.
3.  **Uso de Metadatos**: Incluir descripciones claras en el frontmatter de los archivos `.md` ayuda a la IA a seleccionar la herramienta adecuada.

## 4. Mejores Prácticas

- **Atomicidad**: Cada skill o agente debe resolver un problema específico (ej. "Generar Migraciones").
- **Actualización Continua**: Si la arquitectura cambia, actualiza los agentes para reflejar el nuevo estado.
- **Feedback Loop**: Documenta errores comunes que la IA cometa dentro de los agentes para prevenir que se repitan.
- **Seguridad**: Asegúrate de que los agentes no tengan permiso para auto-ejecutar comandos destructivos sin supervisión (evitar `// turbo` en comandos como `rm -rf`).
