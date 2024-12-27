"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    const { user } = useUser();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

  return (
    <div className={`fixed bg-white top-0 left-0 w-full py-4 px-6 ${isScrolled ? 'shadow-md' : 'shadow-none'} transition-shadow duration-300`}>
        <div className='container mx-auto flex items-center justify-end gap-x-3'>
            <Link href='/'>
                <Button size='sm' variant='ghost'>
                    Home
                </Button>
            </Link>
            <Link href='/play'>
                <Button size='sm' variant='ghost'>
                    Play
                </Button>
            </Link>
            <Link href='/dashboard'>
                <Button size='sm' variant='ghost'>
                    Dashboard
                </Button>
            </Link>
            {user ? (
                <UserButton />
            ) : (
                <Link href='sign-in'>
                    <Button size='sm'>
                        Sign In
                    </Button>
                </Link>
            )}
        </div>
    </div>
  )
}

export default Navbar