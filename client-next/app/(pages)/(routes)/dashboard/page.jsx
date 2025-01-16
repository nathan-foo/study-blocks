"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DashboardCard from '../../_components/DashboardCard';

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

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
        throw new Error(`Failed to get block: ${error}`);
      }
    }
    fetchData();
  }, [user]);

  const shortenText = (text) => {
    return (text.length > 50) ? text.slice(0, 50) + '...' : text;
  }

  return (
    <div className='px-12 pt-12'>
      <div className='py-12 flex items-center justify-center'>
        <div className='rounded-lg w-[400px] md:w-[580px] lg:w-[880px] xl:w-[1184px] bg-blue-600 text-white flex flex-col items-center justify-center text-center'>
          {user && (
            <div>
              <div className='pt-12 md:pt-20 px-8 font-bold text-3xl md:text-4xl lg:text-5xl'>
                Hey there, {user.firstName}
              </div>
              <div className='hidden md:block pt-8 pb-24 px-8 md:px-16 lg:px-32 xl:px-[17.5 rem] text-sm md:text-base'>
                This is your dashboard, where all of your content can be found and managed. We hope you enjoy your stay!
              </div>
              <div className='md:hidden pt-8 pb-12 px-8 md:px-16 lg:px-32 xl:px-[17.5 rem] text-sm md:text-base'>
                We hope you enjoy your stay!
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='md:pb-6 text-center font-bold text-3xl'>
          Your Blocks
        </div>
        <div className='flex items-center justify-center'>
        <img src='/images/divider.svg' className='hidden md:block md:w-[572px] xl:w-[880px] rounded-md' />
        </div>
        
        {user && blocks.length > 0 ? (
          <div className='flex items-center justify-center gap-8 pt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16'>
              {blocks.map((block, index) => (
                <DashboardCard
                  key={index}
                  title={`${block.outline.courseTitle || 'Untitled Block'}`}
                  description={`${shortenText(block.outline.summary) || 'No description'}`}
                  href={`/dashboard/${block._id}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='py-4 px-8 flex flex-col gap-4 items-center justify-center'>
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
        )}
      </div>
    </div>
  )
}

export default DashboardPage