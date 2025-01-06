import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ban from "../assets/imgs/banner.jpg";
import axios from "axios";
import milk from '../assets/imgs/miokmilk.png';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
        setData(response.data);
        console.log("Fetched categoriesssssssssssssssssssssssssssss:", response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-screen">
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const colors = ["bg-white", "bg-gray-100"];

  return (
    <div className="w-full">
     <div className="relative w-full h-[70vh]">
          <motion.img 
            className="h-full w-full object-cover" 
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
              <img src="" alt="" srcset="" />
            تعرف على منتجاتنا
            </motion.div>
          </div>
        </div>

      <div className="w-full">

   
  {data && data.data && data.data.data.map((category, index) => (
    <motion.div
      key={category.id}
      className={`flex flex-col md:flex-row items-center justify-center py-[80px] gap-8 p-8 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } ${colors[index % colors.length]} relative`}
      {...handleAnimation}
    >
      {/* Image Section */}
      <div className="flex flex-1 justify-center rounded-lg overflow-hidden">
        <img
          src={category.img}
          alt={category.category}
          className={`w-64 h-64 object-cover transition-transform transform hover:scale-105 ${colors[index % colors.length].replace("bg-", "border-")} border-4`}
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 flex flex-col items-start mx-8 md:mx-16">
        <h2 className="text-3xl font-bold text-black mb-4">{category.name}</h2>
        <p className="font-medium text-gray-800 mb-6 text-lg leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor minus facilis doloremque iusto, omnis eligendi? 
        </p>
        <button className="px-6 py-2 bg-secondary text-white rounded-lg shadow-md hover:bg-secondary-dark transition ease-in-out duration-300 transform hover:scale-105">
          Discover Products
        </button>
      </div>
    </motion.div>
  ))}
</div>
    </div>
  );
}

export default Products;
