import logo from "../assets/imgs/masa.svg";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/authcontext";
import { CartContext } from "../context/cart";
import { ShoppingBag, SignIn, List, X, User, MagnifyingGlass } from "@phosphor-icons/react";
import Cart from "./cartmodal";
import axios from "axios";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { user, token } = useAuth();
  // console.log("user data:", user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log("hhhhhhhhhhhhhhhhhhhhh",searchResults);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/${query}`);
      setSearchResults(response.data.products || []);
      console.log("here are the search results", response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      handleSearch(query);
    } else {
      setSearchResults([]);
      console.log("search results", searchResults);
    }
  };


 

  
  return (
    <div>
      <header
      dir="rtl"
        className={`${
          colorChange ? "bg-white" : "bg-white"
        } flex border-b  min-h-[70px] font-cairo tracking-wide relative z-50`}
      >
        <div className="flex flex-wrap items-center justify-between sm:px-10 px-4 py-3 gap-4 w-full max-w-screen-xl mx-auto">
          <a href="javascript:void(0)" className="max-sm:hidden">
            <img src={logo} alt="logo" className="w-32 h-20" />
          </a>
          <div className="lg:hidden flex justify-start items-center gap-2"> 

          <button
            className="lg:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            >
            {isMenuOpen ? <X size={28} /> : <List size={28} color="#214C4F" />}
          </button>

          <a href="javascript:void(0)" className="hidden max-sm:block">
            <img src={logo} alt="logo" className="w-24 h-24 " />
          </a>
              </div>

          <div
            id="collapseMenu"
            className={`max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li>
  <Link
    to="/home"
    className={`${
      activeLink === '/home' ? 'text-primaryLight' : 'hover:text-primary'
    } text-lg transition-colors`}
    onClick={() => setActiveLink('/home')}
  >
    الرئيسية
  </Link>
</li>
<li>
  <Link
    to="/products"
    className={`${
      activeLink === '/products' ? 'text-primaryLight' : 'hover:text-primary'
    } text-lg transition-colors`}
    onClick={() => setActiveLink('/products')}
  >
    المنتجات
  </Link>
</li>
<li>
  <Link
    to="/shop"
    className={`${
      activeLink === '/shop' ? 'text-primaryLight' : 'hover:text-primary'
    } text-lg transition-colors`}
    onClick={() => setActiveLink('/shop')}
  >
    التسوق
  </Link>
</li>
<li>
  <Link
    to="/recipes"
    className={`${
      activeLink === '/recipes' ? 'text-primaryLight' : 'hover:text-primary'
    } text-lg transition-colors`}
    onClick={() => setActiveLink('/recipes')}
  >
    الوصفات
  </Link>
</li>
<li>
  <Link
    to="/about-us"
    className={`${
      activeLink === '/about-us' ? 'text-primaryLight' : 'hover:text-primary'
    } text-lg transition-colors`}
    onClick={() => setActiveLink('/about-us')}
  >
    من نحن
  </Link>
</li>

            </ul>
          </div>

          <div dir="rtl" className="flex items-center justify-end    ">

          <Link to={'./dashboard/uprofile'}>
              <button className="text-white font-bold gap-1  lg:block p-2 rounded-xl">
                {token ? (
                  <div className="flex items-center bg-gradient-to-b from-blue-300 to-white  p-2 rounded-md space-x-2">
                    {/* <span className="text-lg font-medium text-gray-400">مرحباً {user?.name}</span> */}
                    <User size={24} color="#214C4F" />
                  </div>
                ) : (
                  <Link to="/login">
                    <span className='flex items-center bg-gradient-to-b from-blue-300 to-white  p-2 rounded-md space-x-2'>
                      <SignIn size={26} color="#214C4F" weight="fill" />
                    </span>
                  </Link>
                )}
              </button>
            </Link>
 
            <span className="relative">
              <button onClick={toggleSearch} className=" lg:block bg-gradient-to-b from-blue-300 to-white mx-2  text-white px-2 py-2 rounded-md ">
                <MagnifyingGlass color="#214C4F" weight="bold" size={24} />
              </button>
            </span>

            

            <button onClick={toggleCart} className="flex gap-2 py-2 items-center justify-center bg-gradient-to-b from-blue-300 to-white w-16 rounded-md ">
              {cartItems.length > 0 && (
                  <span className="    left-auto -ml-1 top-0 rounded-full bg-primary-600 px-1 py-0 text-xl text-secondary">
                {cartItems.length}
              </span>)}
              <ShoppingBag weight="fill" size={24} color="#214C4F" />
              
            </button>

           
           
            <div
        className={`fixed inset-0 bg-white h-full z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <button
          className="absolute top-4  right-4"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <nav className="flex flex-col bg-white text-2xl text-primary items-center justify-start mt-8 py-8 h-full w-full space-y-4">
  <Link
    to="/home"
    className=" w-full text-center py-2 border-b  border-white/20 hover:bg-primary-light transition"
    onClick={toggleMenu}
  >
    الرئيسية
  </Link>
  <Link
    to="/products"
    className=" w-full text-center py-2 border-b border-white/20 hover:bg-primary-light transition"
    onClick={toggleMenu}
  >
    المنتجات
  </Link>
  <Link
    to="/shop"
    className=" w-full text-center py-2 border-b border-white/20 hover:bg-primary-light transition"
    onClick={toggleMenu}
  >
    التسوق
  </Link>
  <Link
    to="/recipes"
    className="w-full text-center py-2 border-b border-white/20 hover:bg-primary-light transition"
    onClick={toggleMenu}
  >
    الوصفات
  </Link>
  <Link
    to="/about-us"
    className=" w-full text-center py-2 hover:bg-primary-light transition"
    onClick={toggleMenu}
  >
    من نحن
  </Link>
</nav>

      </div>

          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="w-full bg-white shadow-md py-4">
          <div className="flex justify-center items-center">
            <form className="flex items-center w-full max-w-screen-xl px-4">
              <input
                type="text"
                placeholder="Search something..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border focus:bg-transparent px-4 rounded h-10 outline-none text-sm transition-all"
              />
            </form>
          </div>
        </div>
      )}


      {isSearchOpen && searchResults.length > 0 && (
          <div 
          overlayClassName="fixed inset-0  backdrop-blur-sm"
          className="absolute top-16 left-0 right-0 bg-white shadow-lg w-96 mt-20 z-30">
    <ul className="divide-y flex flex-col">
  {searchResults.map((result) => (
    <li key={result.id} className="p-4 border-b">
      <Link to={`/product/${result.id}`} onClick={() => setSearchResults([])} className="flex items-center space-x-4">
        <img
          src={(() => {
            try {

              const parsedImg = JSON.parse(result.img);
              const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;

              return imageUrl.startsWith("http")
                ? imageUrl
                : `http://localhost:8000/storage/${imageUrl}`;
            } catch (error) {

              console.error("Invalid JSON format for image:", result.img);
              return "http://localhost:8000/storage/default-image.jpg";
            }
          })()}
          alt={result.name}
          className="object-cover w-16 h-18 sm:h-56 lg:h-16 rounded-md mb-4"
        />
        <span className="text-lg font-medium">{result.name}</span>
      </Link>
    </li>
  ))}
</ul>



        </div>
      )}
            <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
};

export default Header;