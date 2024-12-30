"use client"

import React, { useState } from 'react'
import BlockInput from '../../_components/BlockInput'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const CreatePage = () => {
  const [formData, setFormData] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

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

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks`;
    const blockId = uuidv4();
    const userId = user.id;
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
    } catch (error) {
      throw new Error(`Failed to create block: ${error}`);
    }

    router.push('/dashboard');

    return new Response('Block created', { status: 201 });
  }

  return (
    <div className='pt-16'>
      <div className='flex items-center justify-center'>
        <div className='w-[60%] mt-[15%]'>
          <BlockInput
            setTopic={(value) => handleInput('topic', value)}
            setDifficulty={(value) => handleInput('difficulty', value)}
          />
          <Button className='w-24 mt-6' onClick={generateBlock}>Generate</Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage