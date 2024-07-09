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

function App() {
  const { state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [userDetails, setUserDetails] = useState({});
  const [userGroup, setUserGroup] = useState([]);
  const [token, setToken] = useState("");
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      // Fetch user details
      getBasicUserInfo().then((response) => {
        setUserDetails(response);
        console.log("jjjj"+userDetails)
        setUserGroup(response.groups || []);
        // Fetch access token
        getAccessToken().then((token) => {
          setToken(token);
          sessionStorage.setItem("accessToken", token);

          // Fetch camps data using the token
          axios
            .get("http://localhost:8080/camps", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setCamps(response.data);
            })
            .catch((error) => {
              console.error("Error fetching camps:", error);
            });
        });
      });
    }
  }, [state, getBasicUserInfo, getAccessToken]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {state.isAuthenticated ? (
            <Route element={<Layout userDetails={userDetails} />}>
              <Route
                path="/"
                element={
                  <Profile userDetails={userDetails} userGroup={userGroup} token={token} />
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
                element={
                  <Notification  token={token} userId={userDetails.userid}/>
                }
              />
              
              {userGroup.includes("blood_bank") && (
                <>
                  <Route path="/add-camp" element={<AddCamp token={token} userDetails={userDetails}/>} />
                  <Route
                    path="/update-camp/:id"
                    element={<UpdateCamp camps={camps} token={token} />}
                  />
                  <Route path="/find-blood" element={<FindBlood token = {token} />} />
                </>
              )}
              <Route
                path="/camps"
                element={<Camp camps={camps} group={userGroup} />}
              />
              <Route
                path="/camp-more-details/:id"
                element={<CampMoreDetails camps={camps} token={token} groups={userGroup}/>}
              />
            </Route>
          ) : (
            <Route>
              <Route element={<Layout userDetails={userDetails} />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/*" element={<Error />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
