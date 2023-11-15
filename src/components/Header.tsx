'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Bell, Github, Menu, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Container from './ui/container';
import ButtonProfile from './ProfileButton';

// import Image from 'next/image';

// <Image
//   className='px-3'
//   src='/images/logo.png'
//   alt='FPL Logo'
//   width={360}
//   height={240}
// />

const routes = [
  {
    href: '/teams',
    label: 'Teams',
  },
  {
    href: '/fixtures',
    label: 'Fixtures',
  },
  {
    href: '/players',
    label: 'Players',
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className='border-b px-4 py-3 sm:flex sm:justify-between'>
      <Container>
        <div className='lh:px-8 relative flex h-16 w-full items-center justify-between px-4 sm:px-6'>
          <div className='flex items-center'>
            <Sheet>
              <SheetTrigger>
                <Menu className='h-6 w-6 md:hidden' />
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col gap-4'>
                  {routes.map((route, i) => (
                    <Link key={i} href={route.href} className='block px-2 py-1 text-lg'>
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href='/' className='ml-4 lg:ml-0'>
              <h1 className='text-xl font-bold'>
                <span title='Fantasy Premier League'>FPL</span> API Client
              </h1>
            </Link>
          </div>
          {/* 'flex hidden' => 'flex' applies the same CSS properties as 'hidden'? */}
          <nav className='mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6'>
            {routes.map((route, i) => (
              <Button key={`route-button-${i}`} asChild variant='ghost'>
                <Link
                  key={`route-link-${i}`}
                  href={route.href}
                  className='text-sm font-medium transition-colors'
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className='item-center flex'>
            <Button variant='ghost' size='icon' className='mr-2' aria-label='Repositry'>
              <Link
                href='https://github.com/roninzo/fpl-client'
                className='text-sm font-medium transition-colors'
              >
                <Github className='h-6 w-6' />
                <span className='sr-only'>Repositry</span>
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='mr-2'
              aria-label='Toggle Theme'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className='translate-all h-6 w-6 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
              <Moon className='translate-all absolute h-6 w-6 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle Theme</span>
            </Button>
            <Button variant='ghost' size='icon' className='mr-2' aria-label='Notifications'>
              <Bell className='h-6 w-6' />
              <span className='sr-only'>Notifications</span>
            </Button>
            <ButtonProfile />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
