import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Layout({ userDetails, token }) {
  useEffect(() => {
    console.log("User details 455", userDetails);
  }, [userDetails]);

  return (
    <motion.div
      className="bg-gray-100 min-h-screen flex flex-col "
      initial={{ x: 40 }}
      animate={{ x: 0 }}
      exit={{ x: -40 }}
    >
      <Navbar userDetails={userDetails} token={token} />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer className="bottom-0" />
    </motion.div>
  );
}
