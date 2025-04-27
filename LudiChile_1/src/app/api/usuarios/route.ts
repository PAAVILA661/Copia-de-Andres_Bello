import { NextRequest, NextResponse } from 'next/server';
// Importar desde el nuevo cliente de base de datos
import db from '@/lib/db';

export async function GET(_request: NextRequest) {
  try {
    console.log("API: Obteniendo lista de usuarios...");
    
    // Usar la función de ayuda en lugar de acceder directamente a prisma
    const usuarios = await db.getUsuarios();
    
    console.log(`API: Se encontraron ${usuarios.length} usuarios`);
    return NextResponse.json({ usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios', details: String(error) },
      { status: 500 }
    );
  }
}