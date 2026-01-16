import React from 'react';

const Contact = () => {
  const contactInfo = {
    company: "Digital Express India",
    tagline: "Your Digital Transformation Partner",

    branches: [
      {
        id: 1,
        name: "Branch 1 (Head Office)",
        address: "Flatno-1405 Tower-N Aditya World City, Near Wave City, Ghaziabad, 201002",
        phone: "+91-9667277348",
        email: "support@digitalexpressindia.com",
        mapUrl: "https://www.google.com/maps?q=28.6452584,77.4890598"
      },
      {
        id: 2,
        name: "Branch 2 (Noida Branch)",
        address: "Digital Express India, Near Sector 62, Noida",
        phone: "+91-9667277348",
        email: "support@digitalexpressindia.com",
        mapUrl:
          "https://www.google.com/maps/place/Digital+Express+India/@28.4914704,77.3076714,16.83z"
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF2D8] via-[#A7C5FF] to-[#7CA6FF] relative overflow-hidden">

      {/* Banner */}
      <div
        className="w-full h-[280px] md:h-[360px] lg:h-[420px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1500&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
            Contact Digital Express India
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-3 font-medium">
            We are here to help you grow digitally
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Company Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-white/40 backdrop-blur-md rounded-xl px-6 py-3 border border-white/60 shadow-xl mb-4">
            <span className="text-gray-900 font-bold text-lg">
              {contactInfo.company}
            </span>
          </div>
          <p className="text-gray-700 text-xl font-medium">
            {contactInfo.tagline}
          </p>
        </div>

        {/* Branches - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {contactInfo.branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                {branch.name}
              </h3>

              <div className="space-y-6">

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-500/30 rounded-2xl flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">Address</p>
                    <p className="text-gray-700 mt-1">{branch.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  onClick={() => handleAction("phone", branch.phone)}
                  className="flex items-start space-x-4 cursor-pointer hover:scale-[1.03] transition"
                >
                  <div className="w-12 h-12 bg-green-500/30 rounded-2xl flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">Call</p>
                    <p className="text-gray-800 text-xl font-bold">{branch.phone}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div
                  onClick={() => handleAction("whatsapp", branch.phone)}
                  className="flex items-start space-x-4 cursor-pointer hover:scale-[1.03] transition"
                >
                  <div className="w-12 h-12 bg-emerald-500/30 rounded-2xl flex items-center justify-center">
                    💬
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">WhatsApp</p>
                    <p className="text-gray-700">Click to chat</p>
                  </div>
                </div>

                {/* Email */}
                <div
                  onClick={() => handleAction("email", branch.email)}
                  className="flex items-start space-x-4 cursor-pointer hover:scale-[1.03] transition"
                >
                  <div className="w-12 h-12 bg-purple-500/30 rounded-2xl flex items-center justify-center">
                    ✉️
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">Email</p>
                    <p className="text-gray-800 font-bold">{branch.email}</p>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <button
                onClick={() => handleAction("map", branch.mapUrl)}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition shadow-lg"
              >
                🗺️ View on Google Map
              </button>
            </div>
          ))}

        </div>

        {/* Office Hours - Bottom */}
        <div className="mt-16 mx-auto max-w-xl bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-lg">
          <h4 className="text-xl font-black text-gray-900 mb-4 text-center">Office Hours</h4>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Monday - Friday:</span>
              <span className="text-gray-900 font-bold">9:00 AM - 6:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Saturday:</span>
              <span className="text-gray-900 font-bold">10:00 AM - 4:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Sunday:</span>
              <span className="text-red-600 font-bold">Closed</span>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-14">
          <p className="inline-block bg-white/40 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/60 text-gray-600 text-lg font-medium italic">
            "Transforming businesses through innovative digital solutions"
          </p>
        </div>
      </div>

      {/* Floating Lights */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>

      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
};

export default Contact;