import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Navbar className=" top-0 "/>
      <div className="flex flex-col flex-1">
        <Outlet/>
      </div>
      <Footer className=" bottom-0 " />
    </div>
  );
}

