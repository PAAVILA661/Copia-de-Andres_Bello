/**
 * db.js - Prisma client para LudiChile usando CommonJS
 * Este archivo sirve como punto de entrada para interactuar con la base de datos
 */

const { PrismaClient } = require('@prisma/client');

// Crear una instancia de PrismaClient
let prisma;

// Para evitar crear múltiples instancias en desarrollo
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // En desarrollo, reutilizamos la instancia si ya existe
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

// Funciones de ayuda para operaciones comunes

/**
 * Obtiene todos los usuarios
 */
async function getUsuarios() {
  return prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
      rol_id: true,
      rango: true,
      fecha_creacion: true,
    },
  });
}

/**
 * Obtiene un usuario por ID
 */
async function getUsuarioById(id) {
  return prisma.usuario.findUnique({
    where: { id },
    include: {
      rol: true,
      progreso_usuario: true,
    },
  });
}

/**
 * Obtiene un usuario por email
 */
async function getUsuarioByEmail(email) {
  return prisma.usuario.findUnique({
    where: { email },
    include: {
      rol: true,
    },
  });
}

/**
 * Obtiene todos los roles
 */
async function getRoles() {
  return prisma.rol.findMany({
    include: {
      rol_permisos: {
        include: {
          permiso: true,
        },
      },
    },
  });
}

/**
 * Obtiene todos los cursos
 */
async function getCursos() {
  return prisma.curso.findMany({
    include: {
      categorias: {
        include: {
          categoria: true,
        },
      },
    },
  });
}

/**
 * Obtiene un curso por ID
 */
async function getCursoById(id) {
  return prisma.curso.findUnique({
    where: { id },
    include: {
      categorias: {
        include: {
          categoria: true,
        },
      },
      modulos: {
        include: {
          ejercicios: true,
        },
        orderBy: {
          orden: 'asc',
        },
      },
    },
  });
}

/**
 * Obtiene todos los planes de suscripción
 */
async function getPlanesSuscripcion() {
  return prisma.planSuscripcion.findMany({
    include: {
      caracteristicas: {
        include: {
          caracteristica: true,
        },
      },
    },
  });
}

// Exportar el cliente y las funciones de ayuda
module.exports = {
  prisma,
  getUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  getRoles,
  getCursos,
  getCursoById,
  getPlanesSuscripcion,
};
