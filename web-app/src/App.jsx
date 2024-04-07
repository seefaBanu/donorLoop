import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Camp } from "./pages/Camp";
import Profile from "./pages/Profile";
import AddCamp from "./pages/AddCamp";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/camps" element={<Camp />} />
            <Route path="/add-camp" element={<AddCamp />} />
            <Route path="/donor-profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
