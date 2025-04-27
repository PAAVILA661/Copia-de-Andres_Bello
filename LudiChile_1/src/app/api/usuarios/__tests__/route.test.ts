import { GET } from '../route';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';
// Mock del cliente de Prisma
jest.mock('@/lib/prisma-client', () => ({
  __esModule: true,
  default: {
    usuario: {
      findMany: jest.fn(),
    },
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('GET /api/usuarios', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    // Resetear el mock antes de cada test
    jest.clearAllMocks();

    // Crear un mock básico para NextRequest
    // Crear un mock básico para NextRequest
    // Simulamos la estructura mínima necesaria para el test
    mockRequest = {
      url: 'http://localhost/api/usuarios',
      method: 'GET',
      // Puedes añadir otras propiedades o métodos si son necesarios para el test
      json: async () => ({}), // Si el test necesitara leer el body como JSON
      text: async () => '', // Si el test necesitara leer el body como texto
      headers: new Headers(), // Si el test necesitara acceder a los headers
      // Añadir otras propiedades de NextRequest si son usadas en la ruta GET
    } as NextRequest;
  });

  test('debería retornar la lista de usuarios con los campos seleccionados', async () => {
    const mockUsuarios = [
      { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', rol_id: 1, rango: 10, fecha_creacion: new Date() },
      { id: 2, nombre: 'Usuario 2', email: 'user2@example.com', rol_id: 2, rango: 20, fecha_creacion: new Date() },
    ];

    mockPrisma.usuario.findMany.mockResolvedValue(mockUsuarios);

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ usuarios: mockUsuarios });
    expect(mockPrisma.usuario.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol_id: true,
        rango: true,
        fecha_creacion: true,
      },
    });
  });

  test('debería manejar errores al obtener usuarios', async () => {
    const error = new Error('Error de base de datos');
    mockPrisma.usuario.findMany.mockRejectedValue(error);

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Error al obtener usuarios', details: String(error) });
    expect(mockPrisma.usuario.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol_id: true,
        rango: true,
        fecha_creacion: true,
      },
    });
  });
});