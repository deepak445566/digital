import React from 'react';

const Contact = () => {
  const contactInfo = {
    company: "Digital Express India",
    tagline: "Your Digital Transformation Partner",

    branches: [
      {
        id: 1,
        name: "Head Office",
        address: "Flatno-1405 Tower-N Aditya World City, Near Wave City, Ghaziabad, 201002",
        phone: "+91-9667277348",
        email: "support@digitalexpressindia.com",
        mapUrl: "https://www.google.com/maps?q=28.6452584,77.4890598"
      },
      {
        id: 2,
        name: "Noida Branch",
        address: "Digital Express India, Near Sector 62, Noida",
        phone: "+91-9667277348",
        email: "support@digitalexpressindia.com",
        mapUrl: "https://www.google.com/maps/place/Digital+Express+India/@28.4914704,77.3076714,16.83z"
      }
    ]
  };

  const handleAction = (type, value) => {
    switch (type) {
      case "phone":
        window.open(`tel:${value}`);
        break;
      case "whatsapp":
        window.open(`https://wa.me/${value.replace(/\D/g, "")}`, "_blank");
        break;
      case "email":
        window.open(`mailto:${value}`);
        break;
      case "map":
        window.open(value, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">

      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Company Info */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-8 py-3 shadow-lg mb-6">
            <span className="text-2xl font-bold">{contactInfo.company}</span>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {contactInfo.tagline}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactInfo.branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="text-2xl font-bold text-black">{branch.name}</h3>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Address</h4>
                    <p className="text-gray-700">{branch.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  onClick={() => handleAction("phone", branch.phone)}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-green-600">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Phone</h4>
                    <p className="text-black font-bold">{branch.phone}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div
                  onClick={() => handleAction("whatsapp", branch.phone)}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-emerald-600">💬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">WhatsApp</h4>
                    <p className="text-gray-700">Tap to start chatting</p>
                  </div>
                </div>

                {/* Email */}
                <div
                  onClick={() => handleAction("email", branch.email)}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-purple-600">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Email</h4>
                    <p className="text-black font-medium">{branch.email}</p>
                  </div>
                </div>

                {/* Map Button */}
                <button
                  onClick={() => handleAction("map", branch.mapUrl)}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">🗺️</span>
                  View on Google Maps
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Working Hours */}
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">Working Hours</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">📅</span>
                </div>
                <span className="font-medium text-black">Monday - Friday</span>
              </div>
              <span className="font-bold text-black">9:00 AM - 6:00 PM</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-yellow-600">🌤️</span>
                </div>
                <span className="font-medium text-black">Saturday</span>
              </div>
              <span className="font-bold text-black">10:00 AM - 4:00 PM</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600">⛔</span>
                </div>
                <span className="font-medium text-black">Sunday</span>
              </div>
              <span className="font-bold text-red-600">Closed</span>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl px-8 py-6 max-w-3xl">
            <p className="text-xl md:text-2xl text-gray-800 font-medium italic">
              "Empowering businesses with innovative digital solutions that drive growth and success."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— Digital Express India</p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-bold text-black text-lg mb-2">Call Us</h4>
            <p className="text-gray-700 mb-4">Speak directly with our team</p>
            <a href="tel:+919667277348" className="text-blue-600 font-bold hover:text-blue-800">
              +91 96672 77348
            </a>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-bold text-black text-lg mb-2">WhatsApp</h4>
            <p className="text-gray-700 mb-4">Chat instantly with us</p>
            <a 
              href="https://wa.me/919667277348" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 font-bold hover:text-green-800"
            >
              Start Chat
            </a>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✉️</span>
            </div>
            <h4 className="font-bold text-black text-lg mb-2">Email</h4>
            <p className="text-gray-700 mb-4">Send us your queries</p>
            <a href="mailto:support@digitalexpressindia.com" className="text-purple-600 font-bold hover:text-purple-800">
              support@digitalexpressindia.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;