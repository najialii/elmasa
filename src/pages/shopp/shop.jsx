import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slideshow from "../../components/slideShow";
import LikeButton from "../../components/like";
import { WhatsappLogo,ArrowRight,ArrowLeft } from "@phosphor-icons/react";
import Header from "./shopheader";
import ban from "../../assets/imgs/ban3.jpg";
import Offers from "./offers";
import { motion } from "framer-motion";
import CategoryProducts from "../../components/catproduct";
import masa from '../../assets/imgs/miokmilk.png'
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Shop() {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
    const [currentpage, setCurrentPage] = useState(2);
    const [loading, setLoading] = useState(true);  
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); 
  };
  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories?page=${currentpage}`
        );
        const data = response.data;
        setLoading(false);
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    console.log("clicked", category);
    navigate(`/category/${category.id}`);
  };

  const handelNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handelprevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

//   if (loading) return <div className=" h-screen w-screen flex justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
//   viewBox="0 0 24 24">
//   <path
//     d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
//     data-original="#000000" />
// </svg>;</div>

  return (
    <div className="bg-white" >
      {/* <div className="max-w-screen mt-2 relative overflow-hidden px-4 lg:px-9">
  <img
    className="w-full h-[40vh] sm:h-[60vh] lg:h-[70vh] rounded-t-xl lg:mt-6 object-cover clip-arch sm:clip-arch-md lg:clip-arch-lg"
    src={ban}
    alt="Banner"
  />
</div>

<style>
  {`
    @layer utilities {
      .clip-arch {
        clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%);
      }
      @media (min-width: 640px) {
        .clip-arch-md {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 95%, 0 80%);
        }
      }
      @media (min-width: 1024px) {
        .clip-arch-lg {
          clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 90%, 0 75%);
        }
      }
    }
  `}
</style> */}
 
 
<div className="bg-gray-100  relative">
{/* 
  <button 
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
  <ArrowLeft onClick={handelprevPage} size={20} color="#fff" />
  </button>
  
  <button onClick={handelNextPage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
  <ArrowRight size={20} color="#fff" />
  </button> */}

  <div className="absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-b from-gray-100 via-transparent to-white opacity-50 pointer-events-none"></div>
  
  <div className="flex justify-center items-start  ">
  </div>

  <div className="flex w-screen justify-center">
  <motion.div
  className="flex gap-4 overflow-x-auto no-scrollbar"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
>
  {categories?.data?.data && categories.data.data.length > 0 ? (
    categories.data.data.map((category) => (
      <motion.div
        onClick={() => handleCategoryClick(category)}
        key={category.id}
        className="flex-shrink-0 flex flex-col my-4 justify-center overflow-hidden items-center lg:gap-2 cursor-grab w-28 h-28 bg-transparent group transition-transform duration-300 hover:scale-105 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="rounded-xl p-2 bg-white lg:w-40 w-32 h-32 lg:h-40  flex flex-col items-center">
          <img
            src={masa} 
            className="w-24 sm:w-28 md:w-32 lg:w-36"
            alt={category.name}
          />
          <h3 className="text-gray-900 text-sm sm:text-base md:text-lg text-center mt-2">
            {category.name}
          </h3>
        </div>
      </motion.div>
    ))
  ) : (
    <p className="text-center text-gray-500 w-full">No categories available</p>
  )}
</motion.div>

  </div>
</div>
{/* 


      <div className=" pt-[12px] ">
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
        <Offers />
        </motion.div>
      </div> */}



      <div className="  ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
  
         <CategoryProducts />
        </motion.div>
      </div>
      

    </div>
  );
}

export default Shop;
