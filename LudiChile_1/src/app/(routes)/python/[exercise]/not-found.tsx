import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-codedex-darkNavy flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-pixel text-codedex-gold mb-4">
          Ejercicio No Encontrado
        </h1>
        <p className="text-gray-300 mb-8">
          Lo sentimos, no pudimos encontrar el ejercicio que estás buscando.
        </p>
        <Button asChild>
          <Link href="/python">
            Volver al Curso de Python
          </Link>
        </Button>
      </div>
    </div>
  );
} 