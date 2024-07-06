import React from "react";
import Logo from "../assets/logo.png";
import Bg from "../assets/signin.png";
import { FaPeopleArrows } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { AuthProvider } from "@asgardeo/auth-react";
import { useAuthContext } from "@asgardeo/auth-react";

export const Login = () => {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div
      className="min-h-screen bg-cover bg-center p-20 flex items-center justify-end"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="rounded-3xl w-[50%] max-w-md p-4">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" className="h-20 w-20 mb-4" />
          <h1 className="text-m font-semi-bold mb-6">Login</h1>

          <div className="bg-gray-100 p-6 rounded-xl w-full text-center">
            <h2 className="text-m  mb-8">Select User</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <div className="flex border rounded-full p-5 border-b-gray-300">
                  <FaPeopleArrows className="w-10 h-10 text-gray-400" />
                </div>
                <button className="flex my-2 text-black text-sm font-light hover:text-red-700  hover:scale-110 transition duration-300">
                  Blood Donor
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex border rounded-full p-5 border-b-gray-300">
                  <FaHospital className="w-10 h-10 text-gray-400" />
                </div>
                <button
                  className="flex my-2 text-black text-sm font-light hover:text-red-700  hover:scale-110 transition duration-300"
                  onClick={() => signIn()}
                >
                  Blood Bank
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs my-2 font-light hover:scale-110 transition duration-300">
            Back to home
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
