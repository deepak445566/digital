import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          LET'S WORK TOGETHER
        </h1>
        
        {/* Subheading */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
          LET'S COMMENT!
        </h2>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-black mb-4 max-w-xl mx-auto">
          FEELING GOOD ABOUT A NEW PROJECT? WRITE ME WHAT'S IN YOUR MIND AND LET'S TALK ABOUT IT!
        </p>
      </div>
    </div>
  );
};

export default Contact;