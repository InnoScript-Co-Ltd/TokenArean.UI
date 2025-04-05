import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className=" container mx-auto px-2 py-3 md:p-5">
      <div className="flex flex-col min-[400px]:flex-row gap-y-3 md:items-center justify-between min-h-16 px-5 py-3 shadow-md">
        <Link to={"/"} className="flex items-center gap-5">
          <span className="text-lg font-bold">Logo</span>
        </Link>

        <div className="flex items-center gap-5 max-[400px]:w-full h-full">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded h-full max-[400px]:w-full min-w-[180px] lg:min-w-[300px]"
          />
          <a
            href="mailto:thantzinhtet2001@gmail.com"
            className="bg-primary text-white flex justify-center items-center px-5 py-2 hover:opacity-70 rounded h-full text-sm"
          >
            <span className=" hidden md:block">Contact Us</span>
            <FaSearch className=" block md:hidden" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
