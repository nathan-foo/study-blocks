"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const FlashcardPage = () => {
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
      {block && (JSON.stringify(block.flashcards.set))}
    </div>
  )
}

export default FlashcardPage