import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="align-element mb-10 flex-grow">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
