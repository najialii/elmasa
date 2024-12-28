import React, { useState, useEffect } from 'react';
import Rcard from '../../components/recipiescard';
import useFetch from '../../components/hooks/usefetch';
import Slider from 'react-slick';
const Homerec = () => {

  
  
  const handleGetRecipe = (recipe) => {
    if (recipe) {
      navigate(`/recipe/${data.id}`, { state: { recipe } });
    } else {
      console.error('Recipe data is not available');
    }
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const {data, error, loading: pending}= useFetch('http://localhost:8000/api/recipes')
  console.log("data from home recipies", data)

  return (
    <div className='  '>
      <Rcard 
data={data}
handleGetRecipe={handleGetRecipe}
      />
    </div>
  );
};

export default Homerec;
