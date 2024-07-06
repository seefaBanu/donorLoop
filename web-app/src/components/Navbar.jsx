import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { IoIosNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [group, setGroup] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Helper function to truncate name if it's longer than 10 characters
  const getTruncatedName = (name) => {
    return name && name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo().then((response) => {
        if (response) {
          setGroup(response.groups || []); // Ensure groups is an array
          setUserDetails(response);
        } else {
          setGroup([]);
          setUserDetails({});
        }
      });
    }
  }, [state]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 bg-gradient-to-r from-red-900 to-red-600 h-20 text-black py-4 px-8 shadow-md">
      <div className="flex justify-start items-center">
        <div className="bg-white rounded-3xl">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
        </div>
        <h1 className="font-bold text-white px-2">DONOR LOOP</h1>
      </div>

      {state.isAuthenticated ? (
        <>
          <div className="flex grow justify-center items-center">
            <p className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105" onClick = {() => navigate("/camps")} >Camps</p>
            {group.includes("blood_bank") && (
              <p className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105" onClick={()=> navigate("/find-blood")}>Find Blood</p>
            )}
            <p className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105" onClick = {() => navigate("/request")}>Requests</p>
          </div>

          <div className="flex justify-end items-center px-2">
            <IoIosNotifications className="text-white mx-2" />
            <div className="flex bg-white rounded-full h-12 items-center justify-between px-2 relative">
              <div className="bg-white rounded-full mx-2 h-8 w-8 flex items-center justify-center shadow-lg">
                <img
                  src={userDetails.picture || Logo} // Default to Logo if picture is not available
                  alt="user"
                  className="h-6 w-6 rounded-full"
                />
              </div>
              <div className="w-24">
                <p className="text-sm text-black font-bold">
                  {getTruncatedName(userDetails.displayName || "No Name")} {/* Default to "No Name" if displayName is not available */}
                </p>
                {group.includes("blood_bank") ? (
                  <p className="text-xs text-black">Blood Bank</p>
                ) : (
                  <p className="text-xs text-black">Donor</p>
                )}
              </div>
              <IoMdArrowDropdown
                className="cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-12 bg-white border rounded shadow-lg w-32">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div></div>
          <div className="flex justify-end items-center px-2 gap-2">
            <button
              className="border-black border text-white font-light px-6 py-2 rounded-full shadow-lg hover:bg-white hover:text-black transition duration-300"
              onClick={() => signIn()}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
