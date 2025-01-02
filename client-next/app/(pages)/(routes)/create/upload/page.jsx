"use client"

import { UploadButton } from '@/lib/uploadthing';
import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs';

const UploadPage = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const generateBlockPdf = async (res) => {
    const pdfUrl = res[0].appUrl;

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
          topic: 'Custom',
          difficulty: 'Custom',
          url: pdfUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      router.push('/dashboard');

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
        throw new Error(`Response status: ${patch.status}`);
      }
    } catch (error) {
      throw new Error(`Failed to create block: ${error}`);
    }

    return new Response('Block created', { status: 201 });
  }

  return (
    <div className='pt-16'>
      <div className='pt-4 px-16 md:px-32'>
        <UploadButton
          endpoint="blockPdf"
          onClientUploadComplete={(res) => {
            generateBlockPdf(res);
          }}
          onUploadError={(error) => {
            toast("Something went wrong.")
          }}
        />
      </div>
    </div>
  )
}

export default UploadPage