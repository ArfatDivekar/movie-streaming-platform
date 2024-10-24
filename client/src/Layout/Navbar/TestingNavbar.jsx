import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../../Components/assets";
import { FaSearch, FaUser, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const TestingNavbar = () => {
  // const [search, setSearch] = useState("");
  // const navigate = useNavigate();

  // const { userInfo } = useSelector (
  //     (state) => state.userLogin
  // );

  // const { likedMovies } = useSelector (
  //     (state) => state.userGetFavouriteMovies
  // );

  const hover = "hover:text-subMain transition text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  // const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (search.trim()) {
  //         navigate(`/movies/${search}`)
  //         setSearch(search)
  //     } else {
  //         navigate(`/movies`)
  //     }
  // }

  const NavLinks = [
    {name: "Home", link: "/"},
    {name: "Movies", link: "/"},
    {name: "About Us", link: "/"},
    {name: "Contact Us", link: "/"},
    {name: "Others", link: "/"}
  ]

  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* <div className="bg-main top-0 sticky z-20 mb-5">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center"> */}
          {/* LOGO SECTION */}
          {/* <div className="col-span-1">
            <Link to="/">
              <img src={Logo} alt="" className="w-full h-12 object-contain" />
            </Link>
          </div> */}

          {/* SEARCHBAR SECTION */}
          {/* <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button className="bg-subMain w-12 flex-colo h-12 rounded text-white ">
                <FaSearch />
              </button>
              <input
                type="search"
                placeholder="Search Movies here..."
                className="font-medium placeholder:text-border w-11/12 h-12 bg-transparent text-sm border-none px-2 text-black"
              />
            </form>
          </div> */}

          {/* NAVLINKS SECTION  */}
          {/* <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink> */}
            {/* <NavLink 
                        to={ userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login" } 
                        className={Hover}
                    >
                        {
                            userInfo? (
                                <img 
                                    src={userInfo?.image ? userInfo?.image : "/images/user.jpg"} 
                                    alt={userInfo?.fullName} 
                                    className='w-8 h-8 rounded-full object-cover border-subMain' 
                                />
                                ) 
                                : 
                                <FaUser className='w-5 h-5' />
                        }
                    </NavLink> */}
            {/* <NavLink to='/favourite' className={`${Hover} relative`}>
                        <FaHeart className='w-5 h-5' />
                        <div className="w-5 h-5 rounded-full flex-colo text-xs bg-subMain text-white absolute -top-5 -right-1">
                        </div>
                    </NavLink>
          </div>
        </div>
      </div> */}






    {/* NEW NAVBAR RESPONSIVE */}

      {/* //Add  */}
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-main py-4 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
            <span className="mr-1">
              <Link to="/">
                <img src={Logo} alt="" className="w-full h-10 object-cover" />
              </Link>
            </span>
          </div>

          <div 
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden text-white">
            {
                open ? <IoClose/> : <HiMenuAlt1/>
            }
            
          </div>

          {/* SEARCHBAR SECTION */}
            <div className={"xl:w-1/3 md:w-auto mt-[25px] xl:mt-0"}>
                <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                <button className="bg-subMain w-12 flex-colo h-12 rounded text-white ">
                    <FaSearch />
                </button>
                <input
                    type="search"
                    placeholder="Search Movies here..."
                    className="font-medium placeholder:text-border w-11/12 h-12 bg-transparent text-sm border-none px-2 text-black"
                />
                </form>
            </div>

            

            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-main md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${open ? 'top-30 opacity-100' : 'top-[-490]'} opacity-0 md:opacity-100`}>
                {
                    NavLinks.map((link) => (
                        <li key={link.name} className="md:ml-8 text-white font-medium text-base md:my-0 my-7">
                            <a href={link.link}>{link.name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
      </div>
    </div>
  );
};

export default TestingNavbar;
