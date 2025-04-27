import ExerciseClient from './ExerciseClient';
import { pythonExercises } from '@/data/exercises/python';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return Object.keys(pythonExercises).map(exercise => ({
    exercise
  }));
}

interface PageProps {
  params: {
    exercise: string;
  };
}

export default async function Page({ params }: PageProps) {
  // Validar que el ejercicio existe
  const exerciseId = params?.exercise;
  
  if (!exerciseId || !pythonExercises[exerciseId]) {
    console.error(`Ejercicio no encontrado: ${exerciseId}`);
    console.log('Ejercicios disponibles:', Object.keys(pythonExercises));
    notFound();
  }

  return <ExerciseClient params={params} />;
}
