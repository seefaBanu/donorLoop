import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Items/Layout";
import Camp from "./pages/Camp/Camp";
import Profile from "./pages/Profile/Profile";
import AddCamp from "./pages/Camp/AddCamp";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "@asgardeo/auth-react";
import BloodRequests from "./pages/BloodRequests";
import Error from "./pages/Auth/Error";
import FindBlood from "./pages/FindBlood";
import CampMoreDetails from "./pages/Camp/CampMoreDetails";
import axios from "axios"; // Import axios for API calls
import UpdateCamp from "./pages/Camp/UpdateCamp";
import Notification from "./pages/Notification";
import AllCamps from "./pages/Camp/AllCamps";
import { useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AnimatedRouter()  {

  const location = useLocation();
  const { state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [userDetails, setUserDetails] = useState({});
  const [userGroup, setUserGroup] = useState([]);
  const [token, setToken] = useState("");
  const [camps, setCamps] = useState([]);
  const [fetchCamp, setFetchCamp] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCamps = (token) => {
    setLoading(true);
    axios
      .get("http://localhost:8080/camps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCamps(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching camps:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      // Fetch user details
      getBasicUserInfo().then((response) => {
        setUserDetails(response);
        console.log("jjjj" + userDetails);
        setUserGroup(response.groups || []);
        // Fetch access token
        getAccessToken().then((token) => {
          setToken(token);
          sessionStorage.setItem("accessToken", token);
        });
        handelCampFetch();
      });
    }
  }, [state, getBasicUserInfo, getAccessToken]);

  const handelCampFetch = () => {
    setFetchCamp(!fetchCamp);
    console.log("fetching camps" + fetchCamp);
    if (fetchCamp) {
      fetchCamps(token);
      setFetchCamp(!fetchCamp);
    }
  };

  return (
    <Routes location={location} key={location.pathname}>
      {state.isAuthenticated ? (
        <Route element={<Layout userDetails={userDetails} token={token} />}>
          <Route
            path="/"
            element={
              <Profile
                userDetails={userDetails}
                userGroup={userGroup}
                token={token}
              />
            }
          />
          <Route
            path="/request"
            element={
              <BloodRequests
                token={token}
                userDetails={userDetails}
                groups={userGroup}
              />
            }
          />
          <Route
            path="/notification"
            element={<Notification token={token} userId={userDetails.userid} />}
          />

          {userGroup.includes("blood_bank") && (
            <>
              <Route
                path="/add-camp"
                element={<AddCamp token={token} userDetails={userDetails} />}
              />
              <Route
                path="/update-camp/:id"
                element={<UpdateCamp camps={camps} token={token} />}
              />
              <Route path="/find-blood" element={<FindBlood token={token} userDetails={userDetails} />} />
            </>
          )}
          <Route
            path="/camps"
            element={
              <Camp
                camps={camps}
                group={userGroup}
                fetchCamp={handelCampFetch}
                loading={loading}
                userDetails={userDetails}
              />
            }
          />
          <Route
            path="/all-camps"
            element={
              <AllCamps
                camps={camps}
                group={userGroup}
                fetchCamp={handelCampFetch}
                loading={loading}
              />
            }
          />

          <Route
            path="/camp-more-details/:id"
            element={
              <CampMoreDetails camps={camps} token={token} groups={userGroup} userDetails={userDetails}/>
            }
          />
        </Route>
      ) : (
        <Route>
          <Route element={<Layout userDetails={userDetails} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Login />} />
          <Route path="/*" element={<Error />} />
        </Route>
      )}
    </Routes>
  );
};

export default AnimatedRouter;
