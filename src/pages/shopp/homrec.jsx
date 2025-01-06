import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClockCountdown, UsersThree } from "@phosphor-icons/react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RecipeCard = ({ recipe, index }) => {
  const imageUrl = (() => {
    try {
      const parsedImg = JSON.parse(recipe.img);
      return Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
    } catch {
      return `${API_BASE_URL}/storage/${recipe.img}`;
    }
  })();

  const gridAreaClasses = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
  ];

  return (
    <motion.div
      key={recipe.id}
      className={`relative overflow-hidden  rounded-lg gap-8 ${gridAreaClasses[index] || ''}`}
    >
      <img
        src={imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}/${imageUrl}`}
        alt={recipe.name}
        className="w-full h-full object-cover hover:scale-175 transition-transform duration-300 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent bg-opacity-100 flex flex-col justify-end p-4 text-white">
        <div dir="rtl" className="flex justify-start items-center">
          <h3 className="text-lg font-bold text-right mb-4 text-white">
            {recipe.name}
          </h3>
        </div>
        <div className="flex justify-between items-center text-xl">
          <span className="flex lg:flex-row flex-col items-center gap-1">
            <ClockCountdown size={20} weight="fill" />
            <span className="text-sm">
              دقيقة {recipe.timeInMinutes}
            </span>
          </span>
          <span className="flex lg:flex-row flex-col items-center gap-1">
            <UsersThree size={20} weight="fill" />
            <span className="text-sm">
              عدد الأفراد {recipe.serving}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Homerec = () => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes?limit=5`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, []);

  const handleGetRecipe = (recipe) => {
    if (recipe) {
      navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    } else {
      console.error('Recipe data is not available');
    }
  };

  if (pending) {
    return (
      <div className="flex justify-center items-center h-full">
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
    return (
      <div className="text-center text-red-600">
        Error: {error.message}. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-[50px] px-4">

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {data &&
          data.recipes &&
          data.recipes.data.slice(0, 5).map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Homerec;
