import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL;

const RecipeCard = ({ recipe }) => {
  const imageUrl = (() => {
    try {
      const parsedImg = JSON.parse(recipe.img);
      return Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
    } catch {
      return `${API_BASE_URL}/storage/${recipe.img}`;
    }
  })();

  return (
    <motion.div
      key={recipe.id}
      className="relative rounded-lg shadow-xl  overflow-hidden"
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-lg font-bold text-white">{recipe.name}</h3>
      </div>
    </motion.div>
  );
};

const Homerec = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes?limit=5`);
        setData(response.data.recipes.data.slice(0, 5));
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, []);

  if (pending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error: {error.message}. Please try again later.
      </div>
    );
  }

  return (
    <div className="py-10 px-4 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Large image at the top for mobile and large screens */}
        <div className="lg:col-span-3 flex justify-center">
          <RecipeCard recipe={data[0]} />
        </div>

        {/* Smaller cards below the large image */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {data.slice(1, 5).map((recipe) => (
            <div key={recipe.id} className="flex justify-center">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homerec;
