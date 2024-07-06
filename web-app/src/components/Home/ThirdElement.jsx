import React from "react";
import background from "../../assets/background.jpg";

const ThirdElement = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-cente sm:h-1/2 sm:p-6 "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-8">OUR IMPACT</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 sm:p-6 ">
          <div>
            <h2 className="text-2xl font-bold sm:text-base">1000+ BLOOD DONORS</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-base">90+ BLOOD BANKS</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-base">90+ CAMPS REGISTERED</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdElement;
