
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Camp } from "./pages/Camp";
import Profile from "./pages/Profile";
import AddCamp from "./pages/AddCamp";
import UpdateCamp from "./pages/UpdateCamp";
import CampMoreDetails from "./pages/CampMoreDetails";
import React, { useState } from "react";

function App() {
    const [camps, setCamps] = useState([
      {
        id: 1,
        title: "Blood Donation Camp: Save Lives Together",
        date: "2024-04-05",
        s_time: "08:30 AM",
        e_time: "02:00 PM",
        location: "Galle Community Center, 456 Park Avenue, Galle, Sri Lanka",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmVnq4p-f8zQt6-fN7gKfSdWyn3oOKVqb33J_FUHUew&s",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone1: "075 123 1234",
        phone2: "076 123 1234",
        reglink: "www.abcd.com",
      },

      {
        id: 2,
        title: "Blood Donation Camp: Save Lives Together",
        date: "2024-04-05",
        s_time: "08:30 AM",
        e_time: "02:00 PM",
        location: "Galle Community Center, 456 Park Avenue, Galle, Sri Lanka",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmVnq4p-f8zQt6-fN7gKfSdWyn3oOKVqb33J_FUHUew&s",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone1: "075 123 1234",
        phone2: "076 123 1234",
        reglink: "www.abcd.com",
      },
      // Add more camps as needed
    ]);
    const addNewCamp = (newCamp) => {
      setCamps([...camps, { ...newCamp, id: camps.length + 1 }]);
  };
  
  const updateCamp = (updatedCamp) => {
    setCamps(
      camps.map((camp) => (camp.id === updatedCamp.id ? updatedCamp : camp))
    );
  };

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* <Route path="/add-camp" element={<AddCamp />} /> */}
            <Route path="/donor-profile" element={<Profile />} />
            {/* <Route path="/camp-more-details" element={<CampMoreDetails />} /> */}
            <Route path="/" element={<Camp camps={camps} />} />
            <Route
              path="/add-camp"
              element={<AddCamp addNewCamp={addNewCamp} />}
            />
            <Route path="/camps" element={<Camp camps={camps} />} />
            <Route
              path="/update-camp/:id"
              element={<UpdateCamp camps={camps} updateCamp={updateCamp} />}
            />

            <Route
              path="/camp-more-details/:id"
              element={<CampMoreDetails camps={camps} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
