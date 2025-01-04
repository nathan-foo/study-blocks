"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
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
    <div>
      {/* {block && (JSON.stringify(block.flashcards.set))} */}
      {(block && block.flashcards) ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='w-[50%]'>
            <Carousel opts={{ loop: true }}>
              <CarouselContent >
                {block.flashcards?.set.map((flashcard, index) => (
                  <CarouselItem key={index} className='flex items-center justify-center'>
                    <div className='px-16 py-32 border rounded-lg text-center text-lg'>
                      <p>
                        <b>Q:</b> {flashcard.question}
                      </p>
                      <p className='pt-2'>
                        <b>A:</b> {flashcard.answer}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen text-center'>
          Loading content...
        </div>
      )}
    </div>
  )
}

export default FlashcardPage