import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex justify-between bg-blue-200">
        <div className="flex-1 bg-red-200 m-2 p-4">Column 1</div>
        <div className="flex-1 bg-red-200 m-2 p-4">Column 2</div>
        <div className="flex-1 bg-red-200 m-2 p-4">Column 3</div>
        <div className="flex-1 bg-red-200 m-2 p-4">Column 4</div>
      </div>

      {/* Bottom Section */}
      <div className="flex mt-4">
        <div className="flex-1 h-96 bg-green-200 m-2 p-4">Left Column (Chart Area)</div>
        <div className="w-1/4 bg-yellow-200 m-2 p-4">Right Column (Last transactions area)</div>
      </div>
      <div className="flex mt-4">
        <div className="flex-1 h-96 bg-green-200 m-2 p-4">Left Column (Chart Area)</div>
        <div className="w-1/4 bg-yellow-200 m-2 p-4">Right Column (Last transactions area)</div>
      </div>
    </div>
  );
}