import React from 'react';

const SimplePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-lg p-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">My Website</h1>
          <nav className="space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-3">
        <div className="bg-white rounded-xl shadow-md p-3 my-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Our Platform</h2>
          <p className="text-gray-600 mb-3">
            This is a sample page built with React and Tailwind CSS. The p-3 class adds padding 
            of 0.75rem (12px) around elements, creating consistent spacing throughout the design.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                           transition duration-300 p-3">
            Get Started
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3">
          <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature One</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature Two</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature Three</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 p-3">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2024 My Website. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300">Terms of Service</a>
            <a href="#" className="hover:text-blue-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;