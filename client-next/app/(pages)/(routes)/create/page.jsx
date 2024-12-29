"use client"

import React, { useState } from 'react'
import BlockInput from '../../_components/BlockInput'

const CreatePage = () => {
  const [formData, setFormData] = useState([]);

  const handleInput = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  }

  const generateCourseOutline = () => {

  }

  return (
    <div className='pt-16'>
      <div className='flex items-center justify-center'>
        <div className='w-[60%] mt-[15%]'>
          <BlockInput
            setTopic={(value) => handleInput('topic', value)}
            setDifficulty={(value) => handleInput('difficulty', value)}
          />
        </div>
      </div>
    </div>
  )
}

export default CreatePage