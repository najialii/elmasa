import React, { useState, useEffect } from 'react';
import Rcard from '../../components/recipiescard';
import Slider from 'react-slick';
const Homerec = () => {
  const [recipies, setRecipies] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/masa/api/content/items/recipes?populate=*');
        const data = await response.json();
        console.log(data)
        if (data && Array.isArray(data)) {
      
          setRecipies(data.slice(0, 4)); 
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex items-center'>
      <Rcard 

        recipies={recipies} 
        handleGetRecipe={(recipe) => {
          console.log('Recipe selected:', recipe);
        }} 
        recipesToShow={4} 
      />
    </div>
  );
};

export default Homerec;
