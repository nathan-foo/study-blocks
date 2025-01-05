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
        throw new Error(`Failed to create block: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='pt-16'>
      {(block && block.quiz) ? (
        <div>
          <div className='font-bold text-lg text-center'>Quiz Code: {block.blockId}</div>
          <div className='pt-2'>({JSON.stringify(block.quiz.questions)})</div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen text-center'>
          Loading content...
        </div>
      )}
    </div>
  )
}

export default QuizPage