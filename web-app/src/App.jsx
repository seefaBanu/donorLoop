import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Camp } from "./pages/Camp";
import Profile from "./pages/Profile";
import AddCamp from "./pages/AddCamp";
import Login from "./pages/Login";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import BloodRequests from "./pages/BloodRequests";
import Error from "./pages/Error";


function App() {
  const { state, signIn, signOut, getBasicUserInfo,getAccessToken } = useAuthContext();
  const [userDetails, setUserDetails] = useState({});
  const [userGroup, setUserGroup] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo().then((response) => {
        setUserDetails(response);
        if (response && response.groups) {
          setUserGroup(response.groups || []);
        }
        console.log("User details1", response);
        getAccessToken().then((response) => {
          console.log("Access Token", response);
          setToken(response)
        });
      });
    }
  }, [state, getBasicUserInfo]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {state.isAuthenticated ? (
            <Route element={<Layout userDetails={userDetails} />}>
              <Route
                path="/"
                element={
                  <Profile userDetails={userDetails} userGroup={userGroup} />
                }
              />
              <Route path="/camps" element={<Camp />} />
              <Route path="/request" element={<BloodRequests token = {token} userDetails ={userDetails} />} />
              <Route path="/add-camp" element={<AddCamp />} />
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
