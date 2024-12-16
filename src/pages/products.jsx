import React from "react";
import { motion } from "framer-motion";
import ban from "../assets/imgs/banner.jpg";
import useFetch from "../components/hooks/usefetch";

function Products() {
  
  const { data, loading, error } = useFetch(`http://localhost:8000/api/categories`);
  //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
//console.log(data)
  const handleAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const colors = [
    "bg-gradient-to-r from-[#027384] to-[#5ab4c4]", // Primary to Primary Light
    "bg-gradient-to-r from-[#5ab4c4] to-[#014a55]", // Primary Light to Primary Dark
    "bg-gradient-to-r from-[#cedf2f] to-[#e4ec83]", // Secondary to Secondary Light
    "bg-gradient-to-r from-[#99ad22] to-[#8af9e3]", // Secondary Dark to Highlight Primary
  ];
  
  return (
    <div className="w-full">
      <div className="relative w-full h-[70vh]">
        <img className="h-full w-full object-cover" src={ban} alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg">
            Discover Our Categories
          </h1>
        </div>
      </div>


      <div className="w-full ">
      {data && data.data && data.data.data.map((category, index) => (
  <motion.div
    key={category.id}
    className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-10 p-8 ${
      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
    } ${colors[index % colors.length]} relative overflow-hidden`}
    {...handleAnimation}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform skew-y-12 sm:skew-y-12 md:skew-y-12 sm:scale-110 md:scale-110 sm:opacity-40 md:opacity-20"></div>

    {/* <div className="flex flex-1 justify-center">
      <img
        src={`http://localhost/masa/storage/uploads${category.cimage.path}`}
        alt={category.category}
        className="rounded-xl lg:w-49 sm:w-2/3 h-auto object-cover 
        shadow-lg transition-transform transform hover:scale-105"
      />
    </div> */}

    <div className="flex-1 flex flex-col items-start">
      <h2 className="text-4xl font-extrabold text-white mb-4 text-shadow-lg">
        {category.name}
      </h2>
      <p className="font-medium text-white mb-6 text-lg leading-relaxed">
        {/* {category.price} */}
      </p>
      <button className="px-6 py-2 bg-secondary text-white rounded-lg shadow-md hover:bg-secondary-dark transition ease-in-out duration-300 transform hover:scale-105">
        Discover our {category.name} categories
      </button>
    </div>
  </motion.div>
))}

      </div>
    </div>
  );
}

export default Products;
