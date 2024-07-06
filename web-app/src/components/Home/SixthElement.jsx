import React from "react";
import Slider from "react-slick";
import donorIcon from "../../assets/img3.png";
import bloodBagIcon from "../../assets/bloodpack.jpeg";
import time from "../../assets/img2.png";
import volIcon from "../../assets/img4.png";

const SixthElement = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <Slider {...settings} className="w-full max-w-4xl">
        <div className="text-center">
          <img src={donorIcon} alt="Donor Icon" className="h-24 w-24 mx-auto" />
          <h2 className="text-4xl font-bold text-red-600">100</h2>
          <p className="text-lg">
            100% of Sri Lankan blood donors are voluntary non-remunerated
            donors.
          </p>
        </div>
        <div className="text-center">
          <img
            src={bloodBagIcon}
            alt="Blood Bag Icon"
            className="h-24 w-24 mx-auto"
          />
          <h2 className="text-4xl font-bold text-red-600">14th JUNE</h2>
          <p className="text-lg">World Blood Donor Day.</p>
        </div>
        <div className="text-center">
          <img src={time} alt="Time Icon" className="h-24 w-24 mx-auto" />
          <h2 className="text-4xl font-bold text-red-600">4</h2>
          <p className="text-lg">
            You can donate blood in every 4 months time.
          </p>
        </div>
        <div className="text-center">
          <img src={volIcon} alt="Vol Icon" className="h-24 w-24 mx-auto" />
          <h2 className="text-4xl font-bold text-red-600">3</h2>
          <p className="text-lg">
            Your precious donation of blood can save as many as 3 lives.
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default SixthElement;
