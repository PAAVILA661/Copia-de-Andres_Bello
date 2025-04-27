"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu } from 'lucide-react';

interface NavBarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function NavBar({ user }: NavBarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-codedex-navy border-b border-codedex-gold/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-pixel text-codedex-gold">
            Codedex
          </Link>
          
          <nav className="hidden md:flex ml-10 space-x-8">
            <Link 
              href="/python"
              className={`text-sm font-medium hover:text-white ${isActive('/python') ? 'text-white' : 'text-gray-300'}`}
            >
              Python
            </Link>
            <Link 
              href="/courses"
              className={`text-sm font-medium hover:text-white ${isActive('/courses') ? 'text-white' : 'text-gray-300'}`}
            >
              Courses
            </Link>
            <Link 
              href="/community"
              className={`text-sm font-medium hover:text-white ${isActive('/community') ? 'text-white' : 'text-gray-300'}`}
            >
              Community
            </Link>
            <Link 
              href="/pricing"
              className={`text-sm font-medium hover:text-white ${isActive('/pricing') ? 'text-white' : 'text-gray-300'}`}
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <User size={18} />
                  <span className="hidden md:inline">{user.name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-codedex-navy border border-codedex-gold/10">
                <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-codedex-darkNavy focus:bg-codedex-darkNavy cursor-pointer">
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-codedex-darkNavy focus:bg-codedex-darkNavy cursor-pointer">
                  <Link href="/progress" className="w-full">My Progress</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-codedex-darkNavy focus:bg-codedex-darkNavy cursor-pointer">
                  <Link href="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="text-red-400 hover:bg-codedex-darkNavy focus:bg-codedex-darkNavy cursor-pointer flex items-center"
                  onClick={() => signOut({ redirectTo: '/' })}
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signin">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-codedex-gold text-codedex-darkNavy hover:bg-codedex-gold/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          
          <Button variant="ghost" className="md:hidden ml-2 text-gray-300 hover:text-white">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
} 