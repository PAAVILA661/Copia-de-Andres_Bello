import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Define el esquema de validación para las credenciales
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Mock de usuarios para demostración
// En producción, esto se reemplazaría por una conexión a base de datos
const USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123", // Nunca almacenar contraseñas en texto plano en producción
    role: "student",
    progress: {
      "01-setting-up": { completed: true, attempts: 3 },
      "02-hello-world": { completed: false, attempts: 1 },
    },
  },
  {
    id: "2",
    name: "Teacher",
    email: "teacher@example.com",
    password: "teacher123",
    role: "teacher",
  },
];

export const { auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Añadir información adicional a la sesión
      if (token.sub && session.user) {
        const user = USERS.find((user) => user.id === token.sub);
        if (user) {
          session.user.id = user.id;
          session.user.role = user.role;
          session.user.progress = user.progress;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      // Pasar información del usuario al token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validar credenciales
        const result = credentialsSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        // Buscar usuario
        const user = USERS.find((user) => user.email === result.data.email);

        // Verificar contraseña (en producción, usar bcrypt o similar)
        if (!user || user.password !== result.data.password) {
          return null;
        }

        // Devolver la información del usuario (sin la contraseña)
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
    // Se pueden añadir más proveedores como Google, GitHub, etc.
  ],
});

// Tipos para TypeScript
declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    progress?: Record<string, { completed: boolean; attempts: number }>;
  }

  interface Session {
    user: User & {
      id: string;
      role?: string;
      progress?: Record<string, { completed: boolean; attempts: number }>;
    };
  }
}
