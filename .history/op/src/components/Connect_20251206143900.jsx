import React from 'react';

const ContactSection = () => {
  return (
    <div className="min-h-screen bg-[#e6e6e6] flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full text-center">
        {/* Main Heading - Dark gray color like in screenshot */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">
          LET'S WORK TOGETHER
        </h1>
        
        {/* Divider line */}
        <div className="w-32 h-[2px] bg-[#333333] mx-auto mb-8"></div>
        
        {/* Subheading - Same dark gray */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
          LET'S COMMENT!
        </h2>
        
        {/* Description - Slightly lighter gray but still dark */}
        <p className="text-xl md:text-2xl text-[#444444] mb-4 max-w-xl mx-auto leading-relaxed">
          FEELING GOOD ABOUT A NEW PROJECT? WRITE ME WHAT'S IN YOUR MIND AND LET'S TALK ABOUT IT!
        </p>
        
        {/* Note: Screenshot mein koi form nahi hai, bas text hai */}
      </div>
    </div>
  );
};

export default ContactSection;