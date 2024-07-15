import React from "react";
import img1 from "../../assets/img1.png";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";

const SecondElement = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  return (
    < div className=" flex flex-row items-center justify-center p-6 sm:flex-col sm:p-6 ">
      <div className="w-1/2 flex justify-center items-center mb-4 md:mb-0 sm:w-[100%] ">
        <img src={img1} alt="Blood donation" className="w-[500%]" />
      </div> 
      <div className="w-1/2 pl-6 sm:pl-0 sm:w-full  sm:text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4 sm:text-center">
          SAVE LIFE DONATE BLOOD!
        </h1>
        <p className="text-justify text-gray-700 mb-4">
          Welcome to Donor Loop your premier blood donation platform! We're
          dedicated to bridging the gap between donors and blood banks,
          leveraging technology to streamline the process. With real-time
          notifications, donors can respond promptly to urgent requests,
          ensuring a steady supply of blood during critical moments. Stay
          informed about upcoming donation camps, and join us in making a
          lasting impact on lives. Together, let's ensure no one waits for the
          blood they need.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded-3xl hover:bg-black " onClick= {()=> navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SecondElement;