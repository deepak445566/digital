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
  const [isTouching, setIsTouching] = useState(false);
  
  // Refs for animation
  const elementsRef = useRef([]);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  // Check mobile viewport with better detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Add/remove mobile class to body
      if (mobile) {
        document.body.classList.add('mobile-view');
      } else {
        document.body.classList.remove('mobile-view');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Prevent zoom on input focus in iOS
    const preventZoom = (e) => {
      if (isMobile && e.target.tagName === 'INPUT') {
        e.target.style.fontSize = '16px';
      }
    };
    
    document.addEventListener('touchstart', preventZoom);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('touchstart', preventZoom);
      document.body.classList.remove('mobile-view');
    };
  }, [isMobile]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        
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

  // Extract price from string
  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    
    const numericString = priceString.replace(/[^\d]/g, '');
    return parseInt(numericString) || 0;
  };

  const servicePrice = extractPrice(subservice?.price);

  // WhatsApp configuration
  const whatsappNumber = "+919667277348";
  const whatsappMessage = `Hello! I'm interested in ${subservice?.name || 'your service'}. Price: ${subservice?.price || 'Not specified'}. Please provide more details.`;

  // Handle touch events for mobile
  const handleTouchStart = () => setIsTouching(true);
  const handleTouchEnd = () => setTimeout(() => setIsTouching(false), 150);

  // WhatsApp handlers
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
          await verifyRazorpayPayment(response);
        },
        prefill: {
          name: formData.businessName || '',
          email: formData.email || '',
          contact: formData.phoneNumber || '',
        },
        theme: {
          color: "#1a365d"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 safe-area-top safe-area-bottom">
        <div className="text-center p-8 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Service Not Found</h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={() => navigate('/')}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:from-black hover:to-gray-900 active:from-black active:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] active:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900 pt-16 lg:pt-6 px-4 sm:px-6 safe-area-top safe-area-bottom">
      {/* Payment Modal - Mobile Optimized */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 safe-area-top safe-area-bottom">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Secure Payment</h3>
                <p className="text-gray-600 text-sm mt-1">Complete your purchase</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors active:scale-95"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Service</p>
                    <p className="font-bold text-gray-900 text-base sm:text-lg">{subservice.name}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Total Amount</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-700">{subservice.price}</p>
                    <p className="text-gray-500 text-xs">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={initRazorpayPayment}
                disabled={razorpayLoading}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:from-blue-700 active:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] active:shadow-lg"
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
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base">Proceed to Payment</span>
                  </>
                )}
              </button>
              
              <div className="text-center pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure payment powered by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header Sticky - Improved */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-lg z-40 border-b border-gray-200 shadow-md py-3 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="p-2.5 rounded-xl bg-gray-50 active:bg-gray-200 active:scale-95 transition-all duration-200"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 truncate max-w-[180px] text-center px-2">
            {subservice.name}
          </span>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 lg:pt-6">
        {/* Desktop Back Button */}
        <div className="hidden lg:block mb-8">
          <button 
            onClick={() => navigate('/')}
            className="group inline-flex items-center px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2 text-gray-600 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">Back to Home</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Service Details */}
          <div>
            {/* Service Header - Mobile Optimized */}
            <div className="mb-6 lg:mb-10">
              {/* Premium Price Badge - Mobile Responsive */}
              <div className="mb-5">
                <div className="inline-flex items-center px-4 py-3 w-full justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <div className="text-xs opacity-90">Starting from</div>
                      <div className="text-xl font-bold">{subservice.price}</div>
                    </div>
                  </div>
                  {subservice.price.includes('/month') && (
                    <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold whitespace-nowrap">
                      Monthly Plan
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug tracking-tight">
                  {subservice.name}
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  {subservice.description}
                </p>
              </div>
              
              {/* Premium Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {servicePrice > 0 && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="group flex-1 px-4 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl active:from-purple-700 active:to-pink-700 transition-all duration-200 shadow-lg active:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm">Pay Online</span>
                  </button>
                )}
                
                <button 
                  onClick={() => window.location.href = 'tel:+919667277348'}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group flex-1 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl active:from-blue-700 active:to-indigo-700 transition-all duration-200 shadow-lg active:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">Call Expert</span>
                </button>
                
                <div className="relative flex-1">
                  <button 
                    onClick={() => setShowWhatsAppOptions(!showWhatsAppOptions)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="group w-full px-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl active:from-green-600 active:to-emerald-700 transition-all duration-200 shadow-lg active:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 group-active:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </button>
                  
                  {showWhatsAppOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeIn">
                      <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                        <p className="text-sm font-semibold text-gray-800">Connect with us</p>
                        <p className="text-xs text-gray-600 mt-1">Choose your preferred method</p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        <button 
                          onClick={handleWhatsAppDirect}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-green-50/50 active:bg-green-100 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">Direct Message</p>
                            <p className="text-xs text-gray-500 truncate">Open WhatsApp app</p>
                          </div>
                        </button>
                        <button 
                          onClick={handleWhatsAppWeb}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50/50 active:bg-blue-100 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">WhatsApp Web</p>
                            <p className="text-xs text-gray-500 truncate">Open in browser</p>
                          </div>
                        </button>
                        <button 
                          onClick={handleWhatsAppCopy}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">Copy Number</p>
                            <p className="text-xs text-gray-500 truncate">Save to clipboard</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Service Overview Card - Mobile Optimized */}
            <div className="mb-6 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-start mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 sm:mr-4 shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Service Overview</h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
                    Professional service with comprehensive solutions
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
                  {subservice.description}
                </p>
              </div>
              
              {/* Premium Price Display */}
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-xl truncate">Investment</h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">All-inclusive package</p>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {subservice.price}
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {subservice.price.includes('/month') ? 'Monthly • Cancel anytime' : 'One-time payment'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Payment Features - Mobile Optimized */}
            {servicePrice > 0 && (
              <div className="mb-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-5 sm:p-8 border border-purple-100 shadow-lg">
                <div className="flex items-start mb-5">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3 sm:mr-4 shadow-md flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Secure Online Payment</h3>
                    <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 truncate">Fast, secure & convenient</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  <div className="bg-white/70 p-3 rounded-xl border border-purple-100">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-800 text-xs sm:text-sm text-center">256-bit SSL</p>
                    <p className="text-gray-600 text-xs text-center">Bank-level security</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl border border-purple-100">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-800 text-xs sm:text-sm text-center">Instant</p>
                    <p className="text-gray-600 text-xs text-center">Real-time confirmation</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl border border-purple-100 col-span-2 sm:col-span-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-800 text-xs sm:text-sm text-center">Multi-method</p>
                    <p className="text-gray-600 text-xs text-center">Cards, UPI, NetBanking</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="w-full px-4 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl active:from-purple-700 active:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:shadow-md active:scale-[0.98]"
                >
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-5 h-5" />
                  <span className="text-sm">Pay Now - {subservice.price}</span>
                </button>
              </div>
            )}

            {/* Premium Features Grid - Mobile Optimized */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">What's Included</h2>
                </div>
                <div className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                  {subservice.features?.length || 0} features
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subservice.features?.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200 active:border-emerald-300 active:shadow-lg transition-all duration-300 active:-translate-y-1"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0 group-active:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-800 text-sm sm:text-base truncate">{feature}</span>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                          <span className="text-emerald-600 text-xs font-medium">Included</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Benefits Card - Mobile Optimized */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-5 sm:p-8 border border-blue-100 shadow-lg">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-3 sm:mr-4 shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Premium Benefits</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {text: 'Certified Professionals', icon: '👨‍🎓', desc: 'Industry experts'},
                  {text: 'Fast Delivery', icon: '⚡', desc: 'Quick turnaround'},
                  {text: 'Competitive Pricing', icon: '💰', desc: 'Best value'},
                  {text: '100% Satisfaction', icon: '✅', desc: 'Money-back'}
                ].map((item, index) => (
                  <div key={index} className="bg-white/70 p-3 rounded-xl border border-blue-100">
                    <div className="flex items-center mb-1">
                      <span className="text-xl mr-2">{item.icon}</span>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm truncate">{item.text}</span>
                      {index === 3 && (
                        <span className="ml-1 px-1 py-0.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full">
                          Guarantee
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs truncate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Premium WhatsApp Card - Mobile Optimized */}
            <div className="mt-6 bg-gradient-to-r from-green-50/70 to-emerald-50/70 rounded-2xl p-5 border border-green-100 shadow-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-base">Instant WhatsApp Support</h4>
                  <p className="text-gray-700 text-xs mt-1 leading-relaxed">
                    Click WhatsApp button to send a pre-filled message: 
                    <br />
                    <span className="font-semibold text-emerald-700 text-xs">"Hello! I'm interested in {subservice.name}. Price: {subservice.price}. Please provide more details."</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-emerald-700 text-xs font-medium">Response time: 5 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Inquiry Form - Mobile Optimized */}
          <div>
            <div 
              ref={formRef}
              className="bg-gradient-to-b from-white via-white to-gray-50/30 rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 backdrop-blur-sm"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">Request Free Consultation</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Contact within <span className="font-semibold text-blue-600">2 hours</span>
                </p>
                
                {/* Premium Price Badge */}
                <div className="mt-4 sm:mt-6 inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-white text-xs">₹</span>
                  </div>
                  <div>
                    <div className="text-xs text-blue-800 font-medium">Package Price</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-900">{subservice.price}</div>
                  </div>
                </div>
              </div>

              {/* Premium Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-5 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-emerald-900 text-sm sm:text-lg truncate">Request Sent Successfully!</h4>
                      <p className="text-emerald-800 text-xs sm:text-sm mt-0.5">We'll contact you shortly.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-5 p-4 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-rose-900 text-sm sm:text-lg truncate">Submission Failed</h4>
                      <p className="text-rose-800 text-xs sm:text-sm mt-0.5">Please try again.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Summary Card */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">Selected Service</h3>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">{subservice.name}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-lg sm:text-xl font-bold text-blue-700">{subservice.price}</p>
                      <p className="text-gray-500 text-xs">Professional</p>
                    </div>
                  </div>
                </div>

                {/* Premium Form Fields - Mobile Optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Business Name', name: 'businessName', type: 'text', placeholder: 'Enter business name', icon: '🏢' },
                    { label: 'Location', name: 'businessLocation', type: 'text', placeholder: 'City, State', icon: '📍' },
                    { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: '+91 9876543210', icon: '📱' },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@company.com', icon: '✉️' },
                  ].map((field, index) => (
                    <div key={index} className="relative">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 pl-1">
                        {field.label} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg">
                          {field.icon}
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 sm:pl-12 pr-3 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 shadow-sm"
                          placeholder={field.placeholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Textarea - Mobile Optimized */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 pl-1">
                    Additional Requirements <span className="text-blue-600 text-xs font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400 text-base sm:text-lg">
                      💬
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 sm:pl-12 pr-3 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 shadow-sm resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Premium Submit Button - Mobile Optimized */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group w-full py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl active:from-black active:to-gray-900 transition-all duration-300 shadow-xl active:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">Processing Your Request...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-sm sm:text-base">GET FREE CONSULTATION</span>
                    </div>
                  )}
                </button>

                {/* Premium Privacy Assurance */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">100% secure information</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    By submitting, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>

            {/* Premium Mobile Bottom Buttons - Optimized */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 shadow-2xl z-30 backdrop-blur-md bg-white/10 safe-area-bottom">
              <div className="max-w-7xl mx-auto flex gap-2">
                {servicePrice > 0 && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm py-3 rounded-xl flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-bold text-xs">PAY</span>
                  </button>
                )}
                <button 
                  onClick={() => window.location.href = 'tel:+919667277348'}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-bold text-xs">CALL</span>
                </button>
                <button 
                  onClick={handleWhatsAppDirect}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                  </svg>
                  <span className="font-bold text-xs">CHAT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="lg:hidden h-20 safe-area-bottom"></div>
    </div>
  );
};

export default ServiceDetail;