import React from 'react';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Moon } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-codedex-darkNavy border-b border-codedex-gold/10">
      <div className="codedex-container flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Logo />
          <NavigationMenu />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-codedex-gold">
            <Moon size={18} />
          </Button>
          <Button className="bg-codedex-gold text-codedex-darkNavy hover:bg-codedex-gold/90 font-pixel" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
