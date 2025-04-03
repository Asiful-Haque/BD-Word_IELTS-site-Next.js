import React from "react";

// #2E6F40
// #CFFFDC
// #68BA7F
// #253D2C
// #17252A
// #2B7A78
// #3AAFA9

const Header = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-[#253D2C] shadow-md">
        <h1 className="text-4xl font-bold text-lime-500">
          Oinia<span className="text-white">IELTS</span>
        </h1>
        <ul className="hidden md:flex space-x-6 text-white text-xl">
          <li className="hover:text-yellow-500 cursor-pointer">Home</li>
          <li className="hover:text-yellow-500 cursor-pointer">Languages</li>
          <li className="hover:text-yellow-500 cursor-pointer">Services</li>
          <li className="hover:text-yellow-500 cursor-pointer">Events</li>
          <li className="hover:text-yellow-500 cursor-pointer">Contact Us</li>
        </ul>
        <button className="text-white font-bold border border-gray-500 px-6 py-2 rounded-md">
          Login
        </button>
      </nav>
    </div>
  );
};

export default Header;
