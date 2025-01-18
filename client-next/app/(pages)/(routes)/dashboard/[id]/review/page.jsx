"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ReviewPage = () => {
    const [block, setBlock] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const params = useParams();

    const handleBackClick = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
        window.scrollTo({
            top: 0,
        });
    }

    const handleNextClick = () => {
        if (pageIndex < block?.outline.chapters.length - 1) {
            setPageIndex(pageIndex + 1);
        }
        window.scrollTo({
            top: 0,
        });
    }

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
        <div className='py-16 px-16 md:px-32'>
            {block ? (
                <div>
                    <div className='pt-16 font-black text-4xl'>
                        {block.outline.courseTitle}
                    </div>
                    <div className='pt-4 text-black/60 leading-7'>
                        <i>{block.outline.summary}</i>
                    </div>
                    <div>
                        <div className='pt-8 font-bold text-3xl'>
                            {block.outline.chapters[pageIndex].chapterTitle}
                        </div>
                        <div className='pt-4 leading-8'>
                            {block.outline.chapters[pageIndex].summary}
                        </div>
                        {block.outline.chapters[pageIndex].topics.map((topic, index) => (
                            <div key={index}>
                                <div className='pt-4 font-bold text-xl'>
                                    {topic.topic}
                                </div>
                                <div className='pt-2 leading-8'>
                                    {topic.notes}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='pt-12 flex items-center justify-between'>
                        <Button
                            onClick={handleBackClick}
                            disabled={pageIndex === 0 ? true : false}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNextClick}
                            disabled={pageIndex === block?.outline.chapters.length - 1 ? true : false}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='pt-12 flex flex-col gap-4'>
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
    )
}

export default ReviewPage