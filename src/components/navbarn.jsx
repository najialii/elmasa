  import logo from "../assets/imgs/masa.svg";
  import { Link, useNavigate } from "react-router-dom";
  import { useState, useEffect, useContext, useRef } from "react";
  import { useAuth } from "../context/authcontext";
  import { CartContext } from "../context/cart";
  import { ShoppingBag, SignIn, List, X, User, Gift , MagnifyingGlass } from "@phosphor-icons/react";
  import Cart from "./cartmodal";
  import axios from "axios";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL
  const Header = () => {
    const { cartItems } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [colorChange, setColorChange] = useState(false);
    const [activeLink, setActiveLink] = useState("/");
      const [data, setData] = useState(null);
    const { user, token } = useAuth();
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
     const effectRan = useRef(false)
    // console.log("hhhhhhhhhhhhhhhhhhhhh",se archResults);
    
    const handleSearch = async (query) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/search/${query}`);
        setSearchResults(response.data.products || []);
        console.log("here are the search results", response.data.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
      
        if (response.status >= 200 && response.status < 300) {
          console.log("Fetched Data:", response.data.data);
          setData(response.data.data);
          console.log("hhhhhhh")
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        // setLoading(false);
      }
    };
    useEffect(() => {
        
      if (!effectRan.current) {
        effectRan.current = true
        if (token) {
          fetchData();
        }
      }
    }, [token]); 
    

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

  const handelsearchRes = ()=>{
    setSearchResults([])
    toggleSearch()
    setSearchQuery("")
  }
  
  const goToProductPage = (product) => {
    console.log('Navigating to product:', product);
    navigate(`/product/${product.id}`, { state: { product } });
 
  };

    
    return (
      <div>
        <div className="flex justify-center items-center  bg-blue-200 text-primary">
<h2 className="text-center flex gap-2 items-center  text-sm text-primary py-2 font-bold">
 توصيل مجاني للطلبات التي تزيد عن 500 جنيه <Gift size={20} />
</h2>
        </div>
        <header
  dir="rtl"
  className={`${
    colorChange ? "bg-white" : "bg-white"
  } flex border-b items-center max-h-[60px] lg:max-h-[80px] font-cairo tracking-wide relative z-50`}
>
  <div className="flex items-center justify-between px-4 lg:px-10 py-3 w-full max-w-screen-xl mx-auto">
    
    {/* Mobile Menu Button */}
    <button
      className="lg:hidden text-primary"
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X size={28} /> : <List size={28} />}
    </button>

    
    <a href="#" className="flex items-center">
      <img src={logo} alt="logo" className="w-24 lg:w-32 h-auto" />
    </a>

    
    <div className="flex items-center gap-4 lg:hidden">
      <button onClick={toggleSearch}>
        <MagnifyingGlass size={24} color="#214C4F" />
      </button>
      <button onClick={toggleCart}>
        <ShoppingBag size={24} color="#214C4F" />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-blue-200 text-white text-xs px-2 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>

    {/* Desktop Menu */}
    <nav className="hidden lg:flex items-center gap-x-8 text-base">
      <Link to="/home" className="hover:text-primary">الرئيسية</Link>
      <Link to="/products" className="hover:text-primary">المنتجات</Link>
      <Link to="/shop" className="hover:text-primary">التسوق</Link>
      <Link to="/recipes" className="hover:text-primary">الوصفات</Link>
      <Link to="/about-us" className="hover:text-primary">من نحن</Link>
    </nav>

    {/* Desktop Icons */}
    <div className="hidden lg:flex items-center gap-4">
      <button onClick={toggleSearch}>
        <MagnifyingGlass size={24} color="#214C4F" />
      </button>
      <button onClick={toggleCart} className="relative">
        <ShoppingBag size={24} color="#214C4F" />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-blue-200 text-white text-xs px-2 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>

    {/* Mobile Menu (Sliding) */}
    <div
      className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 lg:hidden z-50`}
    >
      <button
        className="absolute top-4 left-4 text-primary"
        onClick={toggleMenu}
      >
        <X size={28} />
      </button>
      <nav className="flex flex-col gap-6 p-6 mt-10">
        <Link to="/home" className="hover:text-primary">الرئيسية</Link>
        <Link to="/products" className="hover:text-primary">المنتجات</Link>
        <Link to="/shop" className="hover:text-primary">التسوق</Link>
        <Link to="/recipes" className="hover:text-primary">الوصفات</Link>
        <Link to="/about-us" className="hover:text-primary">من نحن</Link>
      </nav>
    </div>
  </div>
</header>

        {isSearchOpen && (
          <div className="w-full bg-white shadow-md py-4 animate-scaleIn">
            <div className="flex justify-start items-center">
              <form className="flex items-center  w-full lg:w-1/2 max-w-screen-xl px-4">
              <div style={{ display: "flex" ,width: "100%" , alignItems: "center" }}>
      
      <input 
                  type="text"
                  placeholder={` ابحث اسم المنتج...`}
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full  ring-2 focus:ring-primaryLight bg-gray-100 border focus:bg-transparent   px-4 rounded h-10 outline-none text-sm transition-all"
                />
    </div>
                {/* <input
                  type="text"
                  placeholder={`${<MagnifyingGlass size={32} />} Search something...`}
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full  ring-2 focus:ring-primaryLight bg-gray-100 border focus:bg-transparent   px-4 rounded h-10 outline-none text-sm transition-all"
                /> */}
              </form>
            </div>
          </div>
        )}


  {isSearchOpen && (
    <div
      className="absolute top-15 left-0 right-0 lg:w-1/2 w-full bg-white rounded-b-xl shadow-lg z-30 "
      overlayClassName="fixed inset-0 backdrop-blur-sm "
    >
      <button
        onClick={handelsearchRes}
        className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full"
        aria-label="Close search results"
      >
        <X size={20} />
      </button>

      <div className="p-4">
        {searchResults.length > 0 ? (
          <ul className="divide-y flex  flex-col">
            {searchResults.map((result) => (
              <li key={result.id} onClick={() => goToProductPage(result)} className="p-2 border-b bg-white border rounded-md shadow-md">
                 <Link
                // to={`/product/${result.id}`} // Direct Link to product page
                className="flex items-center space-x-4"
              >
                  
                  <img
    src={
      (() => {
        try {
          const parsedImg = JSON.parse(result.img); 
          const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg; 
          return imageUrl.startsWith("http")
            ? imageUrl
            : `${VITE_IMAGE_URL}/${imageUrl}`;
        } catch (error) {
          console.error("Invalid JSON format for images:", result.img);
          return `${VITE_IMAGE_URL}/${imageUrl}`; 
        }
      })()
    }
    alt={result.name}
  className="w-16 object-cover h-16  mb-4"
  />
                  <span className="text-lg font-medium">{result.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl text-gray-500">لا توجد نتائج</p>
        )}
      </div>
    </div>
  )}

              <Cart isOpen={isCartOpen} onClose={toggleCart} />
      </div>
    );
  };




  export default Header;