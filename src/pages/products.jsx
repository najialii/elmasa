import React from "react";
import { motion } from "framer-motion";
import ban from "../assets/imgs/banner.jpg";
import useFetch from "../components/hooks/usefetch";
import milk from '../assets/imgs/miokmilk.png'

function Products() {
  
  const { data, loading, error } = useFetch(`http://localhost:8000/api/categories`);
  console.log(data)
  //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
//console.log(data)
  const handleAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };
  if(loading){
    <div>loadig.....</div>
  }

  const colors = [
    "bg-gradient-to-r from-[#027384] to-[#5ab4c4]", 
    "bg-gradient-to-r from-[#5ab4c4] to-[#014a55]", 
    "bg-gradient-to-r from-[#cedf2f] to-[#e4ec83]", 
    "bg-gradient-to-r from-[#99ad22] to-[#8af9e3]", 
  ];
  
  return (
    <div className="w-full">
      <div className="max-w-screen mt-2 relative overflow-hidden px-4 lg:px-9">
       <img
         className="w-full h-[40vh] sm:h-[60vh] lg:h-[40vh] rounded-t-xl lg:mt-6 object-cover clip-arch sm:clip-arch-md lg:clip-arch-lg"
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
     </style>
      {/* ${colors[index % colors.length]} */}

      <div className="w-full ">
      {data && data.data && data.data.data.map((category, index) => (
  <motion.div
    key={category.id}
    className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-10 p-8 ${
      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
    } bg-white relative overflow-hidden`}
    {...handleAnimation}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform skew-y-12 sm:skew-y-12 md:skew-y-12 sm:scale-110 md:scale-110 sm:opacity-40 md:opacity-20"></div>

    <div className="flex flex-1 justify-center">
      <img
        src={JSON.parse(category.img)}
        alt={category.category}
        className="rounded-xl lg:w-49 sm:w-2/3 h-auto object-cover 
    transition-transform transform hover:scale-105"
      />
    </div>

    <div className="flex-1 flex flex-col items-start">
      <h2 className="text-4xl font-extrabold text-black mb-4 text-shadow-lg">
        {category.name}
      </h2>
      <p className="font-medium text-gray-800 mb-6 text-lg leading-relaxed">
        {/* {category.description} */}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor minus facilis doloremque iusto, omnis eligendi? Quia laudantium adipisci libero ullam aperiam ex id placeat, hic facere, mollitia, reprehenderit commodi cupiditate?
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
