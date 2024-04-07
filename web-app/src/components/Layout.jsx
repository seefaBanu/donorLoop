import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="bg-gray">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}