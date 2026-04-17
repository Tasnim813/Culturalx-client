import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4">
        
        <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        
        <p className="text-gray-700 font-medium">Please wait...</p>

      </div>
    </div>
  );
};

export default Loading;