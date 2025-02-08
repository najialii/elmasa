import { motion } from "framer-motion";
import { ArrowCircleRight, UsersThree, ClockCountdown } from "@phosphor-icons/react";
import { useParams, useLocation } from "react-router-dom";
import milk from "../assets/imgs/miokmilk.png";

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL;

const Rcard = ({ data, handleGetRecipe, recipesToShow, pending }) => {
  return (
    <div className="grid  bg-white overflow-hidden grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 font-cairo">
      {data?.recipes?.data.map((recipe) => (
        <motion.div
          key={recipe.id}
          onClick={() => handleGetRecipe(recipe)}
          className="bg-white rounded-lg shadow-md border cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
        >

          <div className="w-full h-48 flex justify-center items-center overflow-hidden">
          <img
  src={(() => {
    const imagePath = recipe.img; 


    return imagePath.startsWith("http") 
      ? imagePath 
      : `${VITE_IMAGE_URL}/${imagePath}`;
  })()}
  alt={recipe.name}
  className="object-cover w-full h-full"
/>

          </div>

          {/* Recipe Details */}
          <div className="p-4 flex flex-col items-center bg-gray-100">
            <h3 className="text-lg font-semibold text-primary">{recipe.name}</h3>

            <div className="flex justify-between w-full mt-2 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <ClockCountdown size={16} /> {recipe.timeInMinutes} min
              </span>
              <span className="flex items-center gap-2">
                <UsersThree size={16} /> {recipe.serving} Servings
              </span>
            </div>

            {/* View Recipe Button */}
            {/* <button
              onClick={() => handleGetRecipe(recipe)}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-white border rounded-md shadow-sm hover:bg-primary hover:text-white transition"
            >
              <ArrowCircleRight size={20} /> View Recipe
            </button> */}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Rcard;
