import React, { useState } from "react";

const Flashcard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`m-2 w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[300px] lg:h-[400px] px-8 py-4 border rounded-lg flex items-center justify-center text-center text-sm md:text-lg lg:text-xl hover:shadow-md transition-shadow ${isFlipped ? 'bg-white' : 'bg-blue-600 text-white'}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
        <div className={`${isFlipped ? 'hidden' : ''}`}>
          {frontContent}
        </div>
        <div className={`${isFlipped ? '' : 'hidden'}`}>
          {backContent}
        </div>
    </div>
  );
};

export default Flashcard;