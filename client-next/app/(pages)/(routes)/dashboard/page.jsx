"use client"

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
      <div className="min-h-[200vh] px-32 pt-8">
        {blocks.length > 0 && (
          <div className='flex flex-col gap-y-4'>
            {blocks.map((block, index) => (
              <Link key={index} href={`/dashboard/${block._id}`}>
                <div className='p-4 border rounded'>
                  <h3 className='font-bold'>{block.topic || 'Untitled Block'}</h3>
                  <p>{block.difficulty || 'No Difficulty'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage