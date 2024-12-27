"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    const { user } = useUser();

  return (
    <div className='py-4 px-6'>
        <div className='flex items-center justify-end gap-x-3 ml-auto'>
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