import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavigationMenu = () => {
  const navItems = [
    {
      label: 'Learn',
      dropdownItems: [
        { label: 'Python', href: '/python' },
        { label: 'Intermediate Python', href: '/intermediate-python' },
        { label: 'NumPy', href: '/numpy' },
        { label: 'SQL', href: '/sql' },
        { label: 'Gen AI', href: '/gen-ai' },
        { label: 'HTML', href: '/html' },
        { label: 'CSS', href: '/css' },
        { label: 'JavaScript', href: '/javascript' },
        { label: 'Intermediate JavaScript', href: '/intermediate-javascript' },
        { label: 'React', href: '/react' },
        { label: 'p5.js', href: '/p5js' },
        { label: 'Node.js', href: '/nodejs' },
        { label: 'Command Line', href: '/command-line' },
        { label: 'Git & GitHub', href: '/git-github' },
        { label: 'C++', href: '/cpp' },
        { label: 'Java', href: '/java' },
      ],
    },
    {
      label: 'Practice',
      dropdownItems: [
        { label: 'Challenges', href: '/challenges' },
        { label: 'Projects', href: '/projects' },
        { label: '#30NitesOfCode', href: '/30-nites-of-code' },
      ],
    },
    {
      label: 'Build',
      href: '/builds',
    },
    {
      label: 'Community',
      href: '/community',
      dropdownItems: [
        { label: 'Home', href: '/community' },
        { label: 'Leaderboards', href: '/community/leaderboards' },
        { label: 'Project Showcase', href: '/community/project-showcase' },
        { label: 'Monthly Challenge', href: '/community/monthly-challenge' },
      ],
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
  ];

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        if (item.dropdownItems) {
          return (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-codedex-gold hover:text-white px-4 py-2 flex items-center gap-1">
                  {item.label}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-codedex-navy border border-codedex-gold/30 w-56">
                {item.dropdownItems.map((dropdownItem) => (
                  <DropdownMenuItem key={dropdownItem.label} asChild>
                    <Link
                      href={dropdownItem.href}
                      className="text-codedex-gold hover:bg-codedex-gold/10 focus:bg-codedex-gold/10 cursor-pointer px-4 py-2"
                    >
                      {dropdownItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Button
            key={item.label}
            variant="ghost"
            className="text-codedex-gold hover:text-white px-4 py-2"
            asChild
          >
            <Link href={item.href || '#'}>{item.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
