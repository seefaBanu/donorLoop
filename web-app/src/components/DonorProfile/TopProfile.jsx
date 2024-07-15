import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Bg from "../../assets/donor.jpg";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";

const TopProfile = ({ userDetails, token }) => {
  const [group, setGroup] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleSnackBarClose = () => {
    setState({ ...state, open: false });
  };

  // Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/blood-donor-profile/${userDetails.userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProfile(response.data);
        setStatus(response.data.donationStatus);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Profile not found, show create profile button
        setProfile(null);
      } else {
        console.error("Error fetching profile:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails && userDetails.groups) {
      setGroup(userDetails.groups);
    }

    fetchProfile();
  }, [userDetails, token]);

  const handleCreateProfile = async () => {
    const profileData = {
      bloodDonorUserId: userDetails.userid,
      bloodDonorName: userDetails.givenName,
      bloodGroup: userDetails.bloodgroup,
      mail: userDetails.email,
      tpNumber: userDetails.phoneNumber,
      address: userDetails.address.street_address,
      district: userDetails.district,
      donationStatus: false,
    };
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/blood-donor-profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      setState({ ...state, open: true });
      fetchProfile();
      setLoading(false);
    } catch (error) {
      console.error("Error creating profile:", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/blood-donor-profile/status/${userDetails.userid}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setState({ ...state, open: true });
        setProfile({ ...profile, readyToDonate: status });
        fetchProfile();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setLoading(false);
    }
  };

  return (
    <div className="z-0 grid grid-rows-2 w-full max-w-4xl bg-white rounded-3xl overflow-hidden ">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      {group.includes("blood_bank") ? (
        <>
          <div className="grid grid-cols-2 h-32">
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
                src={
                  userDetails.picture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&s"
                }
                alt="user"
                className="w-full h-full"
              />
            </div>
            <div className="-translate-y-16 items-center align-middle ">
              <p className="text-xl font-bold">{userDetails.givenName}</p>
              <p className="text-gray-600">Blood Donor</p>
            </div>
          </div>
          {profile ? (
            <div className="flex-col items-center text-center m-auto">
              <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleSnackBarClose}
                message="Donation Status Updated"
                key={vertical + horizontal}
              />
              <p className="text-gray-600 mt-2 text-sm text-center">
                Ready to donate
              </p>
              <div className="flex justify-center mt-4 border-2 rounded-3xl">
                <button
                  onClick={() => handleUpdateStatus(true)}
                  className={`
                    ${
                      status === true
                        ? "bg-green-600  text-white shadow-lg"
                        : "text-black"
                    }
                     text-sm text-center py-2 px-4 rounded-full  transition duration-300 hover:cursor-pointer`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleUpdateStatus(false)}
                  className={` ${
                    status === false
                      ? "bg-red-600  text-white shadow-lg"
                      : "text-black"
                  }              text-sm text-center py-2 px-4 rounded-full transition duration-300 hover:cursor-pointer`}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-col items-center  text-center m-auto">
              <p className="text-gray-600 mt-2 text-sm text-center">
                Click here to
              </p>
              <button
                onClick={handleCreateProfile}
                className="bg-green-600 text-white text-sm text-center py-2 px-4 rounded-full shadow-lg  transition duration-300 hover:cursor-pointer"
              >
                Create a Donor Profile
                <Snackbar
                  autoHideDuration={3000}
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={handleSnackBarClose}
                  message="Donor Profile Created"
                  key={vertical + horizontal}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopProfile;
