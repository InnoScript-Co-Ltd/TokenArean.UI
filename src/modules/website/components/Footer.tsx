import React from "react";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-10 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 container mx-auto text-left px-5 pt-5">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <img
            src="/assets/images/logo.jpg"
            className=" w-16 h-16 rounded-full"
            alt=""
          />
          <p className=" text-lg font-semibold ">LoRi Gaming Store</p>
        </Link>

        {/* Contact Info */}
        <div className=" flex flex-col gap-3">
          <p className="font-semibold">Contact Info</p>
          <div className=" flex flex-col">
            <p>Email: Lorigamingstore@gmail.com</p>
            <p>Phone: 09777741993</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className=" flex flex-col gap-3">
          <p className="font-semibold">Contact Us</p>
          <div className="flex gap-5">
            <a href="https://www.facebook.com/profile.php?id=61552719172292">
              <FaFacebook className=" text-3xl" />
            </a>
            <a href="https://t.me/LoriAdmin">
              <FaTelegram className=" text-3xl" />
            </a>
          </div>
        </div>
      </div>
      <div className=" border-t flex justify-center items-center mt-4 p-2">
        <p className="text-xs">
          © {new Date().getFullYear()} Innoscript.co.ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
