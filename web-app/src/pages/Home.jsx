import React from "react";

import SecondElement from "../components/Home/SecondElement";
import ThirdElement from "../components/Home/ThirdElement";
import FourthElement from "../components/Home/FourthElement";
import FifthElement from "../components/Home/FifthElement";
import SixthElement from "../components/Home/SixthElement";

const Home = () => {
  return (
    <div className="relative flex-col mt-20 overflow-hidden w-full">
      <div className="  w-full">
        <SecondElement />
      </div>
      <div className="  w-full">
        <ThirdElement />
      </div>
      <div className=" w-full">
        <FourthElement />
      </div>
      <div className="  w-full ">
        <FifthElement />
      </div>
      <div className=" w-full text-center">
        <SixthElement />
      </div>
    </div>
  );
};

export default Home;
