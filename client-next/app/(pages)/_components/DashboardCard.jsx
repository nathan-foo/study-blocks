import Link from 'next/link';
import React from 'react';

const DashboardCard = ({ title, description, href }) => {
    return (
        <div className={`relative bg-white hover:shadow-lg transition-shadow rounded-lg overflow-hidden w-[400px] md:w-[272px] h-[300px]`}>
            <Link href={href} className='w-full h-full block'>
                <div className={`absolute top-0 left-0 w-[110%] h-[80px] md:h-[72px] bg-gradient-to-r from-blue-500 to-purple-500 transform -rotate-6 origin-bottom-left`} />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6">
                    <div className="text-center mt-6">
                        <div className="text-lg text-gray-800 font-bold">{title}</div>
                        <div className="text-sm text-gray-800 mt-6">{description}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DashboardCard;