import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../Components/assets";

const Footer = () => {
  const Links = [
    {
      title: "Ninjaxx",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "Connect with us",
      links: [
        {
          name: "Facebook",
          link: "https://www.facebook.com/",
        },
        {
          name: "Twitter",
          link: "https://twitter.com",
        },
        {
          name: "Github",
          link: "https://github.com/",
        },
        {
          name: "Linkedin",
          link: "https://in.linkedin.com/",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        // {
        //   name: 'My Favourites',
        //   link: '/favourite'
        // },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Change Password",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 px-8">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((link, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={link.link}
                      target={link.link.startsWith("http") ? "_blank" : ""}
                      className="text-slate-400 inline-block w-full hover:text-subMain transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pb-3.5 sm:col-span-0 md:col-span-2 lg:col-span-3 ">
            <Link to="/">
              <img
                src={Logo}
                alt="logo"
                className="w-2/4 h-12 object-contain"
              />
            </Link>
            <p className="leading-7 text-sm mt-3 text-slate-400 ">
              <span>
                Gowalkot Road
                <br /> Chiplun
              </span>
              <br />
              <span>Tel: 8856900914</span>
              <br />
              <span>Email: arfatdivekar21@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
