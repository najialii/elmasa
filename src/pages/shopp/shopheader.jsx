import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from "@phosphor-icons/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
    <section class='py-2 bg-[#007bff] text-white text-right px-10'>
        <p class='text-sm'><strong class="mx-3">Address:</strong>SWF New York 185669<strong class="mx-3">Contact
          No:</strong>1800333665</p>
      </section>
    <header className="border-b font-cairo border-blue-300 bg-white  font-sans tracking-wide relative z-50">
      <section className="flex flex-wrap items-center gap-4 relative py-3 px-10 min-h-[75px] bg-white">
        {/* Logo */}
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-[170px]"
          />
        </a>
      
          

        {/* Desktop Menu */}
        <ul className="flex space-x-8 lg:absolute lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 max-lg:hidden">
          <li>
            <Link to="powdermilk" className="hover:text-blue-500 font-bold text-blue-400 text-[15px]">
              Powder Milk
            </Link>
          </li>
          <li>
            <Link to="peanutbutter" className="hover:text-blue-500 font-bold text-blue-400 text-[15px]">
              Peanut Butter
            </Link>
          </li>
          <li>
            <Link to="oil" className="hover:text-blue-500 font-bold text-blue-400 text-[15px]">
              Oil
            </Link>
          </li>
        </ul>

        {/* Order Button and Cart Icon */}
        <div className="lg:absolute lg:right-10 flex items-center ml-auto">
          <button className="px-4 py-2 text-[15px] rounded font-bold text-blue-400 hover:text-blue-500 border-2 border-blue-300 bg-transparent">
            Order food
          </button>
          <div className="inline-block border-blue-300 border-l-2 ml-4 pl-4 cursor-pointer">
          <ShoppingBag size={28} /> 
          </div>
        </div>
      </section>

      {/* Mobile Menu Toggle */}
      <div className={`flex flex-wrap items-start gap-4 px-10 py-4 relative ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div id="collapseMenu" className="w-full max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button>

          {/* Collapse Menu Items */}
          <ul className="lg:flex lg:justify-center gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="javascript:void(0)">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </a>
            </li>
            <li className="max-lg:border-b border-blue-200 max-lg:py-3">
              <Link to="powdermilk" className="hover:text-blue-500 font-bold text-blue-400 text-[15px] block">
                Powder Milk
              </Link>
            </li>
            <li className="max-lg:border-b border-blue-200 max-lg:py-3">
              <Link to="peanutbutter" className="hover:text-blue-500 font-bold text-blue-400 text-[15px] block">
                Peanut Butter
              </Link>
            </li>
            <li className="max-lg:border-b border-blue-200 max-lg:py-3">
              <Link to="oil" className="hover:text-blue-500 font-bold text-blue-400 text-[15px] block">
                Oil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
            </>
  );
};

export default Header;































