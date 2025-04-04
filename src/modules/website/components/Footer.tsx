import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-6 mt-10 text-center">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="text-lg font-bold">LOGO</span>
        </div>
        <div className="text-sm">
          <p>
            <strong>Contact Info</strong>
          </p>
          <p>Address: Your address here</p>
          <p>Email: email@mail.com</p>
          <p>Phone: 098877887</p>
        </div>
        <div>
          <p>
            <strong>Follow Us</strong>
          </p>
          <div className="flex space-x-2">
            <a href="#">
              <img src="/icons/facebook.png" alt="FB" className="h-6" />
            </a>
            <a href="#">
              <img src="/icons/linkedin.png" alt="LI" className="h-6" />
            </a>
            <a href="#">
              <img src="/icons/youtube.png" alt="YT" className="h-6" />
            </a>
          </div>
        </div>
      </div>
      <p className="text-xs mt-4">© 2025. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
