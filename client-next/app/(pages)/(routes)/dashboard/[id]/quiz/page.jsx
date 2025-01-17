"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const QuizPage = () => {
  const [block, setBlock] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params) return;
      const { id } = await params;

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks/${id}`;

      try {
        const response = await fetch(url, {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setBlock(data.block);
      } catch (error) {
        throw new Error(`Failed to get block: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center text-center h-screen'>
      {block && (
        <div className='flex flex-col items-center justify-center border rounded-md w-[300px] md:w-[550px] lg:w-[700px] xl:w-[800px] h-[300px] md:h-[400px] xl:h-[450px] px-6 bg-white hover:shadow-md transition-shadow'>
          <div className='text-2xl md:text-4xl font-bold'>Quiz Code</div>
          <div className='text-3xl md:text-6xl p-8'>
            {block.blockId}
          </div>
          <div className=''>Share this code to play your custom quiz game.</div>
        </div>
      )}
    </div>
  )
}

export default QuizPage