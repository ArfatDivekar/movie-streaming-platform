import React from "react";
import { FaList, FaLock } from "react-icons/fa6";
import { BiSolidAddToQueue } from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
import { FaHome, FaUsers, FaHeart } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import Layout from "../../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";
import { logoutAction } from "../../Redux/Actions/userActions";

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector (
      (state) => state.userLogin
  );

  //Logout function
  const logOutHandler = () => {
    dispatch(logoutAction())
    navigate("/login")
    toast.success("Logged out successfully")
  }


  const sideLinks = userInfo?.isAdmin ? (
    [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: FaHome,
      },
      {
        name: "Movie List",
        link: "/movies-list",
        icon: FaList,
      },
      {
        name: "Add Movie",
        link: "/add-movie",
        icon: BiSolidAddToQueue,
      },
      {
        name: "Categories",
        link: "/categories",
        icon: HiViewGridAdd,
      },
      {
        name: "Users",
        link: "/users",
        icon: FaUsers,
      },
      {
        name: "Update Profile",
        link: "/profile",
        icon: RiSettings3Fill,
      },
      // {
      //   name: "Favourites",
      //   link: "/favourites",
      //   icon: FaHeart,
      // },
      {
        name: "Change Password",
        link: "/password",
        icon: FaLock,
      },
    ]
  ) : userInfo ? (
    [
      {
        name: "Update Profile",
        link: "/profile",
        icon: RiSettings3Fill,
      },
      // {
      //   name: "Favourites",
      //   link: "/favourites",
      //   icon: FaHeart,
      // },
      {
        name: "Change Password",
        link: "/password",
        icon: FaLock,
      },
    ]
  ) : (
    []
  )

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded-md font-medium text-sm transitions flex gap-3 items-center p-4";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 rounded-md p-6 xl:mb-0 mb-5">
            {
              // SideLinks
              sideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
            <button onClick={logOutHandler} className={`${inActive} ${hover} w-full`}>
              <TbLogout2 className="w-[1.3em] h-[1.3em]"/> <p>Logout</p>
            </button>
          </div>

          <div 
            data-aos= "fade-up"
            data-aos-duration= "1000"
            data-aos-delay= "10"
            data-aos-offset= "200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Sidebar;
