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
function Shop() {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); 
  };
  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/categories"
        );
        const data = await response.json();
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
 
 
<div className="bg-white mt-6 relative">

  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
  <ArrowLeft size={20} color="#fff" />
  </button>
  
  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
  <ArrowRight size={20} color="#fff" />
  </button>

  <div className="absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-l from-gray-100 via-transparent to-white opacity-50 pointer-events-none"></div>
  
  <div className="flex justify-center items-start">
  </div>

  <div className="flex justify-center">
    <motion.div
      className="grid grid-cols-8 gap-2 overflow-x-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {categories?.data?.data && categories.data.data.length > 0 ? (
        categories.data.data.map((category) => (
          <motion.div
            onClick={() => handleCategoryClick(category)}
            key={category.id}
            className="flex flex-col justify-center border cursor-grab border-gray-300 items-center gap-2 w-32 bg-transparent h-32  group transition-transform duration-300 hover:scale-105 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="rounded-xl p-2  overflow-hidden">
              <div className=" ">
                <img
                  // src={JSON.parse(category.img)}
                  src={masa}
                  className="w-30"
                  alt={category.name}
                />
              </div>

              <div className="flex items-start justify-center">
                <h3 className="text-gray-900 text-sm">{category.name}</h3>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No categories available</p>
      )}
    </motion.div>
  </div>
</div>



      <div className=" pt-[12px] ">
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
        <Offers />
        </motion.div>
      </div>



      <div className=" bg-white lg:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
  
         <CategoryProducts />
        </motion.div>
      </div>
      
n
    </div>
  );
}

export default Shop;
