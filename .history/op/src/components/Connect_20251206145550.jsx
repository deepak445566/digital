import React from 'react';
import TextRoll from './v1/TextRoll';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center  py-8">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">
        
        {/* LEFT SECTION - Text Content */}
        <div className="md:w-1/2 exo">
          <h1 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 tracking-tight">
            LET'S WORK TOGETHER
          </h1>
          
          <div className="w-24 h-[2px] bg-[#333333] mb-8"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
          <TextRoll>LET'S COMMENT!</TextRoll>  
          </h2>
          
          <p className="text-xl md:text-2xl text-[#444444] leading-relaxed">
            FEELING GOOD ABOUT A NEW PROJECT? WRITE ME WHAT'S IN YOUR MIND AND LET'S TALK ABOUT IT!
          </p>
        </div>
        
        {/* RIGHT SECTION - Contact Form */}
        <div className="md:w-1/2 bg-white p-12 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Get in Touch</h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-[#333333] mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333]"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-[#333333] mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333]"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label className="block text-[#333333] mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333] resize-none"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#333333] text-white py-3 px-6 rounded font-medium hover:bg-black transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;