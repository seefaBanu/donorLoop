import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout({ userDetails}) {

  useEffect (() => {
    console.log("User details 455", userDetails);
  }, [userDetails]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar userDetails = {userDetails} />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer className="bottom-0 " />
    </div>
  );
}

