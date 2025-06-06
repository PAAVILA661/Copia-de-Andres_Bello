import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const FooterSection = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const socialLinks = [
  { icon: 'instagram', href: 'https://www.instagram.com/codedex.io' },
  { icon: 'twitter', href: 'https://twitter.com/codedex_io' },
  { icon: 'github', href: 'https://github.com/codedex-io' },
  { icon: 'youtube', href: 'https://www.youtube.com/@codedex' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/company/codedex' },
  { icon: 'tiktok', href: 'https://www.tiktok.com/@codedex.io' },
  { icon: 'spotify', href: 'https://open.spotify.com/show/2vM9NL2O8FanNcO4Y9nuTG?si=289f0227743b45cf' },
];

const Footer = () => {
  return (
    <footer className="bg-codedex-darkNavy border-t border-codedex-gold/10 py-16">
      <div className="codedex-container">
        <div className="flex items-center mb-8">
          <Logo size="sm" />
          <div className="flex items-center ml-auto text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500" fill="currentColor" />
            <span>in Brooklyn, NY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FooterSection
            title="COMPANY"
            links={[
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Shop', href: 'https://codedex.myshopify.com/' },
              { label: 'Community', href: '/community' },
              { label: 'Help Center', href: 'https://codedex.notion.site/Welcome-to-the-Cod-dex-Help-Center-c8afe2966ea9490d9377bce826d22eb7' },
              { label: 'Pricing', href: '/pricing' },
            ]}
          />
          <FooterSection
            title="PRACTICE"
            links={[
              { label: 'Challenges', href: '/challenges' },
              { label: 'Projects', href: '/projects' },
              { label: '#30NitesOfCode', href: '/30-nites-of-code' },
            ]}
          />
          <FooterSection
            title="LEARN"
            links={[
              { label: 'All Courses', href: '/courses' },
              { label: 'Python', href: '/python' },
              { label: 'Intermediate Python', href: '/intermediate-python' },
              { label: 'NumPy', href: '/numpy' },
              { label: 'SQL', href: '/sql' },
              { label: 'HTML', href: '/html' },
              { label: 'CSS', href: '/css' },
            ]}
          />
          <FooterSection
            title=""
            links={[
              { label: 'JavaScript', href: '/javascript' },
              { label: 'Intermediate JavaScript', href: '/intermediate-javascript' },
              { label: 'React', href: '/react' },
              { label: 'Command Line', href: '/command-line' },
              { label: 'Git & GitHub', href: '/git-github' },
              { label: 'p5.js', href: '/p5js' },
              { label: 'C++', href: '/cpp' },
              { label: 'Java', href: '/java' },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-codedex-gold/10">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Niteowl, Inc.{' '}
            <Link href="/terms" className="ml-2 hover:text-white">
              Terms
            </Link>{' '}
            <Link href="/privacy" className="ml-2 hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <div className="w-5 h-5 relative">
                  <Image
                    src={`/images/social/${link.icon}.svg`}
                    alt={link.icon}
                    fill
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              </Link>
            ))}
            <div className="text-gray-600 text-xs ml-2">Earn 100 XP to unlock!</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
