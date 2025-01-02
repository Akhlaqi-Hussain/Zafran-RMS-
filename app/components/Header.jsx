"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"; // Import cart icon
import { usePathname } from "next/navigation"; // Use usePathname for current route detection
import Link from "next/link";

const Header = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Reservations", path: "/reservations" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;

      // Check if the click is outside the menu or on a link
      if (
        isMenuOpen &&
        !target.closest("#mobile-menu-2") &&
        !target.closest("button[aria-controls='mobile-menu-2']")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-30 bg-white-500 transition-all">
      <nav className="bg-gray-900 bg-opacity-75 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            href="/"
            className="text-white self-center text-xl lg:text-3xl font-bold whitespace-nowrap"
          >
            Zafran
          </Link>
          <div className="flex items-center lg:order-2">
            {/* Cart Icon */}
            <Link href="/cart" className="text-white mr-4">
              <FaShoppingCart
                className={`w-6 h-6 ${
                  pathname === "/cart"
                    ? "text-orange-500 font-bold"
                    : "hover:text-orange-500"
                }`}
              />
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white inline-flex items-center p-2 ml-1 text-sm lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col my-3 md:space-x-8 lg:flex-row lg:my-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`w-full py-2 md:py-0 cursor-pointer animation-hover inline-block relative text-lg ${
                      pathname === link.path
                        ? "text-orange-500 font-bold animation-active"
                        : "text-white hover:text-orange-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
