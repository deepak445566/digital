import React from 'react';

const SimpleBox = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Simple box with p-3 */}
      <div className="bg-white rounded-lg shadow-md p-3">
        <p className="text-gray-800">This is a simple box with p-3 padding</p>
      </div>
    </div>
  );
};

export default SimpleBox;