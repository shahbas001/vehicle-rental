import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[1001] bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg">
      <nav className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <img
            src="/car.svg"
            className="w-18 h-18 transition-transform duration-300 hover:scale-110"
            alt="Get Car Logo"
          />
          <h1 className="text-3xl ml-4 font-bold italic text-white tracking-wide">
            Get-Car
          </h1>
        </div>
        <div className="hidden text-xl italic font-bold md:flex space-x-6">
          <a
            href="#home"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#services"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
