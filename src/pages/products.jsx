import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ban from "../assets/imgs/banner.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL
function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setData(response.data);
      console.log("Fetched categories:", response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (effectRan.current) return;
    fetchCategories();
    effectRan.current = true;
  }, []);

  const handleAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      
      <div className="relative w-full lg:h-[70vh] h-40">
        <motion.img
          className="h-40 lg:h-full w-full object-cover"
          src={ban}
          alt="Banner"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white text-4xl lg:text-5xl md:text-7xl font-extrabold text-center"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            تعرف على منتجاتنا
          </motion.div>
        </div>
      </div>

<div className="flex justify-center my-8">
  <h1 dir="rtl" className="lg:text-xl font-extrabold text-base">
    اكتشف منتجاتنا  
  </h1>
</div>
   
      <div className="p-6">
        <motion.div
          {...handleAnimation}
          className="flex flex-col lg:flex-row gap-8 justify-center items-center"
        >
          {data &&
            data.data &&
            data.data.data.map((category) => (
              <div
              className="flex flex-col items-center bg-white p-6  shadow-md w-80"  
              >
                {/* Overlay */}
                <img

src={category.img.includes("https") ? category.img : `${VITE_IMAGE_URL}/${category.img}`}
alt={category.name}
className="lg:w-20 w-16 object-cover lg:h-20 h-16 mb-4 hover:scale-110  transition-all duration-500 ease-in-out transform"
/>
               

               
                <div className="relative z-10 text-gray-900 text-center">
                  <h2 className="text-base font-bold mb-2 ">{category.name}</h2>
                  
                  <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary-dark transition transform hover:scale-105">
                    Discover Products
                  </button>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Products;
