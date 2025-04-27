"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pythonExercises, Exercise } from '@/data/exercises/python';
import CodeEditor from '@/components/CodeEditor';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import SuccessConfetti from '@/components/animations/SuccessConfetti';
import { notFound } from 'next/navigation';

interface ExerciseClientProps {
  params: {
    exercise: string;
  };
}

const ExerciseClient = ({ params }: ExerciseClientProps) => {
  const exerciseSlug = params?.exercise;
  
  if (!exerciseSlug || !pythonExercises[exerciseSlug]) {
    console.error('Ejercicio no encontrado:', exerciseSlug);
    console.log('Ejercicios disponibles:', Object.keys(pythonExercises));
    notFound();
    return null;
  }

  const exerciseData: Exercise = pythonExercises[exerciseSlug];
  
  const [code, setCode] = useState(exerciseData.initialCode || '# Escribe tu código aquí\n');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (exerciseData) {
      setCode(exerciseData.initialCode || '# Escribe tu código aquí\n');
    }
  }, [exerciseData]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');

    // Simular la ejecución del código con un retraso
    setTimeout(() => {
      // Normalizar el código eliminando espacios en blanco y convirtiéndolo a minúsculas para comparación
      const normalizedCode = code.trim().toLowerCase();
      
      // Verificar si el código coincide con alguno de los casos de prueba
      const matchingTest = exerciseData.testCases.find(test => 
        normalizedCode.includes(test.input.trim().toLowerCase())
      );

      if (matchingTest) {
        setOutput(matchingTest.expectedOutput);
      } else {
        setOutput('Tu código no produjo el resultado esperado. ¡Inténtalo de nuevo!');
      }
      
      setIsRunning(false);
    }, 1000);
  };

  const handleCheckAnswer = () => {
    const isCorrect = exerciseData.testCases.some(test => 
      test.expectedOutput === output
    );

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => {
        alert('¡Excelente trabajo! Puedes continuar con el siguiente ejercicio.');
        setShowConfetti(false);
      }, 500);
    } else {
      alert('Tu solución no es correcta. Por favor, inténtalo de nuevo.');
    }
  };

  const handleResetCode = () => {
    if (exerciseData) {
      setCode(exerciseData.initialCode || '# Escribe tu código aquí\n');
    }
  };

  const handleSaveCode = () => {
    // Esto se conectaría a una API backend en una implementación real
    alert('¡Código guardado exitosamente! (Este es un marcador de posición para la integración real con el backend)');
  };

  // Obtener los slugs de ejercicios anterior y siguiente
  const exerciseSlugs = Object.keys(pythonExercises);
  const currentIndex = exerciseSlugs.indexOf(exerciseSlug);
  const prevExercise = currentIndex > 0 ? exerciseSlugs[currentIndex - 1] : null;
  const nextExercise = currentIndex < exerciseSlugs.length - 1 ? exerciseSlugs[currentIndex + 1] : null;

  return (
    <FadeIn className="min-h-screen bg-codedex-darkNavy">
      <SuccessConfetti show={showConfetti} />
      
      <div className="border-b border-codedex-gold/10">
        <div className="codedex-container py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/python" className="text-codedex-gold hover:text-white mr-2">
              <ChevronLeft size={20} />
            </Link>
            <span className="text-white font-medium">
              La Leyenda de Python / {exerciseData.title}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* Panel izquierdo - Descripción del ejercicio */}
        <SlideIn direction="left" className="bg-codedex-darkNavy p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-codedex-teal text-sm">Ejercicio</span>
            </div>

            <h1 className="text-3xl font-pixel text-codedex-gold">
              {exerciseData.number}. {exerciseData.title}
            </h1>

            <div className="text-gray-300 space-y-4">
              <p>{exerciseData.description}</p>

              <div className="mt-8">
                <h2 className="font-pixel text-white text-xl mb-2">Instrucciones</h2>
                <div className="text-gray-300 whitespace-pre-line">
                  {exerciseData.instructions}
                </div>

                <div className="mt-6 p-4 bg-codedex-navy rounded-md border border-codedex-gold/10">
                  <p className="text-white font-medium mb-2">Resultado Esperado:</p>
                  <pre className="text-gray-300 font-mono text-sm">
                    {exerciseData.expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </SlideIn>

        {/* Panel derecho - Editor de código */}
        <SlideIn direction="right" className="bg-codedex-navy flex flex-col">
          <CodeEditor
            initialCode={code}
            onChange={setCode}
            onRun={handleRunCode}
            isRunning={isRunning}
            output={output}
            onReset={handleResetCode}
            onSave={handleSaveCode}
          />

          {/* Navegación inferior */}
          <div className="p-4 border-t border-gray-800 flex items-center justify-between">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              asChild
              disabled={!prevExercise}
            >
              <Link href={prevExercise ? `/python/${prevExercise}` : '#'}>
                <ChevronLeft size={16} className="mr-1" />
                Anterior
              </Link>
            </Button>

            <Button
              onClick={handleCheckAnswer}
              className="bg-codedex-gold text-codedex-darkNavy hover:bg-codedex-gold/90"
            >
              Verificar Respuesta
            </Button>

            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              asChild
              disabled={!nextExercise}
            >
              <Link href={nextExercise ? `/python/${nextExercise}` : '#'}>
                Siguiente
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </SlideIn>
      </div>
    </FadeIn>
  );
};

export default ExerciseClient; 