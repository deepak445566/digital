import React, { useState } from 'react';
import TextRoll from '../components/v1/TextRoll';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Web3Forms Access Key - अपना access key यहाँ डालें
  const ACCESS_KEY = "858150d0-8f32-4dbe-9b30-e8cecb8cc170"; // Replace with your actual key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission',
          from_name: 'Digital Express Website',
          botcheck: '' // Empty for bot checking
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
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

          {/* Additional Contact Info */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#333333] mb-4">Other Ways to Connect</h3>
            <div className="space-y-3">
              <p className="text-lg text-[#444444]">📧 Email: info@digitalexpress.com</p>
              <p className="text-lg text-[#444444]">📱 Phone: +91 12345 67890</p>
              <p className="text-lg text-[#444444]">📍 Address: Your Business Address</p>
            </div>
          </div>
        </div>
        
        {/* RIGHT SECTION - Contact Form */}
        <div className="md:w-1/2 bg-white p-12 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">Get in Touch</h3>
          
          {/* Success/Error Messages */}
          {submitStatus && (
            <div className={`mb-4 p-3 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#333333] mb-2">Name</label>
              <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333]"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-[#333333] mb-2">Email</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333]"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-[#333333] mb-2">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#333333] resize-none"
                placeholder="Your message"
              ></textarea>
            </div>
            
            {/* Bot Check Field (hidden) */}
            <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-[#333333] hover:bg-black'} text-white py-3 px-6 rounded font-medium transition flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </>
              ) : 'SEND MESSAGE'}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Your information is safe with us. We never share your details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;