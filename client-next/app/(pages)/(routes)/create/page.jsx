"use client"

import React, { useState } from 'react'
import TextInput from '../../_components/TextInput'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const CreatePage = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const handlePdf = () => {
    router.push('/create/upload');
  }

  const handleInput = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  }

  const generateBlock = async () => {
    if (!formData.topic || !formData.difficulty) {
      return;
    }

    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks`;
    const userId = user?.id;
    const blockId = uuidv4();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          blockId: blockId,
          createdBy: userId,
          topic: formData.topic,
          difficulty: formData.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      router.push('/dashboard');

      const quiz = await fetch(`${url}?blockId=${blockId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          difficulty: formData.difficulty,
        }),
      });

      if (!quiz.ok) {
        throw new Error(`Response status: ${quiz.status}`);
      }
    } catch (error) {
      throw new Error(`Failed to create block: ${error}`);
    }

    return new Response('Block created', { status: 201 });
  }

  return (
    <div className='pt-16'>
      <div className='flex items-center justify-center'>
        <div className='w-[60%] mt-[10%]'>
          <TextInput
            setTopic={(value) => handleInput('topic', value)}
            setDifficulty={(value) => handleInput('difficulty', value)}
          />
          {(isLoading) ? (
            <Button disabled className='w-24 mt-6'>Loading...</Button>
          ) : (
            <Button className='w-24 mt-6' onClick={generateBlock}>Generate</Button>
          )}
          <div>
            <Button className='w-40 mt-6' onClick={handlePdf}>Generate from PDF</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage