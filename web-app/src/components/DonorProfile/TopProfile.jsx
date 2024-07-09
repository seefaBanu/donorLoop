import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Bg from "../../assets/signin.png";
import axios from "axios";

const TopProfile = ({ userDetails, token }) => {
  const [group, setGroup] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (userDetails && userDetails.groups) {
      setGroup(userDetails.groups);
    }

    // Fetch user profile
    const fetchProfile = async () => {
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
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const handleUpdateStatus = async (status) => {
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
        setProfile({ ...profile, readyToDonate: status });

      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          {profile ? (
            <div className="flex-col items-center text-center m-auto">
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
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopProfile;
