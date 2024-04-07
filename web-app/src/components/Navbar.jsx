import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-red-900 to-red-600 h-20 flex items-center justify-between  text-black py-4 px-8">
      <div className="flex bg-black">
        logo
      </div>
      <div className="flex items-center bg-yellow-100">
        middle
      </div>
      <div className="flex  bg-yellow-600">
        right
      </div>
    </div>
  );
}
