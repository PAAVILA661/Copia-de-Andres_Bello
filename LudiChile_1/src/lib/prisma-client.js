// prisma-client.js - Cliente de Prisma usando CommonJS
const { PrismaClient } = require('@prisma/client');

let prisma;

// Comprobar si estamos en un entorno de desarrollo
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Evitar múltiples instancias de PrismaClient en desarrollo
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
