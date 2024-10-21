import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

const SidebarPrimary: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h2 className="text-xl">My Sidebar</h2>
          <button className="text-2xl" onClick={toggleSidebar}>
            {/* <FaTimes /> */} Bar
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a href="#home" className="block px-4 py-2 hover:bg-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block px-4 py-2 hover:bg-gray-700">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="block px-4 py-2 hover:bg-gray-700">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 text-2xl text-gray-800"
        onClick={toggleSidebar}
      >
        {/* <FaBars /> */} Bar
      </button>
    </div>
  );
};

export default SidebarPrimary;
