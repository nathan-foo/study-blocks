"use client"

import React, { useState } from 'react'
import TextInput from '../../_components/TextInput'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { UploadButton } from '@/lib/uploadthing'
import toast from 'react-hot-toast'
import ShortUniqueId from 'short-unique-id'

const CreatePage = () => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    toast('Please wait...', {
      icon: '⌛',
      duration: 10000,
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks`;
    const userId = user?.id;
    const { randomUUID } = new ShortUniqueId({ dictionary: 'number', length: 7 });
    const blockId = randomUUID();

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
        toast.error('Something went wrong.');
        throw new Error(`Response status: ${response.status}`);
      }

      router.push('/dashboard');

      toast.success('Block generated!', {
        duration: 5000,
      });

      const patch = await fetch(`${url}?blockId=${blockId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          difficulty: formData.difficulty,
        }),
      });

      if (!patch.ok) {
        toast.error('Something went wrong.');
        throw new Error(`Response status: ${patch.status}`);
      }
    } catch (error) {
      toast.error('Something went wrong.');
      throw new Error(`Failed to create block: ${error}`);
    }

    return new Response('Block created', { status: 201 });
  }

  const generateBlockPdf = async (res) => {
    setIsLoading(true);

    toast('Please wait...', {
      icon: '⌛',
      duration: 10000,
    });

    const pdfUrl = res[0].appUrl;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks`;
    const userId = user?.id;

    const { randomUUID } = new ShortUniqueId({ dictionary: 'number', length: 7 });
    const blockId = randomUUID();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          blockId: blockId,
          createdBy: userId,
          topic: 'Custom',
          difficulty: 'Custom',
          url: pdfUrl,
        }),
      });

      if (!response.ok) {
        toast.error('Something went wrong.');
        throw new Error(`Response status: ${response.status}`);
      }

      router.push('/dashboard');

      toast.success('Block generated!', {
        duration: 5000,
      });

      const patch = await fetch(`${url}?blockId=${blockId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'Custom',
          difficulty: 'Custom',
          url: pdfUrl,
        }),
      });

      if (!patch.ok) {
        toast.error('Something went wrong.');
        throw new Error(`Response status: ${patch.status}`);
      }
    } catch (error) {
      toast.error('Something went wrong.');
      throw new Error(`Failed to create block: ${error}`);
    }

    return new Response('Block created', { status: 201 });
  }

  return (
    <div>
      {!isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='w-[60%]'>
            <TextInput
              setTopic={(value) => handleInput('topic', value)}
              setDifficulty={(value) => handleInput('difficulty', value)}
            />
            <div className='flex items-center justify-center md:block'>
            <Button className='w-24 mt-6' onClick={generateBlock}>Generate</Button>
            </div>
            <div className='text-center text-sm'>
              <p className='font-bold py-4 text-lg'>Or upload a pdf</p>
              <UploadButton
                endpoint="blockPdf"
                onClientUploadComplete={(res) => {
                  generateBlockPdf(res);
                }}
                onUploadError={(error) => {
                  toast.error('Something went wrong.');
                }}
              />
            </div>
          </div>
        </div>
      ): (
        <div className='flex items-center justify-center h-screen'>
          <img src='/images/loading.webp' className='w-[156px]' />
        </div>
      )}
    </div>
  )
}

export default CreatePage