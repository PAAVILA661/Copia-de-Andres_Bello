import type React from 'react';
import Image from 'next/image';

interface FeatureItemProps {
  title: string;
  description: string;
  imageSrc: string;
  reversed?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, imageSrc, reversed = false }) => {
  return (
    <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center mb-24`}>
      <div className="w-full lg:w-1/2">
        <h3 className="text-2xl font-pixel text-codedex-gold mb-4">{title}</h3>
        <p className="text-gray-300 text-lg">{description}</p>
      </div>
      <div className="w-full lg:w-1/2 relative h-64 lg:h-96">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: 'Sube de nivel en tu aprendizaje',
      description: 'Gana XP y colecciona insignias mientras completas lecciones cortas de Python, HTML, JavaScript y más. Nuestro plan de estudios amigable para principiantes hace que aprender a programar sea tan motivador como completar tu próxima misión.',
      imageSrc: 'https://ext.same-assets.com/1748103887/4141948722.gif',
    },
    {
      title: 'Practica tus habilidades de programación',
      description: 'Lleva tus habilidades más allá con desafíos de código y tutoriales de proyectos diseñados para ayudarte a aplicar lo que aprendiste a problemas y ejemplos del mundo real.',
      imageSrc: 'https://ext.same-assets.com/1748103887/2596108440.webp',
      reversed: true,
    },
    {
      title: 'Construye un portafolio increíble',
      description: 'Crea tus propios sitios web interactivos, mini-juegos, aplicaciones móviles, visualizaciones de datos y muéstralos a tus amigos o al mundo, todo en Codedex.',
      imageSrc: 'https://ext.same-assets.com/1748103887/659665000.svg',
    },
    {
      title: 'Haz amigos en el camino',
      description: 'Construir es mucho mejor juntos que solos. Únete a nuestro foro comunitario y Discord para dar y recibir ayuda, colaborar en proyectos y conectar a través de pasiones compartidas.',
      imageSrc: 'https://ext.same-assets.com/1748103887/1455037872.gif',
      reversed: true,
    },
  ];

  return (
    <section className="py-16 bg-codedex-navy">
      <div className="codedex-container">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            reversed={feature.reversed}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
