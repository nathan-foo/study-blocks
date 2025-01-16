import React from 'react';

const InfoCard = ({ icon, title, description, gradient }) => {
  return (
    <div className={`relative bg-white hover:shadow-lg transition-shadow rounded-lg overflow-hidden w-[300px] h-[360px]`}>
      <div className={`absolute top-0 left-0 w-[110%] h-[72px] bg-gradient-to-r ${gradient} transform -rotate-6 origin-bottom-left`} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className="flex justify-center">
          {icon && React.cloneElement(icon, { className: 'text-6xl' })}
        </div>
        <div className="text-center mt-6">
          <div className="text-xl text-gray-800 font-bold">{title}</div>
          <div className="text-sm text-gray-800 mt-4">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;