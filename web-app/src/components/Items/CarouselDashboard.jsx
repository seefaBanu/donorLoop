import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel's default styling

const CarouselDashboard = () => {
  // Define some quotes related to blood donation
  const quotes = [
    "Donate blood, save lives.",
    "Your blood can give someone another chance at life.",
    "Be a hero in someone's life by donating blood.",
    "A small drop of kindness can make a big difference.",
    "Donate blood today, make a difference tomorrow.",
  ];

  return (
    <div className="carousel-container bg-black p-2 mt-3 rounded-xl rounded-xl bg-gradient-to-b from-gray-100 via-gray-300 to-gray-200 bg-opacity-30 backdrop-blur-lg border border-white/30  " >
      <Carousel 
        autoPlay 
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false} // Remove indicators
        interval={3000} // 3 seconds between each quote
        transitionTime={1000} // Transition time in milliseconds (500ms = 0.5s)
      >
        {quotes.map((quote, index) => (
          <div key={index}>
            <p className="text-center my-4 text-base font-light text-gray-700 align-middle">{quote}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselDashboard;
