import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="codedex-container py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-pixel text-codedex-gold mb-4">
          Explora el mundo de
        </h1>
        <h2 className="text-5xl font-pixel text-codedex-gold mb-6">Codédex</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Comienza tu viaje de programación con más de 200 horas de ejercicios interactivos
          junto con proyectos del mundo real. ¡Explora gratis!
        </p>
      </div>

      {/* La Leyenda de Python */}
      <div className="mb-16">
        <h3 className="text-2xl font-pixel text-white mb-8 border-l-4 border-codedex-teal pl-4">
          La Leyenda de Python
        </h3>
        <p className="text-gray-300 mb-8">
          Comienza con Python, un lenguaje de programación ideal para principiantes,
          perfecto para aprender los fundamentos del código y el análisis de datos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="Python"
            description="¡Aprende los fundamentos de programación como variables, control de flujo y bucles con el lenguaje de programación más popular y versátil — Python!"
            imageSrc="https://ext.same-assets.com/1748103887/4042239105.gif"
            difficulty="PRINCIPIANTE"
            href="/python"
          />
          <CourseCard
            title="Python Intermedio"
            description="Comienza a aprender Python intermedio con estructuras de datos."
            imageSrc="https://ext.same-assets.com/592824475/3305476845.gif"
            difficulty="INTERMEDIO"
            href="/intermediate-python"
          />
          <CourseCard
            title="NumPy"
            description="¡Aprende los fundamentos de la manipulación de datos usando NumPy! Aprende a programar usando NumPy con Codedex -- ¡gratis!"
            imageSrc="https://ext.same-assets.com/592824475/3419107867.gif"
            difficulty="INTERMEDIO"
            href="/numpy"
          />
        </div>
      </div>

      {/* La Trilogía de los Orígenes */}
      <div className="mb-16">
        <h3 className="text-2xl font-pixel text-white mb-8 border-l-4 border-codedex-blue pl-4">
          La Trilogía de los Orígenes
        </h3>
        <p className="text-gray-300 mb-8">
          ¿Quieres crear tu propio sitio web? Aprende las tres tecnologías fundamentales que componen la web.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="HTML"
            description="Crea tu primer sitio web con HTML, los bloques fundamentales de la web y sumérgete en el mundo del desarrollo web."
            imageSrc="https://ext.same-assets.com/1748103887/4277115658.gif"
            difficulty="PRINCIPIANTE"
            href="/html"
          />
          <CourseCard
            title="CSS"
            description="¡Aprende a usar selectores y propiedades CSS para estilizar tus páginas HTML con colores, fuentes, tamaños, diseños y más!"
            imageSrc="https://ext.same-assets.com/1748103887/501262131.webp"
            difficulty="PRINCIPIANTE"
            href="/css"
          />
          <CourseCard
            title="JavaScript"
            description="¡Aprende variables, bucles, funciones y eventos para comenzar a construir aplicaciones web interactivas con el lenguaje de programación de la web — JavaScript!"
            imageSrc="https://ext.same-assets.com/1748103887/3573002446.webp"
            difficulty="PRINCIPIANTE"
            href="/javascript"
          />
        </div>
      </div>

      {/* Todos los Cursos */}
      <div>
        <h3 className="text-2xl font-pixel text-white mb-8 border-l-4 border-codedex-purple pl-4">
          Todos los Cursos
        </h3>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-transparent text-codedex-gold border border-codedex-gold/30 px-4 py-2 rounded-md hover:bg-codedex-gold/10">
            Python
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Desarrollo Web
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Ciencia de Datos
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Herramientas
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Programación Creativa
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Principiante
          </button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-md hover:bg-gray-700/30 hover:text-white">
            Intermedio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="Estructuras de Datos y Algoritmos"
            description="¡Aprende conceptos fundamentales para organizar, almacenar y procesar datos en Python para dominar entrevistas técnicas, problemas de LeetCode o una clase universitaria de EDA!"
            imageSrc="https://ext.same-assets.com/592824475/3042034358.png"
            difficulty="INTERMEDIO"
            href="/data-structures-and-algorithms"
            isNew
          />
          <CourseCard
            title="Node.js"
            description="¡Combina JavaScript con el poder de Node.js—libera tu potencial full-stack con programación del lado del servidor y aplicaciones web dinámicas!"
            imageSrc="https://ext.same-assets.com/592824475/402310742.png"
            difficulty="INTERMEDIO"
            href="/nodejs"
            isNew
          />
          <CourseCard
            title="Java"
            description="¡Domina Java explorando la programación orientada a objetos y estructuras de datos esenciales, desarrollando habilidades para crear aplicaciones eficientes y escalables!"
            imageSrc="https://ext.same-assets.com/592824475/3042034358.png"
            difficulty="PRINCIPIANTE"
            href="/java"
            isNew
          />
        </div>
      </div>
    </div>
  );
};

interface CourseCardProps {
  title: string;
  description: string;
  imageSrc: string;
  difficulty: string;
  href: string;
  isNew?: boolean;
}

const CourseCard = ({
  title,
  description,
  imageSrc,
  difficulty,
  href,
  isNew = false,
}: CourseCardProps) => {
  return (
    <Card className="bg-codedex-navy border border-codedex-gold/20 overflow-hidden transition-transform hover:-translate-y-1 duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {isNew && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-pixel px-2 py-1 rounded">
            ¡NUEVO!
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="text-xs text-gray-400 uppercase mb-1">CURSO</div>
        <h4 className="text-codedex-gold font-pixel text-xl mb-2">{title}</h4>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between">
          <div
            className={`text-white text-xs px-2 py-1 rounded-sm font-pixel ${
              difficulty === "PRINCIPIANTE"
                ? "bg-codedex-teal"
                : difficulty === "INTERMEDIO"
                ? "bg-codedex-blue"
                : "bg-codedex-purple"
            }`}
          >
            {difficulty}
          </div>
          <Link
            href={href}
            className="text-codedex-gold border border-codedex-gold/30 px-3 py-1 text-sm rounded-sm hover:bg-codedex-gold/10"
          >
            EXPLORAR
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesPage;
