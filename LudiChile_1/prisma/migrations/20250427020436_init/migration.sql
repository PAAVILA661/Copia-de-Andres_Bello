-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol_id" TEXT NOT NULL,
    "rango" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_permiso" (
    "rol_id" TEXT NOT NULL,
    "permiso_id" TEXT NOT NULL,

    CONSTRAINT "rol_permiso_pkey" PRIMARY KEY ("rol_id","permiso_id")
);

-- CreateTable
CREATE TABLE "plan_suscripcion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "intervalo_pago" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "plan_suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caracteristica" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "caracteristica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_caracteristica" (
    "plan_id" TEXT NOT NULL,
    "caracteristica_id" TEXT NOT NULL,
    "valor" TEXT,

    CONSTRAINT "plan_caracteristica_pkey" PRIMARY KEY ("plan_id","caracteristica_id")
);

-- CreateTable
CREATE TABLE "suscripcion_usuario" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "plan_id" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(3),
    "estado" TEXT NOT NULL,
    "id_transaccion_pago" TEXT,

    CONSTRAINT "suscripcion_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "url_imagen" TEXT,
    "dificultad" TEXT NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT false,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_curso" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categoria_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_categoria" (
    "curso_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,

    CONSTRAINT "curso_categoria_pkey" PRIMARY KEY ("curso_id","categoria_id")
);

-- CreateTable
CREATE TABLE "modulo" (
    "id" UUID NOT NULL,
    "curso_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ejercicio" (
    "id" TEXT NOT NULL,
    "modulo_id" UUID NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "instrucciones" TEXT,
    "salida_esperada" TEXT,
    "codigo_inicial" TEXT,
    "test_cases_json" JSONB,

    CONSTRAINT "ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progreso_usuario" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "ejercicio_id" TEXT NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "intentos" INTEGER NOT NULL DEFAULT 0,
    "puntos_obtenidos" INTEGER NOT NULL DEFAULT 0,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "progreso_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canal" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "canal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "canal_id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "url_imagen" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentario" (
    "id" UUID NOT NULL,
    "publicacion_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comentario_padre_id" UUID,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_publicacion" (
    "usuario_id" UUID NOT NULL,
    "publicacion_id" UUID NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_publicacion_pkey" PRIMARY KEY ("usuario_id","publicacion_id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "url_enlace" TEXT,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticia" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "resumen" TEXT,
    "tipo" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noticia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "caracteristica_nombre_key" ON "caracteristica"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_curso_nombre_key" ON "categoria_curso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "progreso_usuario_usuario_id_ejercicio_id_key" ON "progreso_usuario"("usuario_id", "ejercicio_id");

-- CreateIndex
CREATE UNIQUE INDEX "canal_nombre_key" ON "canal"("nombre");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_caracteristica" ADD CONSTRAINT "plan_caracteristica_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan_suscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_caracteristica" ADD CONSTRAINT "plan_caracteristica_caracteristica_id_fkey" FOREIGN KEY ("caracteristica_id") REFERENCES "caracteristica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_usuario" ADD CONSTRAINT "suscripcion_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_usuario" ADD CONSTRAINT "suscripcion_usuario_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan_suscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_categoria" ADD CONSTRAINT "curso_categoria_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_categoria" ADD CONSTRAINT "curso_categoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria_curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "modulo_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejercicio" ADD CONSTRAINT "ejercicio_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_usuario" ADD CONSTRAINT "progreso_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progreso_usuario" ADD CONSTRAINT "progreso_usuario_ejercicio_id_fkey" FOREIGN KEY ("ejercicio_id") REFERENCES "ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_canal_id_fkey" FOREIGN KEY ("canal_id") REFERENCES "canal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_comentario_padre_id_fkey" FOREIGN KEY ("comentario_padre_id") REFERENCES "comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_publicacion" ADD CONSTRAINT "like_publicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_publicacion" ADD CONSTRAINT "like_publicacion_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
