import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";
export default function Navbar() {
  const [dropdownmenu, setDropdownmenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const menuHandle = () => {
    if (dropdownmenu === false) {
      setDropdownmenu(true);
    } else {
      setDropdownmenu(false);
    }
  };
  return (
    <div className="navbar flex justify-around p-3 items-center">
      <Link to="/" className="text-3xl font-bold">
       Home Rents
      </Link>
      <div className="navbar_search flex items-center ">
        <input
          type="text"
          placeholder="Search..."
          className="px-8 py-2 outline-none border shadow-lg shadow-gray-400 border-gray-400 rounded-full"
        />
        <IoSearchSharp size={24} className="-ml-10" />
      </div>
      <div className="navbar_right flex space-x-4 items-center">
        {user ? (
          <Link to="/create-listing" className="text-xl font-medium">
            Become a host
          </Link>
        ) : (
          <Link to="/login" className="text-xl font-medium">
            Login
          </Link>
        )}
        <button className="navbar_right_account flex items-center rounded-3xl border border-gray-300 p-3 space-x-3">
          <IoIosMenu size={22} onClick={menuHandle} />
          {!user ? (
            <FaRegUser size={22} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace("public","")}`}
              // src=""
              alt="profile image"
              className="rounded-full w-10 text-xs h-10"
            />
          )}
        </button>
        {dropdownmenu && !user && (
          <div className="absolute bg-white flex flex-col right-16 top-20 p-3 border-4">
            <Link to={"/login"} className="hover:text-red-500">
              Log in
            </Link>
            <Link to={"/register"} className="hover:text-red-500">
              Sign Up
            </Link>
          </div>
        )}
        {dropdownmenu && user && (
          <div className="absolute bg-white flex flex-col right-16 top-20 p-3 border-4">
            <Link to={"/"} className="hover:text-red-500">
              Trip List
            </Link>
            <Link to={"/"} className="hover:text-red-500">
              Wish List
            </Link>
            <Link to={"/"} className="hover:text-red-500">
              Property List
            </Link>
            <Link to={"/"} className="hover:text-red-500">
              Reservation List
            </Link>
            <Link to={"/create-listing"} className="hover:text-red-500">
              Become A Host
            </Link>
            <Link
              to={"/login"}
              onClick={() => {
                dispatch(setLogout);
              }}
              className="hover:text-red-500"
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
