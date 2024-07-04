import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Bg from "../../assets/signin.png";

const TopProfile = ({ userDetails }) => {
  const [group, setGroup] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userDetails && userDetails.groups) {
      setGroup(userDetails.groups);
    }
  }, [userDetails]);

  return (
    <div className="z-0 grid grid-rows-2 w-full max-w-4xl bg-white rounded-3xl overflow-hidden ">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      {group.includes("users") ? (
        <>
          <div className="grid grid-cols-2 h-20">
            <div className="flex-col items-center align-middle text-center m-auto">
              <div className=" items-center align-middle ">
                <p className="text-xl font-bold">{userDetails.givenName}</p>
                <p className="text-gray-600">{userDetails.district}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 ">
          <div className="flex-col items-center align-middle text-center m-auto">
            <div className="-translate-y-1/2 w-40 h-40 rounded-full bg-gray-800 border-4 border-white overflow-hidden">
              <img
                src={userDetails.picture}
                alt="user"
                className="w-full h-full"
              />
            </div>
            <div className="-translate-y-16 items-center align-middle ">
              <p className="text-xl font-bold">{userDetails.givenName}</p>
              <p className="text-gray-600">Blood Donor</p>
            </div>
          </div>
          <div className="flex-col items-center  text-center m-auto">
            <button className="bg-red-600 text-white  text-center py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300">
              Ready to Donate
            </button>
            <p className="text-gray-600 mt-2 text-sm text-center">
              Status: Available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProfile;
