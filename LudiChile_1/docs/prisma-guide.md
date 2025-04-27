# Trabajando con Prisma 6.x en LudiChile

Este documento proporciona guías y soluciones para trabajar con Prisma 6.x en el proyecto LudiChile.

## Estructura de Archivos

- **`src/lib/db.js`**: Cliente principal de Prisma con funciones de ayuda (CommonJS)
- **`src/lib/db.d.ts`**: Definiciones de tipos para el cliente de la base de datos
- **`prisma/schema.prisma`**: Esquema de la base de datos
- **`prisma/seed.js`**: Script para poblar la base de datos con datos iniciales

## Importación Correcta de Prisma Client en Prisma 6.x

En Prisma 6.x, la forma de importar y crear el cliente ha cambiado. En lugar de:

```typescript
// No funciona en Prisma 6.x
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

Ahora usamos un enfoque híbrido con CommonJS:

```javascript
// db.js - Funciona con Prisma 6.x
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

Y para TypeScript, proporcionamos tipos en un archivo de definición separado (`db.d.ts`).

## Cómo Usar el Cliente de Base de Datos

### En Archivos TypeScript

```typescript
import db from '@/lib/db';

// Obtener todos los usuarios
const usuarios = await db.getUsuarios();

// Obtener un usuario por ID
const usuario = await db.getUsuarioById('user-id');

// Obtener todos los cursos
const cursos = await db.getCursos();
```

### En Archivos JavaScript

```javascript
const db = require('@/lib/db');

// Obtener todos los usuarios
const usuarios = await db.getUsuarios();

// Acceder directamente a Prisma Client si es necesario
const resultado = await db.prisma.usuario.create({
  data: {
    // datos del usuario
  }
});
```

## Funciones Disponibles

| Función | Descripción |
|---------|-------------|
| `getUsuarios()` | Obtiene todos los usuarios |
| `getUsuarioById(id)` | Obtiene un usuario por ID |
| `getUsuarioByEmail(email)` | Obtiene un usuario por email |
| `getRoles()` | Obtiene todos los roles |
| `getCursos()` | Obtiene todos los cursos |
| `getCursoById(id)` | Obtiene un curso por ID |
| `getPlanesSuscripcion()` | Obtiene todos los planes de suscripción |

## Scripts Útiles

```bash
# Generar el cliente Prisma
npm run prisma:generate

# Aplicar migraciones
npm run prisma:migrate:dev

# Cargar datos iniciales
npm run prisma:seed

# Iniciar/detener la base de datos
npm run db:start
npm run db:stop

# Explorar la base de datos con Prisma Studio
npx prisma studio
```

## Solución de Problemas

Si encuentras errores relacionados con la importación de Prisma, asegúrate de:

1. Usar el cliente centralizado `db` en lugar de importar Prisma Client directamente
2. Ejecutar `npm run prisma:generate` después de cambios en el esquema
3. Reiniciar el servidor de desarrollo después de cambios importantes en la configuración

Para consultas directas a la base de datos, puedes usar los scripts en la carpeta `scripts/`.
