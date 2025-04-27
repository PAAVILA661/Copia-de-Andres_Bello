// Usar un enfoque de CommonJS para la importación
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('URL de conexión a la base de datos:', process.env.DATABASE_URL);
  console.log('Iniciando carga de datos semilla...');
  
  // Crear roles básicos
  const roles = [
    { id: 'admin', nombre: 'Administrador', descripcion: 'Administrador del sistema con acceso completo' },
    { id: 'student', nombre: 'Estudiante', descripcion: 'Usuario estudiante con acceso básico' },
    { id: 'teacher', nombre: 'Profesor', descripcion: 'Usuario profesor con privilegios de edición de contenido' },
  ];

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: { id: rol.id },
      update: {},
      create: rol,
    });
  }

  // Crear permisos
  const permisos = [
    { id: 'ADMIN_DASHBOARD', nombre: 'Acceso a Dashboard', descripcion: 'Permite acceder al panel de administración' },
    { id: 'EDITAR_CURSO', nombre: 'Editar Curso', descripcion: 'Permite editar cursos existentes' },
    { id: 'CREAR_CURSO', nombre: 'Crear Curso', descripcion: 'Permite crear nuevos cursos' },
    { id: 'VER_CURSOS', nombre: 'Ver Cursos', descripcion: 'Permite ver los cursos' },
  ];

  for (const permiso of permisos) {
    await prisma.permiso.upsert({
      where: { id: permiso.id },
      update: {},
      create: permiso,
    });
  }

  // Asignar permisos a roles
  const rolPermisos = [
    { rol_id: 'admin', permiso_id: 'ADMIN_DASHBOARD' },
    { rol_id: 'admin', permiso_id: 'EDITAR_CURSO' },
    { rol_id: 'admin', permiso_id: 'CREAR_CURSO' },
    { rol_id: 'admin', permiso_id: 'VER_CURSOS' },
    { rol_id: 'teacher', permiso_id: 'EDITAR_CURSO' },
    { rol_id: 'teacher', permiso_id: 'CREAR_CURSO' },
    { rol_id: 'teacher', permiso_id: 'VER_CURSOS' },
    { rol_id: 'student', permiso_id: 'VER_CURSOS' },
  ];

  for (const rolPermiso of rolPermisos) {
    await prisma.rolPermiso.upsert({
      where: {
        rol_id_permiso_id: {
          rol_id: rolPermiso.rol_id,
          permiso_id: rolPermiso.permiso_id,
        },
      },
      update: {},
      create: rolPermiso,
    });
  }

  // Crear planes de suscripción
  const planes = [
    { 
      id: 'free', 
      nombre: 'Plan Gratuito', 
      precio: 0, 
      intervalo_pago: 'n/a', 
      descripcion: 'Plan básico gratuito',
      activo: true
    },
    { 
      id: 'premium_monthly', 
      nombre: 'Premium Mensual', 
      precio: 9.99, 
      intervalo_pago: 'mes', 
      descripcion: 'Plan premium con pago mensual',
      activo: true
    },
    { 
      id: 'premium_yearly', 
      nombre: 'Premium Anual', 
      precio: 99.99, 
      intervalo_pago: 'año', 
      descripcion: 'Plan premium con pago anual (descuento)',
      activo: true
    },
  ];

  for (const plan of planes) {
    await prisma.planSuscripcion.upsert({
      where: { id: plan.id },
      update: {},
      create: plan,
    });
  }

  // Crear características
  const caracteristicas = [
    { id: 'cursos_premium', nombre: 'Cursos Premium', descripcion: 'Acceso a cursos premium' },
    { id: 'descargas', nombre: 'Descargas', descripcion: 'Posibilidad de descargar material' },
    { id: 'certificados', nombre: 'Certificados', descripcion: 'Obtención de certificados' },
  ];

  for (const caracteristica of caracteristicas) {
    await prisma.caracteristica.upsert({
      where: { id: caracteristica.id },
      update: {},
      create: caracteristica,
    });
  }

  // Asignar características a planes
  const planCaracteristicas = [
    { plan_id: 'premium_monthly', caracteristica_id: 'cursos_premium', valor: 'Sí' },
    { plan_id: 'premium_monthly', caracteristica_id: 'descargas', valor: 'Sí' },
    { plan_id: 'premium_monthly', caracteristica_id: 'certificados', valor: 'Sí' },
    { plan_id: 'premium_yearly', caracteristica_id: 'cursos_premium', valor: 'Sí' },
    { plan_id: 'premium_yearly', caracteristica_id: 'descargas', valor: 'Sí' },
    { plan_id: 'premium_yearly', caracteristica_id: 'certificados', valor: 'Sí' },
    { plan_id: 'free', caracteristica_id: 'cursos_premium', valor: 'No' },
    { plan_id: 'free', caracteristica_id: 'descargas', valor: 'No' },
    { plan_id: 'free', caracteristica_id: 'certificados', valor: 'No' },
  ];

  for (const planCaracteristica of planCaracteristicas) {
    await prisma.planCaracteristica.upsert({
      where: {
        plan_id_caracteristica_id: {
          plan_id: planCaracteristica.plan_id,
          caracteristica_id: planCaracteristica.caracteristica_id,
        },
      },
      update: {},
      create: planCaracteristica,
    });
  }

  // Crear usuario administrador
  const adminUser = {
    id: '00000000-0000-0000-0000-000000000001',
    nombre: 'Admin',
    email: 'admin@ludichile.com',
    password_hash: '$2a$10$5gzPGERBUqH.7DDWMqrVjeL0P.fExnkMd.bmwifPwEqhzBUEck7yy', // contraseña: admin123
    rol_id: 'admin',
    rango: 'Administrador',
  };

  await prisma.usuario.upsert({
    where: { email: adminUser.email },
    update: {},
    create: adminUser,
  });

  // Crear categorías de curso
  const categorias = [
    { id: 'programming', nombre: 'Programación', descripcion: 'Cursos de programación' },
    { id: 'data-science', nombre: 'Ciencia de datos', descripcion: 'Cursos de ciencia de datos' },
    { id: 'web-dev', nombre: 'Desarrollo Web', descripcion: 'Cursos de desarrollo web' },
  ];

  for (const categoria of categorias) {
    await prisma.categoriaCurso.upsert({
      where: { id: categoria.id },
      update: {},
      create: categoria,
    });
  }

  // Crear cursos básicos
  const cursos = [
    { 
      id: 'python-basics', 
      titulo: 'Python Básico', 
      descripcion: 'Aprende los fundamentos de Python', 
      dificultad: 'Principiante',
      es_nuevo: true,
      url_imagen: '/images/courses/python-basics.jpg'
    },
    { 
      id: 'javascript-intro', 
      titulo: 'Introducción a JavaScript', 
      descripcion: 'Fundamentos de JavaScript', 
      dificultad: 'Principiante',
      es_nuevo: false,
      url_imagen: '/images/courses/javascript-intro.jpg'
    },
  ];

  for (const curso of cursos) {
    await prisma.curso.upsert({
      where: { id: curso.id },
      update: {},
      create: curso,
    });
  }

  // Asignar categorías a cursos
  const cursoCategorias = [
    { curso_id: 'python-basics', categoria_id: 'programming' },
    { curso_id: 'javascript-intro', categoria_id: 'programming' },
    { curso_id: 'javascript-intro', categoria_id: 'web-dev' },
  ];

  for (const cursoCategoria of cursoCategorias) {
    await prisma.cursoCategoria.upsert({
      where: {
        curso_id_categoria_id: {
          curso_id: cursoCategoria.curso_id,
          categoria_id: cursoCategoria.categoria_id,
        },
      },
      update: {},
      create: cursoCategoria,
    });
  }

  // Crear canales
  const canales = [
    { id: 'general', nombre: 'General', descripcion: 'Canal general de discusión' },
    { id: 'preguntas', nombre: 'Preguntas', descripcion: 'Canal para preguntas y respuestas' },
  ];

  for (const canal of canales) {
    await prisma.canal.upsert({
      where: { id: canal.id },
      update: {},
      create: canal,
    });
  }

  console.log('Datos semilla creados correctamente');
}

main()
  .catch((e) => {
    console.error('Error en el script seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Desconectando de la base de datos...');
    await prisma.$disconnect();
    console.log('Desconexión completada.');
  });
