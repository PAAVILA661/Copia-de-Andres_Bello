import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CourseSidebarProps {
  username: string;
  level: number;
  progress: {
    exercises: { completed: number; total: number };
    projects: { completed: number; total: number };
    xp: { earned: number; total: number };
    badges: { earned: number; total: number };
  };
  cheatSheets: {
    title: string;
    unlocksAfter: number;
    isUnlocked: boolean;
  }[];
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  username,
  level,
  progress,
  cheatSheets,
}) => {
  const badges = [
    { id: 'hello-world', image: 'https://ext.same-assets.com/1748103887/326291293.png', isEarned: false },
    { id: 'variables', image: 'https://ext.same-assets.com/1748103887/3042823545.png', isEarned: false },
    { id: 'control-flow', image: 'https://ext.same-assets.com/1748103887/3320105460.png', isEarned: false },
    { id: 'loops', image: 'https://ext.same-assets.com/1748103887/1524852266.png', isEarned: false },
    { id: 'lists', image: 'https://ext.same-assets.com/1748103887/1524852266.png', isEarned: false },
    { id: 'functions', image: 'https://ext.same-assets.com/1748103887/159953230.png', isEarned: false },
    { id: 'classes-objects', image: 'https://ext.same-assets.com/1748103887/2484803668.png', isEarned: false },
    { id: 'modules', image: 'https://ext.same-assets.com/1748103887/159953230.png', isEarned: false },
  ];

  return (
    <div className="space-y-6">
      {/* Perfil de Usuario */}
      <Card className="bg-codedex-navy border-codedex-gold/10">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-codedex-gold rounded-full flex items-center justify-center mb-2">
              <span className="text-codedex-darkNavy font-bold text-xl">
                {username.charAt(0)}
              </span>
            </div>
            <h3 className="text-white text-lg font-medium mb-1">{username}</h3>
            <div className="text-sm text-gray-400 mb-4">Nivel {level}</div>
            <Button
              variant="outline"
              className="w-full border-codedex-gold/30 text-codedex-gold"
              asChild
            >
              <Link href="/profile">Ver Perfil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progreso del Curso */}
      <Card className="bg-codedex-navy border-codedex-gold/10">
        <CardContent className="p-6">
          <h3 className="text-white font-medium mb-4">Progreso del Curso</h3>

          {/* Ejercicios */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-300 text-sm">Ejercicios</div>
            <div className="text-gray-300 text-sm">{progress.exercises.completed} / {progress.exercises.total}</div>
          </div>
          <div className="w-full bg-codedex-darkNavy rounded-full h-2 mb-4">
            <div
              className="bg-codedex-teal h-2 rounded-full"
              style={{ width: `${(progress.exercises.completed / progress.exercises.total) * 100}%` }}
            />
          </div>

          {/* Proyectos Completados */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-300 text-sm">Proyectos Completados</div>
            <div className="text-gray-300 text-sm">{progress.projects.completed} / {progress.projects.total}</div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-codedex-darkNavy rounded-full flex items-center justify-center">
              <Image
                src="https://ext.same-assets.com/1748103887/3771528755.svg"
                alt="Proyecto de Control"
                width={16}
                height={16}
              />
            </div>
            <div className="w-6 h-6 bg-codedex-darkNavy rounded-full flex items-center justify-center">
              <Image
                src="https://ext.same-assets.com/1748103887/3281843955.svg"
                alt="Proyecto Final"
                width={16}
                height={16}
              />
            </div>
          </div>

          {/* XP Ganada */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-300 text-sm">XP Ganada</div>
            <div className="text-gray-300 text-sm">{progress.xp.earned} / {progress.xp.total}</div>
          </div>
          <div className="w-full bg-codedex-darkNavy rounded-full h-2 mb-4">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${(progress.xp.earned / progress.xp.total) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Insignias del Curso */}
      <Card className="bg-codedex-navy border-codedex-gold/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Insignias del Curso</h3>
            <div className="text-gray-400 text-sm">{progress.badges.earned} / {progress.badges.total}</div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            ¡Completa un capítulo para ganar una insignia - colecciónalas todas!
          </p>
          <div className="grid grid-cols-4 gap-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`w-12 h-12 rounded-full overflow-hidden ${badge.isEarned ? '' : 'opacity-30 grayscale'}`}
              >
                <Image
                  src={badge.image}
                  alt={badge.id}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hojas de Referencia */}
      <Card className="bg-codedex-navy border-codedex-gold/10">
        <CardContent className="p-6">
          <h3 className="text-white font-medium mb-4">Hojas de Referencia</h3>
          <div className="space-y-3">
            {cheatSheets.map((sheet, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 rounded-sm border border-gray-500" />
                </div>
                <div className="flex-grow text-sm">
                  {sheet.isUnlocked ? (
                    <div className="text-codedex-gold">{sheet.title}</div>
                  ) : (
                    <div className="text-gray-400">
                      Se desbloquea después del Cap. {sheet.unlocksAfter}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ¿Necesitas Ayuda? */}
      <Card className="bg-codedex-navy border-codedex-gold/10">
        <CardContent className="p-6">
          <h3 className="text-white font-medium mb-2">¿Necesitas Ayuda con Python?</h3>
          <p className="text-gray-400 text-sm mb-4">
            ¡Haz preguntas en nuestra comunidad!
          </p>
          <Button
            variant="outline"
            className="w-full border-codedex-gold/30 text-codedex-gold"
            asChild
          >
            <Link href="/community/python">Ir a la Comunidad</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
