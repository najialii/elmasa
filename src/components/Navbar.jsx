import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Basket, SignIn, List,User } from "@phosphor-icons/react";
import Cart from "./cartmodal"; 
import { CartContext } from "../context/cart";
import logo from '../assets/imgs/masa.svg';
import { useAuth } from "../context/authcontext";
const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [colorChange, setColorChange] = useState(false);
  const [activeLink, setActiveLink] = useState("/")
  // const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("token",token))
const {user, token} = useAuth();


  useEffect(() => {
    const changeNavColor = () => {
      if (window.scrollY === 0) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
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
      <nav
        className={`${
          colorChange ? "bg-white text-gray-800" : "bg-white text-gray-800"
        } shadow-md transition-colors duration-300 h-fit sticky top-0 min-h-[70px]   w-full`}
      >
        <div className="w-full mx-auto sticky top-0 flex items-center justify-between px-6">
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <List size={28} color="#027384" />
          </button>

          <div className="flex-1 flex justify-start items-center sm:ml-10 space-x-2">
            <img src={logo} alt="logo" className="lg:w-[200px] lg:h-[100px] w-20 h-full" />
          </div>

          <ul className="hidden md:flex space-x-8 ml-auto text-lg pr-10">
          <li><Link to="/"  className={`${
                  activeLink === '/' ? 'text-primary' : 'hover:text-primary'
                } text-lg transition-colors`
                }
                onClick={() => setActiveLink('/')}>Home</Link></li>

            <li><Link to="/products"  className={`${
                  activeLink === '/products' ? 'text-primary' : 'hover:text-primary'
                } text-lg transition-colors`
                }
                onClick={() => setActiveLink('/products')}>Products</Link></li>
            <li>
              <Link to="/shop"  className={`${
                  activeLink === '/shop' ? 'text-primary' : 'hover:text-primary'
                } text-lg transition-colors`}
                onClick={() => setActiveLink('/shop')}
                >
              Shop</Link></li>
            <Link
                to="/shop"
                className={`${
                  activeLink === '/recipes' ? 'text-primary' : 'hover:text-primary'
                } text-lg transition-colors`}
                onClick={() => setActiveLink('/recipes')}
              >
                Recipes
              </Link>
            <li>
              <Link to="/about-us"  className={`${
                  activeLink === '/about-us' ? 'text-primary' : 'hover:text-primary'
                } text-lg transition-colors` 
                }
                onClick={() => setActiveLink('/about-us')}
                >About Us</Link></li>
          </ul>

          {/* Cart and User Buttons */}
          <div className="flex items-center">
            <button className="bg-white text-primary font-bold gap-1 hidden lg:block p-2 rounded-xl">
           
            {token ? (
  <div className="flex items-center space-x-2">
    <User size={28} color="#027384" />
    <span className="text-lg font-medium text-gray-800">Welcome back {user?.name}</span>
  </div>
) :   <SignIn size={30} color="#027384" weight="fill" />}
  
            </button>
           
            <div className="relative inline-block">
              <button
                className="gap-1 px-4 font-bold text-primary rounded focus:outline-none flex items-center"
                onClick={toggleCart}
              >
                <Basket size={28} color="#027384" />
                <h3>Cart</h3>
              </button>

              {cartItems.length === 0 ? <></> : (
                <span className="absolute bottom-4 right-0 z-30 left-6 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
                
              )}
              
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-primary text-gray-800 z-50 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out flex flex-col`}
      >
        <div className="flex justify-between p-6">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex-grow  flex flex-col justify-start font-bold text-white items-center w-full space-y-6">
          {['Home', 'Products', 'Shop', 'Recipes', 'About Us'].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-2xl py-4 block transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Navbar;
