import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
      <div className="relative w-6 h-6">
        <Image
          src="https://ext.same-assets.com/1748103887/1764963315.png"
          alt="Codedex Coin"
          fill
          className="object-contain"
        />
      </div>
      <span className={`font-bold ${sizeClasses[size]} font-pixel`}>Codedex</span>
    </Link>
  );
};

export default Logo;
