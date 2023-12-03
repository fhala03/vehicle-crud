import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const SharedLayout = () => {
  return (
    <div className="maincol">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
