// prisma-client.ts - Wrapper de TypeScript para el cliente CommonJS
// Importamos el cliente de Prisma desde el archivo CommonJS
// @ts-ignore - Ignoramos errores de tipo ya que estamos importando desde CommonJS
import prisma from './prisma-client.js';

// Re-exportamos el cliente con tipado
export default prisma;
