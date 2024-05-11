import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { MdHome,MdDirectionsCar,MdOutlineShoppingCart,MdBookmark } from "react-icons/md"
import { CgProfile } from "react-icons/cg";
import { GoGitPullRequest } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";


export function StickyNavbar() {
  const currentUser = auth.currentUser;
  const nav = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const navList = (
  <ul className="p-auto w-full flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
    {currentUser && (
      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/home" className="flex items-center gap-2.5">
            <MdHome />
            Home
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/profile/view" className="flex items-center gap-2.5">
            <CgProfile />
            Profile
          </Link>
        </Typography>
        
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/offerride" className="flex items-center gap-2.5">
            <MdDirectionsCar />
            Offer a Ride
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/myrides" className="flex items-center gap-2.5">
            <MdOutlineShoppingCart />
            My Rides
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/requests" className="flex items-center gap-2.5">
            <GoGitPullRequest />
            Requests
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-2 font-normal text-md text-gray-300 hover:text-white  transition-transform duration-300 hover:scale-105"
        >
          <Link to="/rides" className="flex items-center gap-2.5">
            <MdBookmark />
            Bookings
          </Link>
        </Typography>
      </>
    )}
  </ul>
);

  
  
  return (
    <div className="max-h-[768px]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-custom-green border-none bg-opacity-100">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to="#"
            className="mr-4 cursor-pointer text-lg font-semibold  py-1.5  text-white"
          >
            <Link to="/home" className="flex items-center gap-2.5">
           
            CoRide-Connect
          </Link>
            
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1"></div>
            <IconButton
              variant="text"
              className="ml-auto  h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-white"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex py-3 items-center gap-x-1">
            {user ? (
             <Button variant="text" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
              size="md" onClick={handleLogout}>
             Log Out
           </Button>
         ) : (
           <Button variant="text" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
           size="md" onClick={() => nav("/login")}>
             Log In
           </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
