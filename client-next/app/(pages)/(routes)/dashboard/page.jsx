"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks?createdBy=${user.id}`;

      try {
        const response = await fetch(url, {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setBlocks(data.blocks);
      } catch (error) {
        throw new Error(`Failed to create block: ${error}`);
      }
    }
    fetchData();
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="pt-16">
      <div className='pt-12 pb-8 font-black text-5xl flex items-center justify-center text-center'>
        Your blocks
      </div>
      <div className="px-16 md:px-32 py-8">
        {user && blocks.length > 0 ? (
          <div className='flex flex-col gap-y-4'>
            {blocks.map((block, index) => (
              <Link key={index} href={`/dashboard/${block._id}`}>
                <div className='p-4 border rounded'>
                  <h3 className='font-bold'>{block.outline.courseTitle || 'Untitled Block'}</h3>
                  <p>{block.difficulty || 'No Difficulty'}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-y-4'>
            <div className='p-4 flex flex-col gap-4 items-center justify-center'>
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
              <Skeleton className='w-full h-[20px]' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage