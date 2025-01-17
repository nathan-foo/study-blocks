import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='mt-32 md:mt-56 mb-12'>
            <div className='container mx-auto px-3 md:px-10'>
                <div className='hidden md:flex flex-row items-center md:items-start justify-between px-5 opacity-50'>
                    <div className='flex flex-col gap-4'>
                        <Link href='/about'>About</Link>
                        <Link href='/contact'>Contact</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Link href='/play'>Play</Link>
                        <Link href='/create'>Create</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Link href='/'>Home</Link>
                        <Link href='/'>Dashboard</Link>
                    </div>
                    <div className='flex flex-col gap-4'>
                    <a href='https://github.com/nathan-foo/study-blocks/' target='_blank'>Code</a>
                        <a href='https://www.linkedin.com/in/nathan-foo/' target='_blank'>Connect</a>
                    </div>
                </div>
                <div className='px-5 pt-12 flex items-center justify-center opacity-50'>
                    &copy; 2025
                </div>
            </div>
        </div>
    )
}

export default Footer;