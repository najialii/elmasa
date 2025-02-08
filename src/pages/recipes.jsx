import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/like';
import Rcard from '../components/recipiescard';
import ban from "../assets/imgs/banner.jpg";
import axios from 'axios';
import Homerec from './shopp/homrec';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Recipes = () => {
  const effectRan = useRef(false)
  const navigate = useNavigate();
  const [currentpage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadMore , setLoadMorw] = useState(true)
  
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes?page=${currentpage}`);
      setData(response.data);
      console.log("Fetched recipes:", response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if(!effectRan.current){
  effectRan.current =true
    fetchRecipes();
    }
  }, [currentpage]);

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
    return (
      <div className="text-center text-red-600">
        Error: {error.message}. Please try again later.
      </div>
    );
  }

  const handleGetRecipe = (recipe) => {
    if (recipe) {
      console.log('Navigating to:', `/recipe/${recipe.id}`);
      navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    } else {
      console.error('Recipe data is not available');
    }
  };

  return (
    <motion.div
      className="w-w-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
   <div 
  className="relative bg-cover bg-center bg-no-repeat h-[50vh]" 
  style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
>
  
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

  <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-16">
    {/* <div className="flex flex-col justify-center h-full mt-32 items-center gap-6 text-gray-800 ">
      <Homerec />
    </div> */}

  
    <div className="text-right text-white">
      <h1 className="text-3xl lg:text-4xl font-bold">وصفات لذيذة</h1>
      <p className="mt-4 text-lg">
        اكتشف عالماً مليئاً بأشهى الوصفات السهلة واللذيذة باستخدام مكرونة بيرفيتو. 
        طرق رائعة لتحضير الباستا في المنزل!
      </p>
     
    </div>
  </div>
</div>

      <div className=' mt-16 mx-2 lg:mx-20  '>
        <Rcard
          data={data}
          handleGetRecipe={handleGetRecipe}
        />
      </div>
      <div className="flex justify-center items-center ">
        <motion.button
          className="flex items-center justify-center gap-2  relative text-sm py-2 rounded-md px-4 overflow-hidden  border border-secondaryLight text-secondary   "
          // whileHover={{ scale: 1.1 }}
          // whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Load More Recipes
          {/* <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span> */}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Recipes;
