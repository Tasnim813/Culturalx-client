import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6FDF9]">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 border border-[#d1e7dd]">

        <div className="w-14 h-14 border-4 border-[#145A32] border-t-transparent rounded-full animate-spin"></div>

        <p className="text-[#0F3D2E] font-medium">
          Please wait...
        </p>

      </div>
    </div>
  );
};

export default Loading;