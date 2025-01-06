import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/like';
import Rcard from '../components/recipiescard';
import ban from "../assets/imgs/banner.jpg";
import axios from 'axios';
import Homerec from './shopp/homrec';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Recipes = () => {
  const navigate = useNavigate();
  const [currentpage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadMore , setLoadMorw] = useState(true)

  useEffect(() => {
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
    fetchRecipes();
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
      <div className='bg-white'>

        <Homerec />
      </div>
      <div className='flex justify-center items-center  '>
        <Rcard
          data={data}
          handleGetRecipe={handleGetRecipe}
        />
      </div>
      <div className="flex justify-center items-center ">
        <motion.button
          className="flex items-center justify-center gap-2 
          before:ease relative h-12 rounded-xl w-52 overflow-hidden  bg-secondary text-white font-bold shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate- before:bg-white before:opacity-10 before:duration-700 mb-12 mt-4 hover:before:-translate-x-52"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Load More Recipes
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Recipes;
