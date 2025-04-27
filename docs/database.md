# Configuración de Base de Datos LudiChile

Este documento describe la configuración y uso de la base de datos PostgreSQL con Prisma en el proyecto LudiChile.

## Estructura de la Base de Datos

La base de datos sigue un diseño relacional con las siguientes entidades principales:

- **Usuarios y Roles**: Control de acceso basado en roles (RBAC)
- **Cursos y Módulos**: Estructura jerárquica de contenido educativo
- **Ejercicios y Progreso**: Seguimiento del avance del estudiante
- **Suscripciones**: Sistema de suscripción con diferentes planes
- **Comunidad**: Sistema de publicaciones, comentarios y canales

## Instalación y Configuración

### Requisitos previos

- Docker instalado
- Node.js versión 14 o superior
- npm o pnpm

### Pasos para configurar la base de datos

1. **Iniciar el contenedor de Docker con PostgreSQL**:

```bash
npm run db:start
```

2. **Generar el cliente Prisma**:

```bash
npm run prisma:generate
```

3. **Aplicar las migraciones**:

```bash
npm run prisma:migrate:dev
```

4. **Cargar datos de prueba**:

```bash
npm run prisma:seed
```

## Uso del Cliente Prisma

Para interactuar con la base de datos desde tu código, importa el cliente Prisma:

```typescript
import prisma from '@/lib/prisma';

// Ejemplo de consulta
async function getUsers() {
  const users = await prisma.usuario.findMany();
  return users;
}
```

## Consultas Comunes

### Obtener un usuario con su rol

```typescript
const user = await prisma.usuario.findUnique({
  where: { id: userId },
  include: { rol: true }
});
```

### Obtener cursos con sus categorías

```typescript
const courses = await prisma.curso.findMany({
  include: {
    categorias: {
      include: {
        categoria: true
      }
    }
  }
});
```

### Obtener progreso de un usuario

```typescript
const progress = await prisma.progresoUsuario.findMany({
  where: { usuario_id: userId },
  include: { ejercicio: true }
});
```

## Comandos útiles

- **Visualizar la base de datos**: `npx prisma studio`
- **Restaurar la base de datos**: `npm run prisma:migrate:reset`
- **Detener el contenedor**: `npm run db:stop`

## Diagrama de Entidad-Relación

```
Usuario 1--* ProgresoUsuario *--1 Ejercicio
Usuario 1--* SuscripcionUsuario *--1 PlanSuscripcion
Usuario 1--* Publicacion *--1 Canal
Publicacion 1--* Comentario *--1 Usuario
Curso 1--* Modulo 1--* Ejercicio
```

## Credenciales del Usuario Administrador

- **Email**: admin@ludichile.com
- **Password**: admin123

## Solución de Problemas

- Si encuentras errores de conexión, verifica que el contenedor Docker esté en ejecución.
- Si hay problemas con las migraciones, intenta ejecutar `npm run prisma:migrate:reset` para reiniciar la base de datos.
