/**
 * db.d.ts - Tipos para el cliente Prisma
 * Este archivo proporciona tipado TypeScript para db.js
 */

import type { Prisma, Usuario, Rol, Curso, Modulo, Ejercicio, PlanSuscripcion } from '@prisma/client';

export interface UsuarioWithRol extends Usuario {
  rol: Rol;
}

export interface UsuarioWithProgress extends Usuario {
  rol: Rol;
  progreso_usuario: Array<{
    id: string;
    usuario_id: string;
    ejercicio_id: string;
    completado: boolean;
    intentos: number;
    puntos_obtenidos: number;
    ultima_actualizacion: Date;
  }>;
}

export interface CursoWithCategories extends Curso {
  categorias: Array<{
    curso_id: string;
    categoria_id: string;
    categoria: {
      id: string;
      nombre: string;
      descripcion: string | null;
    };
  }>;
}

export interface CursoWithModules extends CursoWithCategories {
  modulos: Array<ModuloWithEjercicios>;
}

export interface ModuloWithEjercicios extends Modulo {
  ejercicios: Ejercicio[];
}

export interface PlanWithFeatures extends PlanSuscripcion {
  caracteristicas: Array<{
    plan_id: string;
    caracteristica_id: string;
    caracteristica: {
      id: string;
      nombre: string;
      descripcion: string | null;
    };
  }>;
}

export interface RolWithPermissions extends Rol {
  rol_permisos: Array<{
    rol_id: string;
    permiso_id: string;
    permiso: {
      id: string;
      nombre: string;
      descripcion: string | null;
    };
  }>;
}

export interface DbClient {
  prisma: any;
  getUsuarios(): Promise<Usuario[]>;
  getUsuarioById(id: string): Promise<UsuarioWithProgress | null>;
  getUsuarioByEmail(email: string): Promise<UsuarioWithRol | null>;
  getRoles(): Promise<RolWithPermissions[]>;
  getCursos(): Promise<CursoWithCategories[]>;
  getCursoById(id: string): Promise<CursoWithModules | null>;
  getPlanesSuscripcion(): Promise<PlanWithFeatures[]>;
}

declare const db: DbClient;
export default db;
