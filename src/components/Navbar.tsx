import React from 'react';

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-64 right-0 bg-white text-black flex items-center justify-center h-14 z-10 shadow-sm">
      <input
        type="text"
        placeholder="Looking for something?"
        className="w-1/2 p-2 rounded bg-gray-200 text-black"
      />
    </div>
  );
};