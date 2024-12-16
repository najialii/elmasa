import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slideshow from "../../components/slideShow";
import LikeButton from "../../components/like";
import { Heart } from "@phosphor-icons/react";
import Header from "./shopheader";
import ProductCard from "./pcard";
import ban from "../../assets/imgs/banner.jpg";
import Offers from "./offers";
import { motion } from "framer-motion";

function Shop() {
  const [categories, setCategories] = useState([]);
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

  return (
    <div className="bg-blue-50">
      {/* Banner Section */}
      <div className="w-screen">
        <motion.img
          className="w-screen"
          src={ban}
          alt="Banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Categories Section */}
      <div className="py-[50px]">
  <div className="flex justify-center items-start my-8">
    <motion.h1
      className="font-black text-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Categories
    </motion.h1>
  </div>
  <div className="flex justify-center">
    <motion.div
      className="grid grid-cols-2 justify-center gap-8 items-center sm:grid-cols-8 lg:grid-cols-4 lg:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
        {categories?.data?.data && categories.data.data.length > 0 ? (
              categories.data.data.map((category) => (
                <motion.div
                  onClick={() => handleCategoryClick(category)}
                  key={category.id} // Use category.id for the key
                  className="relative rounded-xl w-40 lg:w-64 h-64 lg:h-80 border border-gray-200 cursor-pointer group transition-transform 
                    duration-300 hover:scale-105 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  <div className="absolute bottom-0 left-0 w-full z-10 bg-primary bg-opacity-80 p-4 text-white rounded-t-xl">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No categories available</p>
            )}
    </motion.div>
  </div>
</div>


      <div className="py-[50px] bg-lime p-8 px-20">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-40"></div> */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h1 className="font-bold text-4xl py-4">Top Deals</h1>
        </motion.div>
        <Offers />
      </div>


      <div className="py-[50px] bg-gray-100 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <ProductCard  />
        </motion.div>
      </div>
    </div>
  );
}

export default Shop;
