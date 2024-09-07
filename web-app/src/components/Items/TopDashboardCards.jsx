import React, { useEffect, useState } from "react";
import { BloodtypeRounded } from "@mui/icons-material";
import Services from "../../services/Services";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const TopDasboardCards = ({ token }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [totalRequests, setTotalRequests] = useState(0);
  const [requestsPerDay, setRequestsPerDay] = useState(0);
  const [mostNeededBloodGroup, setMostNeededBloodGroup] = useState(null); // New state for most needed blood group
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bloodBanks, setBloodBanks] = useState(0);
  const [bloodDonors, setBloodDonors] = useState(0);


  useEffect(() => {
    const getBloodRequests = (token) => {
      setLoading(true);
      Services.getBloodRequests(token)
        .then((response) => {
          const bloodRequests = response.data;
          setRequests(bloodRequests);
          setTotalRequests(bloodRequests.length); // Set total requests
          calculateRequestsPerDay(bloodRequests);
          findMostNeededBloodGroup(bloodRequests);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blood requests:", error);
          setError(error);
          setLoading(false);
        });
    };


    const fetchBloodDonors = async () => {
      try {
        const response2 = await Services.findBloodByBloodDonors(token);
        setBloodDonors(response2.data.length);
        console.log("blooddonors" + response2);
      } catch (error) {
        console.error("Error fetching blood banks:", error);
      }
    };

    const fetchBloodBanks = async () => {
      try {
        const response = await Services.findBloodByBloodBank(token);
        setBloodBanks(response.data.length || 0);
        console.log("bloodbanks" + response);
      } catch (error) {
        console.error("Error fetching blood banks:", error);
      }
    };


    fetchBloodBanks();
    fetchBloodDonors();
    getBloodRequests(token);

  }, [token, totalRequests, bloodBanks, bloodDonors]);


  const calculateRequestsPerDay = (requests) => {
    const counts = requests.reduce((acc, request) => {
      const requestDate = new Date(request.reqDate).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      acc[requestDate] = (acc[requestDate] || 0) + 1;
      return acc;
    }, {});

    const days = Object.keys(counts).length; // Number of unique dates
    const avgRequestsPerDay = totalRequests / (days || 1); // Average requests per day (avoid division by 0)
    setRequestsPerDay(Math.round(avgRequestsPerDay)); // Set requests per day
  };

  const findMostNeededBloodGroup = (requests) => {
    const bloodGroupCounts = requests.reduce((acc, request) => {
      acc[request.bloodNeeded] = (acc[request.bloodNeeded] || 0) + 1;
      return acc;
    }, {});

    const mostNeeded = Object.keys(bloodGroupCounts).reduce((a, b) =>
      bloodGroupCounts[a] > bloodGroupCounts[b] ? a : b
    );

    setMostNeededBloodGroup(mostNeeded); // Set most needed blood group
  };



  return (
    <div className="flex gap-4 mb-8 grid grid-cols-4 ">
      {/* cards */}

      <div
        onClick={() => navigate("/request")}
        className="flex py-4  px-2  rounded-xl bg-gradient-to-b from-gray-800 via-gray-500 to-gray-600 bg-opacity-30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg"
      >
        <div className="flex my-auto mx-2">
          <BloodtypeRounded className="text-gray-100" fontSize="large" />
        </div>
        <div>
          <p className="font-medium text-sm text-white">Blood Requests</p>
          <div className="flex align-middle ">
            <p className="flex text-3xl font-bold text-pink-500">
              {requestsPerDay}
            </p>
            <p className="flex my-auto text-xs text-gray-100 ml-1">/ per day</p>
          </div>
        </div>
      </div>

      {/* Most Needed Blood Group Card */}
      <div className="flex py-4 px-2 rounded-xl bg-gradient-to-b from-gray-800 via-gray-500 to-gray-600 bg-opacity-30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg">
        <div className="my-auto mx-2">
          <BloodtypeRounded className="text-gray-100" fontSize="large" />
        </div>
        <div>
          <p className="font-medium text-sm text-white">On Demand </p>
          <div className="flex align-middle ">
            <p className="flex text-3xl font-bold text-pink-500">
              {mostNeededBloodGroup || 0}
            </p>
            <p className="flex my-auto text-xs text-gray-100 ml-1">
              blood group
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate("/find-blood")}
        className="flex py-4  px-2  rounded-xl bg-gradient-to-b from-gray-800 via-gray-500 to-gray-600 bg-opacity-30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg"
      >
        <div className="flex my-auto mx-2">
          <BloodtypeRounded className="text-gray-100" fontSize="large" />
        </div>
        <div>
          <p className="font-medium text-sm text-white">Blood Banks</p>
          <div className="flex align-middle ">
            <p className="flex text-3xl font-bold text-pink-500">
              {bloodBanks || 0}
            </p>
            <p className="flex my-auto text-xs text-gray-100 ml-1">available</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate("/find-blood")}
        className="flex py-4  px-2  rounded-xl bg-gradient-to-b from-gray-800 via-gray-500 to-gray-600 bg-opacity-30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg"
      >
        <div className="flex my-auto mx-2">
          <BloodtypeRounded className="text-gray-100" fontSize="large" />
        </div>
        <div>
          <p className="font-medium text-sm text-white">Blood Donors</p>
          <div className="flex align-middle ">
            <p className="flex text-3xl font-bold text-pink-500">
              {bloodDonors || 0}
            </p>
            <p className="flex my-auto text-xs text-gray-100 ml-1">available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDasboardCards;
