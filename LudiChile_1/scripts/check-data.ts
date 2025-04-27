import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking data in database...');
  // Lógica de verificación de datos aquí
  // Ejemplo: Contar usuarios
  // const userCount = await prisma.user.count();
  // console.log(`Number of users: ${userCount}`);
  console.log('Data check complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });