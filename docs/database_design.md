# Diseño de Base de Datos - LudiChile_1

Este documento describe el diseño propuesto para la base de datos de la aplicación LudiChile_1, basado en el análisis funcional de sus componentes.

## Diagrama Entidad-Relación (Mermaid)

```mermaid
---
config:
  theme: default
---
erDiagram
    USUARIO ||--|{ ROL : "tiene asignado"
    USUARIO ||--o{ PROGRESO_USUARIO : "registra"
    USUARIO ||--o{ SUSCRIPCION_USUARIO : "posee"
    USUARIO ||--o{ PUBLICACION : "crea"
    USUARIO ||--o{ COMENTARIO : "escribe"
    USUARIO ||--o{ LIKE_PUBLICACION : "otorga"
    ROL ||--o{ ROL_PERMISO : "incluye"
    PERMISO ||--o{ ROL_PERMISO : "asignado a"
    PLAN_SUSCRIPCION ||--o{ SUSCRIPCION_USUARIO : "suscribe a"
    PLAN_SUSCRIPCION ||--o{ PLAN_CARACTERISTICA : "ofrece"
    CARACTERISTICA ||--o{ PLAN_CARACTERISTICA : "incluida en"
    CURSO ||--o{ CURSO_CATEGORIA : "clasificado en"
    CURSO ||--o{ MODULO : "organizado en"
    CATEGORIA_CURSO ||--o{ CURSO_CATEGORIA : "clasifica"
    MODULO ||--o{ EJERCICIO : "contiene"
    EJERCICIO ||--o{ PROGRESO_USUARIO : "completado en"
    CANAL ||--o{ PUBLICACION : "alberga"
    PUBLICACION ||--o{ COMENTARIO : "recibe"
    PUBLICACION ||--o{ LIKE_PUBLICACION : "recibe"
    COMENTARIO ||--o{ COMENTARIO : "responde a"

    USUARIO {
        UUID id PK
        VARCHAR nombre
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR rol_id FK
        VARCHAR rango
        TIMESTAMP fecha_creacion
    }
    ROL {
        VARCHAR id PK
        VARCHAR nombre
        TEXT descripcion
    }
    PERMISO {
        VARCHAR id PK
        VARCHAR nombre
        TEXT descripcion
    }
    ROL_PERMISO {
        VARCHAR rol_id FK
        VARCHAR permiso_id FK
    }
    PLAN_SUSCRIPCION {
        VARCHAR id PK
        VARCHAR nombre
        DECIMAL precio
        VARCHAR intervalo_pago
        TEXT descripcion
        BOOLEAN activo
    }
    CARACTERISTICA {
        VARCHAR id PK
        VARCHAR nombre UK
        TEXT descripcion
    }
    PLAN_CARACTERISTICA {
        VARCHAR plan_id FK
        VARCHAR caracteristica_id FK
        VARCHAR valor
    }
    SUSCRIPCION_USUARIO {
        UUID id PK
        UUID usuario_id FK
        VARCHAR plan_id FK
        TIMESTAMP fecha_inicio
        TIMESTAMP fecha_fin
        VARCHAR estado
        VARCHAR id_transaccion_pago
    }
    CURSO {
        VARCHAR id PK
        VARCHAR titulo
        TEXT descripcion
        VARCHAR url_imagen
        VARCHAR dificultad
        BOOLEAN es_nuevo
        TIMESTAMP fecha_publicacion
    }
    CATEGORIA_CURSO {
        VARCHAR id PK
        VARCHAR nombre UK
        TEXT descripcion
    }
    CURSO_CATEGORIA {
        VARCHAR curso_id FK
        VARCHAR categoria_id FK
    }
    MODULO {
        UUID id PK
        VARCHAR curso_id FK
        VARCHAR titulo
        TEXT descripcion
        INTEGER orden
    }
    EJERCICIO {
        VARCHAR id PK
        UUID modulo_id FK
        INTEGER numero
        VARCHAR titulo
        TEXT descripcion
        TEXT instrucciones
        TEXT salida_esperada
        TEXT codigo_inicial
        JSON test_cases_json
    }
    PROGRESO_USUARIO {
        UUID id PK
        UUID usuario_id FK
        VARCHAR ejercicio_id FK
        BOOLEAN completado
        INTEGER intentos
        INTEGER puntos_obtenidos
        TIMESTAMP ultima_actualizacion
    }
    CANAL {
        VARCHAR id PK
        VARCHAR nombre UK
        TEXT descripcion
    }
    PUBLICACION {
        UUID id PK
        UUID usuario_id FK
        VARCHAR canal_id FK
        TEXT contenido
        VARCHAR url_imagen
        TIMESTAMP fecha_creacion
    }
    COMENTARIO {
        UUID id PK
        UUID publicacion_id FK
        UUID usuario_id FK
        TEXT contenido
        TIMESTAMP fecha_creacion
        UUID comentario_padre_id FK
    }
    LIKE_PUBLICACION {
        UUID usuario_id FK
        UUID publicacion_id FK
        TIMESTAMP fecha_creacion
    }
```

## Resumen de Entidades (Detalles Adicionales)

*   **USUARIO**: `id` es UUID. `email` es único. `rol_id` referencia a `ROL`.
*   **ROL**: `id` es VARCHAR (ej: 'student', 'admin'). `descripcion` es opcional.
*   **PERMISO**: `id` es VARCHAR (ej: 'EDITAR_CURSO'). `descripcion` es opcional.
*   **ROL_PERMISO**: Tabla de unión (muchos-a-muchos) entre `ROL` y `PERMISO`.
*   **PLAN_SUSCRIPCION**: `id` es VARCHAR (ej: 'club_monthly'). `intervalo_pago` (VARCHAR) puede ser 'mes', 'año', 'unico'.
*   **CARACTERISTICA**: (Opcional) `id` y `clave` son VARCHAR.
*   **PLAN_CARACTERISTICA**: (Opcional) Tabla de unión (muchos-a-muchos) entre `PLAN_SUSCRIPCION` y `CARACTERISTICA`.
*   **SUSCRIPCION_USUARIO**: `id` y `usuario_id` son UUID. `plan_id` referencia a `PLAN_SUSCRIPCION`. `fecha_fin` y `id_transaccion_pago` son opcionales. `estado` (VARCHAR) puede ser 'activa', 'cancelada', 'expirada'.
*   **CURSO**: `id` es VARCHAR (slug, ej: 'python').
*   **CATEGORIA_CURSO**: `id` es VARCHAR (slug, ej: 'web-dev'). `nombre` es único.
*   **CURSO_CATEGORIA**: Tabla de unión (muchos-a-muchos) entre `CURSO` y `CATEGORIA_CURSO`.
*   **MODULO**: `id` es UUID. `curso_id` referencia a `CURSO`. `descripcion` es opcional. `orden` define la secuencia.
*   **EJERCICIO**: `id` es VARCHAR (slug, ej: '01-hello-world'). `modulo_id` es UUID y referencia a `MODULO`. `codigo_inicial` es opcional. `test_cases_json` almacena los casos de prueba.
*   **PROGRESO_USUARIO**: `id` y `usuario_id` son UUID. `ejercicio_id` referencia a `EJERCICIO`.
*   **CANAL**: `id` es VARCHAR (slug, ej: 'general'). `nombre` es único. `descripcion` es opcional.
*   **PUBLICACION**: `id` y `usuario_id` son UUID. `canal_id` referencia a `CANAL`. `url_imagen` es opcional.
*   **COMENTARIO**: `id`, `publicacion_id`, `usuario_id` son UUID. `comentario_padre_id` (UUID) es opcional y referencia a `COMENTARIO` (self-reference) para anidamiento.
*   **LIKE_PUBLICACION**: Tabla de unión (muchos-a-muchos) entre `USUARIO` y `PUBLICACION`. `usuario_id` y `publicacion_id` son UUID.
*   **EVENTO**: `id` es UUID. `descripcion` y `url_enlace` son opcionales.
*   **NOTICIA**: `id` es UUID. `resumen` es opcional. `tipo` (VARCHAR) indica si es 'Blog', 'Video', etc.