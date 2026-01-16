import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#e6e6e6] flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* LEFT SECTION - Text Content */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">
            LET'S WORK TOGETHER
          </h1>
          
          <div className="w-24 h-[2px] bg-[#333333] mb-8"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
            LET'S COMMENT!
          </h2>
          
          <p className="text-xl md:text-2xl text-[#444444] mb-4 leading-relaxed">
            FEELING GOOD ABOUT A NEW PROJECT? WRITE ME WHAT'S IN YOUR MIND AND LET'S TALK ABOUT IT!
          </p>
        </div>
        
        {/* RIGHT SECTION - Empty/Spacer (screenshot mein kuch nahi hai) */}
        <div className="md:w-1/2">
          {/* Screenshot mein right side empty hai, aap yahan form ya image add kar sakte hain */}
        </div>

      </div>
    </div>
  );
};

export default Contact;