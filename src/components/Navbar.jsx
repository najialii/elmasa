import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Basket, SignIn, List, User } from "@phosphor-icons/react";
import Cart from "./cartmodal";
import { CartContext } from "../context/cart";
import logo from "../assets/imgs/elmasa.svg";
import { useAuth } from "../context/authcontext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { user, token } = useAuth();

  useEffect(() => {
    const changeNavColor = () => {
      setColorChange(window.scrollY === 0);
    };

    window.addEventListener("scroll", changeNavColor);

    return () => {
      window.removeEventListener("scroll", changeNavColor);
    };
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`${
          colorChange ? "bg-white" : "bg-primary"
        } text-black fixed top-0 z-50 w-full shadow-md duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <List size={28} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Elmasa Logo"
              className="lg:w-40 lg:h-auto w-24 h-auto"
            />
          </Link>

          {/* Navbar Links */}
          <ul className="hidden md:flex items-center space-x-8 ml-auto">
            {["Home", "Products", "Shop", "Recipes", "About Us"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className={`${
                    activeLink === `/${item.toLowerCase().replace(/ /g, "-")}`
                      ? "text-secondaryLight"
                      : "hover:text-secondaryDark"
                  } text-lg transition-colors`}
                  onClick={() => setActiveLink(`/${item.toLowerCase()}`)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search something..."
            className="hidden xl:block xl:w-80 bg-gray-100 border px-4 rounded h-10 outline-none text-sm transition-all ml-6"
          />

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to={token ? "/dashboard/uprofile" : "/login"}>
              {token ? (
                <div className="flex items-center space-x-2">
                  <User size={28} color="#ADEB76" />
                  <span className="text-lg font-medium">
                    Welcome, {user?.name}
                  </span>
                </div>
              ) : (
                <SignIn size={28} color="#ADEB76" />
              )}
            </Link>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={toggleCart}
                className="flex items-center text-white"
              >
                <Basket size={28} color="#ADEB76" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-primaryLight text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-primary text-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center p-6">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col items-center space-y-6 mt-4">
          {["Home", "Products", "Shop", "Recipes", "About Us"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-2xl transition-colors hover:text-secondaryDark"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            </li>
          ))}
          {token && (
            <li>
              <Link
                to="/dashboard/uprofile"
                className="text-2xl transition-colors hover:text-secondaryDark"
                onClick={toggleMenu}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Navbar;
