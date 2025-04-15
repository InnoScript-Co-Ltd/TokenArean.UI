import React from "react";
import { FaFacebook, FaTelegram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-10 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 container mx-auto text-left px-5 pt-5">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
          <span className="text-lg font-bold">LOGO</span>
        </div>

        {/* Contact Info */}
        <div className="text-sm">
          <p className="font-semibold mb-1">Contact Info</p>
          <p>Address: Your address here</p>
          <p>Email: email@mail.com</p>
          <p>Phone: 098877887</p>
        </div>

        {/* Social Icons */}
        <div>
          <p className="font-semibold mb-1">Contact Us</p>
          <div className="flex mt-4 gap-5">
            <a href="#">
              <FaFacebook className=" text-3xl" />
            </a>
            <a href="#">
              <FaTelegram className=" text-3xl" />
            </a>
          </div>
        </div>
      </div>
      <div className=" border-t flex justify-center items-center mt-4 p-2">
        <p className="text-xs">© 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
