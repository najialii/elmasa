import React, { useState } from 'react';
import Slideshow from '../components/slideShow';
import Pcard from './shopp/pcards';
import Offers from './shopp/offers';
import Rcard from '../components/recipiescard';
import Homerec from './shopp/homrec';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WhatsappLogo, Envelope } from '@phosphor-icons/react';
import ban from "../assets/imgs/ban3.jpg";
import masagroup from '../assets/imgs/masagroup.png'
import partlogo from '../assets/imgs/masa.svg'



const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const umessage = {name,email,message}
    console.log(umessage);
    fetch("http://localhost/masa/api/content/items/customermessages", {
      method: "POST",
      headers: {
        // "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(umessage) 
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          console.log("Success:", data);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  
  }
  const partnerLogos = [
    "https://via.placeholder.com/150x100?text=Partner+1",
    "https://via.placeholder.com/150x100?text=Partner+2",
    "https://via.placeholder.com/150x100?text=Partner+3",
    "https://via.placeholder.com/150x100?text=Partner+4",
    "https://via.placeholder.com/150x100?text=Partner+5",
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
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


  return (
  <div className="bg-gray-50">
<div className="flex flex-col mx-6 mt-5 md:flex-row items-center justify-between  bg-primary text-white clip-arch md:clip-arch-md lg:clip-arch-lg">
  
  <div className="w-full md:w-1/3 mb-4 md:mb-0">
    <img
      src={masagroup}  
      alt="Banner"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>

  <div className="w-full md:w-2/3 pl-0 md:pl-6">
    <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
    <p className="text-lg">
      This is a description of the website or any other content you would like to display here.
    </p>
  </div>
</div>

{/* <style>
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
</style> */}

<div className='flex justify-center items-center text-4xl py-[50px]'>
      العلامات التجارية
      </div>
    <div className='grid grid-cols-2 items-center text-2xl font-black text-gray-800'>
<div className='flex flex-col items-center justify-center w-full h-full  p-6' >
  <h2>
  الماسة 
  </h2>
<img src={masagroup} className='w-64' alt="" srcset="" />
</div>
<div className='flex flex-col items-center justify-center w-full h-full   p-6 ' >
  <h2>
  الريان 
  </h2>
<img src={masagroup} className='w-64' alt="" srcset="" />
</div>

    </div>


    
    <section className=" py-[50px] overflow-hidden w-full">
      <div className="container    z-10">
        <h2 className="text-4xl  text-primary font-extrabold  mb-8">Delicious Recipes</h2>
        <p>
        Mouthwatering meals for the whole family to enjoy!
        </p>
        {/* <Homerec /> */}
      </div>
      <div className='flex justify-center items-center'>
        <button    className="flex items-center justify-center gap-2 relative h-10 rounded-xl
                   w-52 overflow-hidden   text-white shadow-2xl transition-all"
                >
          discover out recipies
        </button>

      </div>
    </section>


     
    {/* Promotions Section */}
    {/* <section className="py-16 Light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold text-secondaryDark mb-8">Our Latest Promotions</h2>
        <Offers />
      </div>
    </section> */}

    

  </div>
  )
};

export default Home;
