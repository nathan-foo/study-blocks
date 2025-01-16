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
    <div className={`fixed bg-white top-0 left-0 w-full py-3 px-6 ${isScrolled ? 'shadow-md' : 'shadow-none'} transition-shadow duration-300 z-50`}>
        <div className='flex justify-between'>
            <div className='w-full flex items-center justify-start gap-3'>
                <Link href='/'>
                    <p className='text-sm text-blue-primary font-magical-childhood ml-3 mr-1'>
                        <b>Study Blocks</b>
                    </p>
                </Link>
                <Link href='/about'>
                    <Button variant='secondary' className='hidden md:block'>
                        About
                    </Button>
                </Link>
                <Link href='/resources'>
                    <Button variant='secondary' className='hidden md:block'>
                        Resources
                    </Button>
                </Link>
            </div>
            <div className='container mx-auto flex items-center justify-end gap-3'>
                <Link href='/play'>
                    <Button variant='secondary' className='hidden md:block'>
                        Play
                    </Button>
                </Link>
                <Link href='/create'>
                    <Button variant='secondary' className='hidden md:block'>
                        Create
                    </Button>
                </Link>
                <Link href='/dashboard'>
                    <Button variant='secondary' className='hidden md:block mr-1'>
                        Dashboard
                    </Button>
                </Link>
                {user ? (
                    <UserButton />
                ) : (
                    <Link href='sign-in'>
                        <Button>
                            Log in
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar