import React from "react";

const Header: React.FC = () => {
  return (
    <header className=" container mx-auto p-5">
      <div className="flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center space-x-2">
          {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
          <span className="text-lg font-bold">Logo</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
