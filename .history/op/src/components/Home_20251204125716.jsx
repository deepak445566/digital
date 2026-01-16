import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-red">
      {/* Simple box with p-3 */}
      <div className="bg-white rounded-lg shadow-md ">
        <p className="text-gray-800">This is a simple box with p-3 padding</p>
      </div>
    </div>
  );
};

export default Home;