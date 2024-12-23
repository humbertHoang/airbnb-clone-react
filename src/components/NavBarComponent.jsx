import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router'; 

const NavBarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Toggle menu state when clicking hamburger button
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Handle scroll event to add shadow on scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`bg-white px-4 py-2 sticky top-0 z-50 ${hasScrolled ? 'shadow-md' : ''}`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/register"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Đăng ký
            </NavLink>
            <NavLink
              to="/login"
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            >
              Đăng nhập
            </NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 hover:border hover:border-gray-600 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            {/* Mobile Menu */}
            <div
              className={`${isMenuOpen ? 'block' : 'hidden'} absolute right-0 top-12 w-60 bg-white p-4 shadow-lg z-10 border rounded-lg`}
            >
              <NavLink
                to="/login"
                className="block p-2 hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)} // Close menu after click
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className="block p-2 hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)} // Close menu after click
              >
                Đăng ký
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
