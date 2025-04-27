// Usar CommonJS para importar correctamente en Prisma 6.x
const { PrismaClient } = require('@prisma/client');

// Crear una nueva instancia con opciones de logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

async function main() {
  try {
    console.log('Consultando usuarios...');
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol_id: true,
        rol: {
          select: {
            nombre: true,
          }
        }
      }
    });

    console.log('Usuarios encontrados:');
    console.log(JSON.stringify(usuarios, null, 2));

    console.log('\nConsultando roles...');
    const roles = await prisma.rol.findMany({
      include: {
        rol_permisos: {
          include: {
            permiso: true
          }
        }
      }
    });
    
    console.log('Roles encontrados:');
    console.log(JSON.stringify(roles, null, 2));

    console.log('\nConsultando cursos...');
    const cursos = await prisma.curso.findMany({
      include: {
        categorias: {
          include: {
            categoria: true
          }
        }
      }
    });
    
    console.log('Cursos encontrados:');
    console.log(JSON.stringify(cursos, null, 2));

  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
