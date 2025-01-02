"use client"

import { UploadButton } from '@/lib/uploadthing';
import { courseOutlineFromPdf } from '@/models/course-pdf';
import React from 'react';
import { toast } from 'react-toastify';

const UploadPage = () => {
  const generateBlockPdf = async (res) => {
    const pdfUrl = res[0].appUrl;
    const result = await courseOutlineFromPdf(pdfUrl);
    console.log(result.response.text());
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