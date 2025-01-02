"use client"

import { UploadButton } from '@/lib/uploadthing';
import React, { useState } from 'react'

const UploadPage = () => {
  const generateBlockPdf = () => {
    console.log('Button clicked');
  }

  return (
    <div className='pt-16'>
      <div className='pt-4 px-16 md:px-32'>
        <UploadButton
          endpoint="blockPdf"
          onClientUploadComplete={(res) => {
            console.log("Url: ", res[0].appUrl);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  )
}

export default UploadPage