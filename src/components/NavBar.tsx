import React from "react";
import { FaList, FaEdit } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-green-900 to-green-600 p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Navigation Buttons */}
        <div className="space-x-10 mt-4 sm:mt-0">
          <Link
            to="/routes"
            className="text-white text-2xl hover:text-light-brown"
          >
            <button>
              <FaList className="text-2xl" />
            </button>
          </Link>
          <Link
            to="/newRoute"
            className="text-white text-2xl hover:text-light-brown"
          >
            <button>
              <FaEdit className="text-2xl" />
            </button>
          </Link>
          <Link
            to="/social"
            className="text-white text-2xl hover:text-light-brown"
          >
            <button>
              <BsPeopleFill className="text-2xl" />
            </button>
          </Link>
        </div>
        {/* CruxTrack Link */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-light-brown hover:underline-none flex items-center"
        >
          <img
            src="/climbing.png"
            alt="Climbing Icon"
            className="w-6 h-6 mr-2"
          />
          CruxTrack
        </Link>
        {/* Utility Buttons */}
        <div className="space-x-10 mt-4 sm:mt-0 ml-10">
          <button className="text-white hover:text-light-brown mr-4">
            <CgDarkMode className="text-2xl" />
          </button>
          <Link
            to="/login"
            className="text-white text-2xl hover:text-light-brown"
          >
            <button>
              <RiLogoutBoxRFill className="text-2xl" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;