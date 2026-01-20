import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { services } from '../components/data/data';

const ServiceDetail = () => {
  const { serviceId, subserviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessLocation: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Refs for animation
  const elementsRef = useRef([]);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  // Find service and subservice
  const service = services.find(s => s.id === parseInt(serviceId));
  const subservice = service?.subservices.find(s => s.id === parseInt(subserviceId));

  // Extract price from string (e.g., "₹10,000/year" to 10000)
  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    
    // Remove currency symbols and text
    const numericString = priceString.replace(/[^\d]/g, '');
    return parseInt(numericString) || 0;
  };

  const servicePrice = extractPrice(subservice?.price);

  // WhatsApp configuration
  const whatsappNumber = "+919667277348";
  const whatsappMessage = `Hello! I'm interested in ${subservice?.name || 'your service'}. Price: ${subservice?.price || 'Not specified'}. Please provide more details.`;

  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowWhatsAppOptions(false);
  };

  const handleWhatsAppWeb = () => {
    window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowWhatsAppOptions(false);
  };

  const handleWhatsAppCopy = () => {
    navigator.clipboard.writeText(whatsappNumber);
    alert('WhatsApp number copied to clipboard!');
    setShowWhatsAppOptions(false);
  };

  // Initialize Razorpay Payment
  const initRazorpayPayment = async () => {
    if (!servicePrice || servicePrice <= 0) {
      alert('Invalid service price');
      return;
    }

    setRazorpayLoading(true);

    try {
      // Create order on backend
      const response = await fetch('https://digital-sdsa.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: servicePrice,
          currency: 'INR'
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const options = {
        key: orderData.razorpayKey || process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Digital CFSE Services",
        description: `Payment for ${subservice?.name}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Payment successful, verify it
          await verifyRazorpayPayment(response);
        },
        prefill: {
          name: formData.businessName || '',
          email: formData.email || '',
          contact: formData.phoneNumber || '',
        },
        theme: {
          color: "#2563eb"
        },
        modal: {
          ondismiss: function () {
            setRazorpayLoading(false);
            alert('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setShowPaymentModal(false);

    } catch (error) {
      console.error('Razorpay initialization error:', error);
      alert(error.message || 'Failed to initialize payment');
      setRazorpayLoading(false);
    }
  };

  // Verify Razorpay Payment
  const verifyRazorpayPayment = async (paymentResponse) => {
    try {
      const response = await fetch('https://digital-sdsa.onrender.com/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment successful! We will contact you shortly.');
        
        // You can also submit the inquiry form automatically
        if (formData.businessName && formData.email && formData.phoneNumber) {
          handleSubmit(new Event('submit'));
        }
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setRazorpayLoading(false);
    }
  };

  if (!service || !subservice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center p-6 w-full max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-colors duration-300 shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Web3Forms API Integration
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '858150d0-8f32-4dbe-9b30-e8cecb8cc170',
          subject: `Inquiry: ${subservice.name}`,
          business_name: formData.businessName,
          business_location: formData.businessLocation,
          phone_number: formData.phoneNumber,
          email: formData.email,
          message: formData.message,
          service: service.name,
          subservice: subservice.name,
          price: subservice.price,
          from_name: formData.businessName,
          reply_to: formData.email
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          businessName: '',
          businessLocation: '',
          phoneNumber: '',
          email: '',
          message: ''
        });
        
        if (!isMobile) {
          gsap.fromTo('.success-message', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-10 pb-12 px-4 sm:px-6">
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Pay Online</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Service:</span>
                  <span className="font-bold">{subservice.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">{subservice.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={initRazorpayPayment}
                disabled={razorpayLoading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                {razorpayLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-5 h-5" />
                    Pay with Razorpay
                  </>
                )}
              </button>
              
              <div className="text-center text-xs text-gray-500">
                Secure payment powered by Razorpay
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header Sticky */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <span className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
            {subservice.name}
          </span>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 lg:pt-4">
        {/* Desktop Back Button - Hidden on mobile */}
        <div className="hidden lg:block mb-6">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-gray-700">Back to Home</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Service Details */}
          <div>
            {/* Service Image & Header */}
            <div className="mb-6 lg:mb-8">
              {/* Price Display Banner */}
              <div className="mb-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                  <span className="text-blue-700 font-bold text-sm mr-2">💰</span>
                  <span className="text-blue-800 font-bold text-lg">{subservice.price}</span>
                  {subservice.price.includes('/month') && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Monthly
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {subservice.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  {subservice.description}
                </p>
              </div>
              
              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Pay Online Button */}
                {servicePrice > 0 && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 px-4 py-3.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>PAY ONLINE</span>
                  </button>
                )}
                
                {/* Call Now Button */}
                <button 
                  onClick={() => {
                    window.location.href = 'tel:+919667277348';
                  }}
                  className="flex-1 px-4 py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>CALL NOW</span>
                </button>
                
                {/* WhatsApp Button with Dropdown */}
                <div className="relative flex-1">
                  <button 
                    onClick={() => setShowWhatsAppOptions(!showWhatsAppOptions)}
                    className="w-full px-4 py-3.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                    </svg>
                    <span>WHATSAPP</span>
                  </button>
                  
                  {/* WhatsApp Options Dropdown for Desktop */}
                  {showWhatsAppOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Choose WhatsApp option</p>
                      </div>
                      <button 
                        onClick={handleWhatsAppDirect}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Open WhatsApp</p>
                          <p className="text-xs text-gray-500">Direct WhatsApp app</p>
                        </div>
                      </button>
                      <button 
                        onClick={handleWhatsAppWeb}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">WhatsApp Web</p>
                          <p className="text-xs text-gray-500">Open in browser</p>
                        </div>
                      </button>
                      <button 
                        onClick={handleWhatsAppCopy}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Copy Number</p>
                          <p className="text-xs text-gray-500">Copy to clipboard</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
            </div>

            {/* Service Description */}
            <div className="mb-6 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Service Overview</h2>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {subservice.description}
              </p>
              
              {/* Price Info Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Package Price</h3>
                    <p className="text-gray-600 text-sm">All inclusive pricing</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">{subservice.price}</div>
                    {subservice.price.includes('/month') ? (
                      <p className="text-xs text-gray-500">Billed monthly</p>
                    ) : (
                      <p className="text-xs text-gray-500">One-time payment</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Online Payment Info Section */}
            {servicePrice > 0 && (
              <div className="mb-6 bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Online Payment Available</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-800">Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-800">Accept all cards, UPI, NetBanking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-800">Instant confirmation</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-4 w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-5 h-5" />
                  Pay Now {subservice.price}
                </button>
              </div>
            )}

            {/* What's Included */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📋</span>
                  What's Included
                </h2>
                <div className="text-sm text-gray-500">
                  {subservice.features?.length || 0} features
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subservice.features?.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800 text-sm sm:text-base">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Why Choose Us</h3>
              </div>
              <ul className="space-y-3">
                {[
                  {text: 'Expert professionals', icon: '👨‍💼'},
                  {text: 'Quick turnaround', icon: '⚡'},
                  {text: 'Competitive pricing', icon: '💰'},
                  {text: '100% satisfaction', icon: '✅'}
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">{item.text}</span>
                    {index === 3 && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Guarantee
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* WhatsApp Quick Message Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Quick WhatsApp Inquiry</h4>
                  <p className="text-gray-600 text-xs mt-1">
                    Click WhatsApp button to send: <br />
                    <span className="font-medium">"Hello! I'm interested in {subservice.name}. Price: {subservice.price}. Please provide more details."</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <div>
            <div 
              ref={formRef}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Get Your Free Quote</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Our expert will contact you within 2 hours
                </p>
                
                {/* Price Badge in Form */}
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                  <span className="text-blue-800 font-bold text-sm mr-2">Service Price:</span>
                  <span className="text-blue-900 font-extrabold text-lg">{subservice.price}</span>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 text-sm sm:text-base">Thank You!</h4>
                      <p className="text-green-700 text-xs sm:text-sm">We'll contact you shortly.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-800 text-sm sm:text-base">Submission Failed</h4>
                      <p className="text-red-700 text-xs sm:text-sm">Please try again.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Service Info Summary */}
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">Selected Service</h3>
                      <p className="text-gray-600 text-xs">{subservice.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700 text-sm">{subservice.price}</p>
                      <p className="text-gray-500 text-xs">Starting price</p>
                    </div>
                  </div>
                </div>

                {/* Form fields with mobile optimization */}
                {[
                  { label: 'Business Name ', name: 'businessName', type: 'text', placeholder: 'Business name', icon: '🏢' },
                  { label: 'Location ', name: 'businessLocation', type: 'text', placeholder: 'City, State', icon: '📍' },
                  { label: 'Phone ', name: 'phoneNumber', type: 'tel', placeholder: 'Phone number', icon: '📱' },
                  { label: 'Email ', name: 'email', type: 'email', placeholder: 'Email address', icon: '✉️' },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 pl-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        {field.icon}
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                        placeholder={field.placeholder}
                      />
                    </div>
                  </div>
                ))}

                {/* Message Textarea */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 pl-1">
                    Additional Details
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400 text-sm">
                      💬
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">Processing...</span>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base">GET FREE QUOTE</span>
                  )}
                </button>

                {/* Privacy Note */}
                <div className="text-center pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <span className="inline-flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Your information is secure
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    By submitting, you agree to our terms
                  </p>
                </div>
              </form>
            </div>

            {/* Mobile Bottom Buttons */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg z-30">
              <div className="max-w-7xl mx-auto flex gap-3">
                {servicePrice > 0 && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 bg-purple-600 py-3 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-bold text-sm text-white">PAY</span>
                  </button>
                )}
                <button 
                  onClick={() => window.location.href = 'tel:+919667277348'}
                  className="flex-1 bg-blue-600 py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-bold text-sm text-white">CALL</span>
                </button>
                <button 
                  onClick={handleWhatsAppDirect}
                  className="flex-1 bg-green-500 py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                  </svg>
                  <span className="font-bold text-sm text-white">WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing for Sticky Elements */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default ServiceDetail;