import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import {
  IoIosNotifications,
  IoMdArrowDropdown,
  IoMdClose,
  IoMdMenu,
} from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import NotificationPopup from "./NotificationPopup";
import axios from "axios";

export default function Navbar({ token }) {
  const [group, setGroup] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const getTruncatedName = (name) => {
    return name && name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo().then((response) => {
        if (response) {
          setGroup(response.groups || []);
          setUserDetails(response);
        } else {
          setGroup([]);
          setUserDetails({});
        }
      });
    }
  }, [state]);

  useEffect(() => {
    if (userDetails.userid) {
      axios
        .get(`http://localhost:8080/notification/${userDetails.userid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            const unread = response.data.filter(
              (notification) => !notification.isRead
            ).length;
            setUnreadCount(unread);
          }
        })
        .catch((error) =>
          console.error("Error fetching notifications:", error)
        );
    }
  }, [userDetails, token]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-row bg-gradient-to-r from-red-900 to-red-600 h-20 text-black py-4 px-8 shadow-md">
      <div className="flex justify-start items-center">
        <div className="bg-white rounded-3xl">
          <img src={Logo} alt="Logo" className="h-10 w-10 " />
        </div>
        <h1 className="font-bold text-white w-60 px-2 sm:hidden sm-w-0">
          DONOR LOOP
        </h1>
      </div>

      {state.isAuthenticated ? (
        <>
          <div className="flex flex-row w-full justify-between ">
            <div className="flex grow justify-center items-center sm:hidden sm:w-0 ">
              <p
                className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105"
                onClick={() => navigate("/camps")}
              >
                Camps
              </p>
              {group.includes("blood_bank") && (
                <p
                  className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105"
                  onClick={() => navigate("/find-blood")}
                >
                  Find Blood
                </p>
              )}
              <p
                className="text-xs text-white px-2 hover:cursor-pointer hover:scale-105"
                onClick={() => navigate("/request")}
              >
                Requests
              </p>
            </div>

            <div className="flex justify-end items-center px-2 sm:hidden sm:w-0 ">
              <div className="relative mx-2">
                <IoIosNotifications
                  className="text-white cursor-pointer text-2xl"
                  onClick={toggleNotification}
                />
                {unreadCount > 0 && (
                  <span className="absolute  top-0 right-0 block items-center h-3 w-3 bg-gray-600 rounded-full text-white">
                    <p className=" text-[8px]  text-center justify-center">
                      {unreadCount}
                    </p>
                  </span>
                )}
                {notificationOpen && (
                  <NotificationPopup
                    userId={userDetails.userid}
                    token={token}
                    onClose={toggleNotification}
                  />
                )}
              </div>
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
                    {getTruncatedName(userDetails.displayName || "No Name")}{" "}
                    {/* Default to "No Name" if displayName is not available */}
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
            <div className="hidden sm:w-full sm:flex sm:justify-end sm:items-center">
              <IoMdMenu
                className="text-white text-2xl cursor-pointer sm:text-right"
                onClick={toggleSideMenu}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div></div>
          <div className="flex justify-end items-center px-2 gap-4 w-full">
            <button
              className="border-black border text-white font-light px-6 py-2 rounded-full shadow-lg hover:bg-white hover:text-black transition duration-300"
              onClick={() => signIn()}
            >
              Login
            </button>
          </div>
        </>
      )}
      {sideMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSideMenu}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-50 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between  border-b-2">
              <div className="flex flex-row w-full px-2 py-5 justify-between items-center">
                <div className="flex items-center gap-2  ">
                  <div className="bg-white rounded-full h-8 w-8 flex items-center justify-between shadow-lg">
                    <img
                      src={userDetails.picture || Logo} // Default to Logo if picture is not available
                      alt="user"
                      className="h-6 w-6 rounded-full flex-end"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-black font-bold">
                      {getTruncatedName(userDetails.displayName || "No Name")}{" "}
                      {/* Default to "No Name" if displayName is not available */}
                    </p>
                    {group.includes("blood_bank") ? (
                      <p className="text-sm text-black">Blood Bank</p>
                    ) : (
                      <p className="text-sm text-black">Donor</p>
                    )}
                  </div>
                  <div className="relative mx-2 z-50 ">
                    <IoIosNotifications
                      className="text-black ml-4 cursor-pointer text-2xl"
                      onClick={toggleNotification}
                    />
                    {unreadCount > 0 && (
                      <span className="absolute  top-0 right-0 block items-center h-3 w-3 bg-red-600 rounded-full text-red-600 z-50">
                        <p className=" text-[8px]  text-center text-black justify-center">
                          {unreadCount}
                        </p>
                      </span>
                    )}
                    {notificationOpen && (
                      <NotificationPopup
                        userId={userDetails.userid}
                        token={token}
                        onClose={toggleNotification}
                      />
                    )}
                  </div>
                </div>
                <IoMdClose
                  className="flex text-2xlcursor-pointer justify-end "
                  onClick={toggleSideMenu}
                />
              </div>
            </div>

            <div className="mb-4 ">
              <p
                className="text-base p-4 text-black cursor-pointer border-b-2 hover:bg-black hover:text-white transition duration-300"
                onClick={() => navigate("/camps")}
              >
                Camps
              </p>
              {group.includes("blood_bank") && (
                <p
                  className="text-base p-4 text-black cursor-pointer border-b-2 hover:bg-black hover:text-white  transition duration-300"
                  onClick={() => navigate("/find-blood")}
                >
                  Find Blood
                </p>
              )}
              <p
                className="text-base p-4 text-black cursor-pointer border-b-2 hover:bg-black hover:text-white transition duration-300"
                onClick={() => navigate("/request")}
              >
                Requests
              </p>
            </div>

            <button
              className="w-full flex text-left p-4 text-base hover:bg-gray-300  mt-4"
              onClick={() => {
                signOut();
                setSideMenuOpen(false);
              }}
            >
              <IoLogOut className="mr-2 my-auto" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
