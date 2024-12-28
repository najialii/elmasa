import React, { useState, useEffect } from 'react';
import {MagnifyingGlass, PaperPlaneRight, CheckCircle,FacebookLogo, Basket, ClockCountdown } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/like';
import Rcard from '../components/recipiescard';
import ban from "../assets/imgs/banner.jpg";
import useFetch from '../components/hooks/usefetch';

const Recipes = () => {


  const navigate = useNavigate();

  
  const handleGetRecipe = (recipe) => {
    if (recipe) {
      
      navigate(`/recipage/${recipe.id}`, { state: { recipe } });
    } else {
      console.error('Recipe data is not available');
    }
  };
const {data, error, loading: pending}= useFetch('http://localhost:8000/api/recipes')
console.log("data from recipies", data)
// const recipies = data
// console.log(recipies)

 if(pending){
  return    <div className="h-screen w-screen flex justify-center items-center bg-backGround">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
      data-original="#000000"
    />
  </svg>
</div>
 }


  return (
    <div className="w-w-screen  bg-gray-100">
        <div className="relative w-full h-[70vh]">
              <img className="h-full w-full object-cover" src={ban} alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-5xl md:text-7xl font-extrabold text-center">
                  Discover Our Products
                </h1>
              </div>
            </div>
      <div className="flex gap-4 max-sm:flex-col items-center justify-start text-center bg-secondary text-white px-6 py-3.5 rounded font-[sans-serif]">
        <h3 className="text-primary font-md mx-6">Filter By</h3>
        <div className="flex items-center justify-between space-x-5 bg-white px-4">
          <a className="menu-hover my-2 rounded-md text-base font-medium text-primary lg:mx-4">Breakfast</a>
        </div>
      </div>
<div className='flex justify-center items-center '>
<Rcard
data={data}
handleGetRecipe={handleGetRecipe}
/>
</div>

      <div className="flex justify-center items-center ">
        <button  className="flex items-center justify-center gap-2 
        before:ease relative h-12 rounded-xl w-52 overflow-hidden  bg-secondary text-white font-bold shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate- before:bg-white before:opacity-10 before:duration-700 mb-12 mt-4 hover:before:-translate-x-52">
          Load More Recipes
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </div>

      <div className="flex gap-4 max-sm:flex-col items-center justify-start text-center bg-primary text-white px-6 py-3.5 rounded font-[sans-serif]">
        <h3 className="text-primary font-md mx-6">Filter By</h3>
        <div className="flex items-center justify-between space-x-5 bg-white px-4">
          <a className="menu-hover my-2 rounded-md text-base font-medium text-primary lg:mx-4">Breakfast</a>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
