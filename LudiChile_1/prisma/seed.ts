import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lógica de seeding aquí
  console.log('Seeding database...');
  // Ejemplo: Crear un usuario
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@example.com',
  //   },
  // });
  // console.log(`Created user with id: ${user.id}`);
  console.log('Database seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });