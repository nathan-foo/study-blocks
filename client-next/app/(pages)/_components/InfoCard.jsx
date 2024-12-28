import React from 'react'

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 w-[360px] md:w-64'>
      <div className='flex justify-center mb-4'>
        {icon && React.cloneElement(icon, { className: 'text-6xl' })}
      </div>
      <div className='text-center'>
        <h3 className='text-xl text-gray-800'>
            <b>{title}</b>
        </h3>
        <p className='text-sm text-gray-800 pt-1'>
            {description}
        </p>
      </div>
    </div>
  )
}

export default InfoCard