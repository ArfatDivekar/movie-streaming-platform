import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { SidebarContext } from "../../Context/DrawerContext";

const MobileFooter = () => {
  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
  const active = "bg-white text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;

  return (
    <>
      <div className="flex flex-col justify-between align-middle w-full h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow">
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="2xl:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>

          <NavLink to="/favourites" className={Hover}>
            <FaHeart />
          </NavLink>

          <NavLink to="/login" className={Hover}>
            <FiUserCheck />
          </NavLink>

          <button onClick={toggleDrawer} className={inActive}>
            <HiMenuAlt1 />
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
