"use client"

import Flashcard from '@/app/(pages)/_components/Flashcard';
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
        throw new Error(`Failed to get block: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* {block && (JSON.stringify(block.flashcards.set))} */}
      {(block && block.flashcards) && (
        <div className='flex items-center justify-center h-screen'>
          <div className='w-[70%] md:w-[60%]'>
            <Carousel opts={{ loop: true }} className='mt-8'>
              <CarouselContent>
                {block.flashcards?.set.map((flashcard, index) => (
                  <CarouselItem key={index} className='flex items-center justify-center'>
                    <Flashcard frontContent={flashcard.question} backContent={flashcard.answer} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlashcardPage